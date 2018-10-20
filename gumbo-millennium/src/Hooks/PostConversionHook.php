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
     * Class name of the containers containing WordPress content
     *
     * @var string
     */
    const REFLOW_CLASS_NAME = 'gumbo-normal-content';

    /**
     * List of available shortcodes
     *
     * @var array
     */
    const SHORTCODES = [
        Sponsor::class
    ];

    /**
     * Returns if the given node is eligible to be reflowed into the first node.
     *
     * @param DOMNode $node
     * @return bool
     */
    protected static function isReflowableContainer(\DOMNode $node) : bool
    {
        // Skip if no attributes
        if (!$node->attributes) {
            return false;
        }

        // Find class attribute
        $nodeClass = $node->attributes->getNamedItem('class');

        // Object is reflowable if it has a class and the class contains the reflow class name
        return ($nodeClass && stripos($nodeClass->nodeValue, self::REFLOW_CLASS_NAME) !== false);
    }

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

        // Log comments as array, since we're deleting them
        $nodeDeletionQueue = [];

        // Handle each comment
        foreach ($comments as $comment) {
            // Add comment to deletion queue
            $nodeDeletionQueue[] = $comment;

            // Get value
            $value = $comment->nodeValue;
            $value = trim($value);

            // Skip non-Gutenberg shortcodes
            if (!preg_match('/^wp:gumbo\/([a-z0-9\-]+)\s*(\{.+\})?\s*\/?$/', $value, $matches)) {
                continue;
            }

            // Make sure all arguments are counted for
            while (count($matches) < 3) {
                $matches[] = null;
            }

            // Get name and arguments
            list($name, $args) = array_slice($matches, 1, 2);

            // Check for existence of shortcode handler
            if (array_key_exists($name, $shortcodes)) {
                $shortcodes[$name]->handle($comment, json_decode($args ?? '[]', true));
            }
        }

        // Find and delete all comments
        foreach ($nodeDeletionQueue as $comment) {
            $comment->parentNode->removeChild($comment);
        }

        // Reflow content, after removing all comments
        $this->reflow($document);

        // Export HTML
        $html = preg_replace('/^<\?xml encoding="utf-8"\s*\?>/i', '', $document->saveHTML());

        // Save filtered content
        $wpdb->update($wpdb->posts, [
            'post_content_filtered' => $html
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

    /**
     * Reflows content of the document, by joining images, paragraphs and other WordPress content.
     * All adjacent `gumbo-normal-content` div nodes are merged into one node, causing that content to
     * flow properly.
     *
     * @param DOMDocument $document
     * @return void
     */
    protected function reflow(\DOMDocument &$document) : void
    {
        // Find all possible containers
        $divNodes = $document->getElementsByTagName('div');

        // Filter out all actual containers
        $containerNodes = [];
        foreach ($divNodes as $node) {
            if (self::isReflowableContainer($node)) {
                $containerNodes[] = $node;
            }
        }

        // Keep a deletion queue
        $nodeDeletionQueue = [];

        // Iterate container divs
        foreach ($containerNodes as $container) {
            // Skip if this container is scheduled for deletion
            if (in_array($container, $nodeDeletionQueue, true)) {
                continue;
            }

            // Reflow if the nextnode is eligible
            if (self::isReflowableContainer($container->nextSibling)) {
                $this->handleSingleReflow($container, $container->nextSibling, $nodeDeletionQueue);
            }

            // Add classname
            $classAttr = $container->attributes->getNamedItem('class');
            $classAttr->nodeValue = "{$classAttr->nodeValue} container--raw-content";
        }

        // Delete all nodes that were queued
        foreach ($nodeDeletionQueue as $node) {
            $node->parentNode->removeChild($node);
        }
    }

    /**
     * Moves all nodes in $thisContainer into $firstContainer, and adds itself to the $removeQueue.
     *
     * @param DOMNode $firstContainer
     * @param DOMNode $thisContainer
     * @param array $removeQueue
     * @return void
     */
    protected function handleSingleReflow(\DOMNode $firstContainer, \DOMNode $thisContainer, array &$removeQueue) : void
    {
        // Add all nodes
        foreach ($thisContainer->childNodes as $node) {
            $firstContainer->appendChild($node);
        }

        // Find next node
        $nextContainer = $thisContainer->nextSibling;

        // Reflow next node if this node is not the final node
        if (self::isReflowableContainer($nextContainer)) {
            $this->handleSingleReflow($firstContainer, $nextContainer, $removeQueue);
        }

        // Append this node to the removeQueue
        $removeQueue[] = $thisContainer;
    }
}
