<?php
declare(strict_types=1);

namespace Gumbo\Plugin\PostTypes;

use PHPUnit\Framework\Constraint\Callback;
use Gumbo\Plugin\MetaBoxes\ActivityBox;
use Gumbo\Plugin\PostTypes\PostType;

/**
* Registers a sponsor type, used to show companies we support on the website.
*
* @author Roelof Roos <github@roelof.io>
* @license MPL-2.0
*/
class Sponsor extends PostType
{
    /**
     * {@inheritDoc}
     */
    protected function getName() : string
    {
        return 'gumbo-sponsor';
    }

    /**
     * {@inheritDoc}
     */
    protected function getCapabilityName() : string
    {
        return 'sponsor';
    }

    /**
     * {@inheritDoc}
     */
    protected function getIconName() : string
    {
        // code...
    }

    /**
     * {@inheritDoc}
     */
    protected function getProperties() : array
    {
        return [
            'labels' => [
                'name' => __('Sponsors'),
                'singular_name' => __('Sponsor')
            ],
            'has_archive' => true,
            'rewrite' => ['slug' => 'sponsoren'],
            'supports' => [
                'editor',
                'revisions'
            ],
            'show_in_menu' => true,
            'show_in_nav_menus' => false,
            'exclude_from_search' => true,
            'show_in_rest' => true
        ];
    }
}
