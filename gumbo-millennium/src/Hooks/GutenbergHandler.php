<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\Gutenberg\Block as GutenbergBlock;
use Gumbo\Plugin\Gutenberg\Sponsor;
use Gumbo\Plugin\Gutenberg\CentralIntro;
use Gumbo\Plugin\Gutenberg\UniqueSellingPoint;
use Gumbo\Plugin\Gutenberg\UniqueSellingPoints;
use Gumbo\Plugin\Gutenberg\Testimonials;
use Gumbo\Plugin\Gutenberg\CtaBanner;

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
        CentralIntro::class,
        CtaBanner::class,
        Sponsor::class,
        Testimonials::class,
        UniqueSellingPoint::class,
        UniqueSellingPoints::class,
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

        // Add Gumbo group
        add_filter('block_categories', [$this, 'registerCategory'], 10, 2);

        // Remove Gutenberg menu
        add_action('admin_menu', [$this, 'removeGutenbergAdminMenu'], 20);
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

    /**
     * Adds a 'gumbo' category to the Gutenberg categories
     *
     * @param array $categories
     * @param WP_Post $post
     * @return array
     */
    public function registerCategory(array $categories, $post) : array
    {
        // Define gumbo category
        $gumboCategory = [
            'slug' => 'gumbo',
            'title' => 'Gumbo Millennium',
        ];

        // Add gumbo as first item
        array_unshift($categories, $gumboCategory);

        // Done :D
        return $categories;
    }

    /**
     * Removes the Gutenberg demo menu
     *
     * @return void
     */
    public function removeGutenbergAdminMenu() : void
    {
        // Remove the Gutenberg menu
        remove_menu_page('gutenberg');
    }
}
