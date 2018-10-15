<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\MetaBoxes\MetaBox;
use Gumbo\Plugin\MetaBoxes\ActivityBox;
use Gumbo\Plugin\MetaBoxes\GumboPage;

/**
 * andles meta boxes for arbitrary post types (eg. pages and posts)
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class MetaFieldHandler extends AbstractHook
{
    /**
     * List of available block types
     *
     * @var array
     */
    const META_BOX_MAP = [
        'page' => [
            GumboPage::class,
        ]
    ];

    /**
     * Bind to WordPress
     *
     * @return void
     */
    public function bind() : void
    {
        // Add meta boxes to existing post types
        add_action('init', [$this, 'init']);
    }

    /**
     * Registers our custom post types
     *
     * @return void
     */
    public function init() : void
    {
        foreach (self::META_BOX_MAP as $postType => $boxes) {
            $boxes = array_filter($boxes, function ($value) {
                return is_a($value, MetaBox::class, true);
            });

            foreach ($boxes as $metaBox) {
                $box = new $metaBox($postType);
                $box->hook();
            }
        }
    }
}
