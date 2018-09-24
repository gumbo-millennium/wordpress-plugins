<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\PostTypes\PostType;
use Gumbo\Plugin\PostTypes\ActivityType;

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
        ActivityType::class
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
    }

    /**
     * Registers our custom post types
     *
     * @return void
     */
    public function init() : void
    {
        // Register post types, if they're valid
        foreach (self::POST_TYPES as $type) {
            if (is_a($type, PostType::class, true)) {
                (new $type)->registerType();
            }
        }
    }
}
