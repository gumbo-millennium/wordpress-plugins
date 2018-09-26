<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\Gutenberg\Block as GutenbergBlock;
use Gumbo\Plugin\Gutenberg\Sponsor;

/**
 * Loads Gutenberg block types
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class GutenbergHandler extends AbstractHook
{
    /**
     * List of available block types
     *
     * @var array
     */
    const BLOCK_TYPES = [
        Sponsor::class,
    ];

    /**
     * Bind to WordPress
     *
     * @return void
     */
    public function bind() : void
    {
        // Add Gutenberg
        add_action('init', [$this, 'init']);
    }

    /**
     * Registers block types for Gutenberg
     *
     * @return void
     */
    public function init() : void
    {
        if (!function_exists('register_block_type')) {
            return;
        }

        // Register blocks, if they're valid
        foreach (self::BLOCK_TYPES as $type) {
            if (is_a($type, GutenbergBlock::class, true)) {
                (new $type)->register();
            }
        }
    }
}
