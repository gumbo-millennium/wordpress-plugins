<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Fields;

/**
 * A time field, to choose times
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class TimeField extends TextField
{
    /**
     * {@inheritDoc}
     */
    protected function getViewName() : string
    {
        return 'fields.time';
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
        if (!preg_match('/^(?:[0-1]\d|2[0-3]):[0-5][0-9]$/', $value)) {
            return null;
        }

        // Convert to date object, then back to timestamp. This takes out any weird date constructs
        return \DateTimeImmutable::createFromFormat('H:i', $value)->format('H:i');
    }
}
