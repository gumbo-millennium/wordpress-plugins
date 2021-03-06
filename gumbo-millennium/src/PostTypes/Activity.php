<?php
declare(strict_types=1);

namespace Gumbo\Plugin\PostTypes;

use PHPUnit\Framework\Constraint\Callback;
use Gumbo\Plugin\MetaBoxes\ActivityBox;
use Gumbo\Plugin\PostTypes\PostType;

/**
* Registers an activity type, which is used to schedule events.
*
* @author Roelof Roos <github@roelof.io>
* @license MPL-2.0
*/
class Activity extends PostType
{
    /**
     * {@inheritDoc}
     */
    protected function getName() : string
    {
        return 'gumbo-activity';
    }

    /**
     * {@inheritDoc}
     */
    protected function getCapabilityName() : string
    {
        return 'activity';
    }

    /**
     * {@inheritDoc}
     */
    protected function getProperties() : array
    {
        return [
            'labels' => [
                'name' => __('Activities'),
                'singular_name' => __('Activity')
            ],
            'has_archive' => true,
            'rewrite' => ['slug' => 'activiteiten'],
            'supports' => [
                'title',
                'editor',
                'thumbnail',
                'excerpt',
                'revisions'
            ]
        ];
    }

    /**
     * {@inheritDoc}
     */
    protected function getMetaFields() : array
    {
        return [
            ActivityBox::class
        ];
    }
}
