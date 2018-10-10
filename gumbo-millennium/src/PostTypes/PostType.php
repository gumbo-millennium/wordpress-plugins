<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\PostTypes;

use Gumbo\Plugin\MetaBoxes\MetaBox;

/**
 * Registers a single post type. Auto-filters all capabilities of a type.
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
abstract class PostType
{
    /**
     * Default recommended properties.
     *
     * @var array
     */
    const DEFAULT_PROPERTIES = [
        'public' => true,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_nav_menus' => false,
        'show_in_rest' => true
    ];

    /**
     * List of available post features
     *
     * @var array
     */
    const POST_FEATURES = [
        'title',
        'editor',
        'author',
        'thumbnail',
        'excerpt',
        'trackbacks',
        'custom-fields',
        'comments',
        'revisions',
        'page-attributes',
        'post-formats'
    ];

    /**
     * Returns the internal name of the post type
     *
     * @return string
     */
    abstract protected function getName() : string;

    /**
     * Returns the configuration properties of the type.
     *
     * @return array
     */
    abstract protected function getProperties() : array;

    /**
     * Returns the name used to generate capabilities, defaults to 'post' if null.
     * Return an array if you want to use an alternative for the plural form (e.g. ['post', 'posts'])
     *
     * @return string|array|null
     */
    protected function getCapabilityName()
    {
        return null;
    }

    /**
     * Returns a list of meta box classes, which should be registered alongside this post type.
     *
     * @return array Fully qualified class names of the meta boxes
     */
    protected function getMetaFields() : array
    {
        // By default, no meta fields are added
        return [];
    }

    /**
     * Binds events for WordPress, can be used to call post-type-specific hooks
     */
    public function bind() : void
    {
        // No op
    }

    /**
     * Registers the post type
     *
     * @return void
     */
    public function registerType()
    {
        // Get properties
        $name = $this->getName();
        $properties = $this->getProperties();
        $capabilityName = $this->getCapabilityName();
        $capabilityNameArray = [];

        // Add capability name if the capability field is a string or two-index array
        if ((is_array($capabilityName) && count($capabilityName) == 2) || is_string($capabilityName)) {
            $capabilityNameArray = ['capability_type' => $capabilityName];
        }

        // Merge default, generated and custom properties
        $joinedProperties = array_merge(
            self::DEFAULT_PROPERTIES,
            $capabilityNameArray,
            $properties
        );

        // Register the post type
        register_post_type($name, $joinedProperties);

        // Register meta fields
        foreach ($this->getMetaFields() as $metaField) {
            if (is_a($metaField, MetaBox::class, true)) {
                $field = new $metaField($name);
                $field->hook();
            } else {
                throw new \LogicException(sprintf(
                    'Expected [%s] to be a subclass of [%s]. It\'s not.',
                    $metaField,
                    MetaBox::class
                ));
            }
        }
    }
}
