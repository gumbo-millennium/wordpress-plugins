<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\Shortcodes\Shortcode;
use Gumbo\Plugin\Shortcodes\Sponsor;

/**
 * Handles converting Gutenberg Shortcodes to blade templates
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class PostConversionHook extends AbstractHook
{
    /**
     * List of available shortcodes
     *
     * @var array
     */
    const SHORTCODES = [
        Sponsor::class
    ];

    /**
     * Bind to WordPress
     *
     * @return void
     */
    public function bind() : void
    {
        // Handle Gutenberg shortcodess
        add_action('post_updated', [$this, 'formatPost'], 20, 2);

        // Add custom post types
        add_filter('wp_insert_post_data', [$this, 'preserveShortcodes'], 900, 2);
    }

    /**
     * Returns a list of shortcodes, where the name is used as key for the array
     *
     * @param DOMDocument $doc
     * @return array
     */
    protected function getShortCodes(\DOMDocument $doc) : array
    {
        $result = [];
        foreach (self::SHORTCODES as $shortcode) {
            if (is_a($shortcode, Shortcode::class, true)) {
                $shortcodeObj = new $shortcode($doc);
                $result[$shortcodeObj->getShortCode()] = $shortcodeObj;
            }
        }

        return $result;
    }

    /**
     * Registers our custom post types
     *
     * @param int $postId
     * @param WP_Post $post
     * @return void
     */
    public function formatPost($postId, $post)
    {
        global $wpdb;

        /*
         * Do you want you filter per post_type?
         * You should, to prevent issues on post type like menu items.
         */
        if (!in_array($post->post_type, ['post', 'page'])) {
            return;
        }

        // Get content
        $content = $post->post_content;

        // Disable error handling
        libxml_use_internal_errors(true);
        $document = new \DOMDocument;
        $document->preserveWhiteSpace = false;
        $document->formatOutput = true;
        $document->loadHTML(
            // hack to make DOMDocument read the file as UTF-8
            "<?xml encoding=\"utf-8\"?>{$content}",
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOWARNING | LIBXML_NONET
        );

        // Enable error handling
        libxml_use_internal_errors(false);

        $xpath = new \DOMXPath($document);
        $comments = $xpath->query('//comment()');

        // Get shortcodes
        $shortcodes = $this->getShortCodes($document);

        // Get list of effective shortcodes
        $nodeDeletionQueue = [];

        foreach ($comments as $comment) {
            $value = $comment->nodeValue;
            $value = trim($value);

            // Skip non-Gutenberg shortcodes
            if (!preg_match('/^(\/)?wp:gumbo\/([a-z0-9\-]+)\s*(\{.+\})?\s*\/?$/', $value, $matches)) {
                continue;
            }

            // Make sure all arguments are counted for
            while (count($matches) < 3) {
                $matches[] = null;
            }

            // Flag the node for deletion
            $nodeDeletionQueue[] = $comment;

            // If the node is an end-node, it only needs to be flagged for removal
            if ($matches[1] === '/') {
                continue;
            }

            // Get name and arguments
            list($name, $args) = array_slice($matches, 1, 2);

            // Check for existence of shortcode handler
            if (array_key_exists($name, $shortcodes)) {
                $shortcodes[$name]->handle($comment, json_decode($args ?? '[]', true));
            }
        }

        // Delete all comments
        foreach ($nodeDeletionQueue as $comment) {
            $comment->parentNode->removeChild($comment);
        }

        $post->post_content_filtered = $document->saveHTML();

        // Save filtered content
        $wpdb->update($wpdb->posts, [
            'post_content_filtered' => $post->post_content_filtered
        ], [
            'ID' => $post->ID
        ]);

        return;
    }

    /**
     * Protect against WordPress bug causing the post_content_filtered to be cleared
     *
     * @param array $data
     * @param array $post
     * @return array
     */
    public function preserveShortcodes($data, $post) : array
    {
        // If this is not an update, we have nothing to do
        if (!isset($post['ID']) || !$post['ID']) {
            return $data;
        }

        // Only run on posts and pages
        if (!in_array($data['post_type'], ['post', 'page'])) {
            return $data;
        }

        // How post is now, before the update
        $before = get_post($post['ID']);

        // Prevent clearing the post_content_filtered if it wasn't empty
        if (!empty($before->post_content_filtered)  && empty($data['post_content_filtered'])) {
            $data['post_content_filtered'] = $before->post_content_filtered;
        }

        return $data;
    }
}
