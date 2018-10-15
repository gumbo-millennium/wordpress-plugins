<?php
declare(strict_types=1);

namespace Gumbo\Plugin\MetaBoxes;

use Gumbo\Plugin\Fields\CheckboxField;

/**
 * Navbar configuration, used for pages only
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class Navbar extends MetaBox
{
    /**
     * Name of the meta box, used internally
     *
     * @var string
     */
    protected $name = 'navbar';

    /**
     * Title of the meta box
     *
     * @var string
     */
    protected $title = "Navigatiebalk instellingen";

    /**
     * Context to display the meta box in, one of 'normal', 'side' and 'advanced'.
     *
     * Use null to use default ('advanced')
     *
     * @var string
     */
    protected $context = 'side';

    /**
     * {@inheritDoc}
     */
    protected function registerFields() : array
    {
        return [
            new CheckboxField(
                'navbar_transparent',
                'Navigatiebalk transparant maken',
                'Content zal achter een navigatiebalk vallen, als deze transparant is.'
            )
        ];
    }
}
