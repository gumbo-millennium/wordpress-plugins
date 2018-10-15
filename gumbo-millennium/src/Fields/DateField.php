<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Fields;

/**
 * A date field, to pick dates
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class DateField extends TextField
{
    /**
     * {@inheritDoc}
     */
    protected function getViewName() : string
    {
        return 'fields.date';
    }

    /**
     * {@inheritDoc}
     */
    protected function filterData($value)
    {
        $value = trim($value);

        // Empty values
        if (empty($value)) {
            return null;
        }

        // Non-date values
        if (!preg_match('/^[0-3]\d-[0-1]\d-\d{4}$/', $value)) {
            return null;
        }

        // Convert to date object, then back to timestamp. This takes out any weird date constructs
        return \DateTimeImmutable::createFromFormat('d-m-Y', $value)->format('d-m-Y');
    }
}
