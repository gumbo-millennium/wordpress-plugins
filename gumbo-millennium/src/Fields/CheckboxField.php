<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Fields;

/**
 * A true/false checkbox field
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class CheckboxField extends Field
{
    /**
     * {@inheritDoc}
     */
    protected function getViewName() : string
    {
        return 'fields.checkbox';
    }

    /**
     * {@inheritDoc}
     */
    protected function filterData($value)
    {
        $value = trim($value);
        if ($value) {
            return true;
        } else {
            return false;
        }
    }
}
