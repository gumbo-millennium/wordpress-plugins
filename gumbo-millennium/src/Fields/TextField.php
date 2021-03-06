<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Fields;

/**
 * A text field, for extra text-based metadata
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class TextField extends Field
{
    /**
     * {@inheritDoc}
     */
    protected function getViewName() : string
    {
        return 'fields.text';
    }


    /**
     * {@inheritDoc}
     */
    protected function filterData($value)
    {
        $value = trim($value);
        if (empty($value)) {
            return null;
        } else {
            return $value;
        }
    }
}
