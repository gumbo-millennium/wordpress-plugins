<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Fields;

/**
 * A dropdown field, for multi-choice options
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class DropdownField extends Field
{
    protected $options;

    /**
     * Creates a new field with the given name, label, options and help text
     *
     * @param string $name
     * @param string $label
     * @param array $options
     * @param string $help
     */
    public function __construct(string $name, string $label, array $options, string $help = null)
    {
        parent::__construct($name, $label, $help);

        $options = array_filter($options);
        $this->options = empty($options) ? null : $options;
    }

    /**
     * {@inheritDoc}
     */
    protected function getViewName() : string
    {
        return 'fields.dropdown';
    }

    /**
     * {@inheritDoc}
     */
    protected function filterData($value)
    {
        $value = trim($value);
        if (array_key_exists($value, $this->options)) {
            return $value;
        } else {
            return null;
        }
    }
}
