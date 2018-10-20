<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\PostTypes\PostType;
use Gumbo\Plugin\PostTypes\Activity;
use Gumbo\Plugin\PostTypes\Sponsor;

/**
 * Loads custom post types, for events and files
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class PostTypeHandler extends AbstractHook
{
    /**
     * List of available block types
     *
     * @var array
     */
    const POST_TYPES = [
        Activity::class,
        Sponsor::class,
    ];

    /**
     * Bind to WordPress
     *
     * @return void
     */
    public function bind() : void
    {
        // Add custom post types
        add_action('init', [$this, 'init']);

        // De-register capabilities
        add_action('admin_init', [$this, 'restrictPostTypeCapabilities']);
    }

    /**
     * Registers our custom post types
     *
     * @return void
     */
    public function init() : void
    {
        $postTypes = [];
        // Register post types, if they're valid
        foreach (self::POST_TYPES as $type) {
            if (is_a($type, PostType::class, true)) {
                $postTypes = new $type;
                $postTypes->registerType();
            }
        }

        // Bind after registration
        foreach ($postTypes as $postType) {
            $postType->bind();
        }
    }

    /**
     * Restrict capabilities for post types, such as thumbnails on pages and comments on all pages.
     *
     * @return void
     */
    public function restrictPostTypeCapabilities() : void
    {
        /*
         * All core features are directly associated with a functional area of the edit
         * screen, such as the editor or a meta box. Features include: 'title', 'editor',
         * 'comments', 'revisions', 'trackbacks', 'author', 'excerpt', 'page-attributes',
         * 'thumbnail', 'custom-fields', and 'post-formats'.
         */
        $allowedCapabilityMap = [
            'comments' => ['activity'],
            'trackbacks' => null,
            'thumbnail' => ['posts', 'attachments'],
            'post-formats' => null
        ];

        // Check all capabilities, and remove all non-matching ones
        foreach ($allowedCapabilityMap as $capability => $types) {
            $currentTypes = get_post_types_by_support($capability);
            foreach ($currentTypes as $type) {
                if ($types === null || !in_array($type, $types)) {
                    remove_post_type_support($type, $capability);
                }
            }
        }
    }
}
