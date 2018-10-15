<?php
declare(strict_types=1);

namespace Gumbo\Plugin\MetaBoxes;

use Gumbo\Plugin\Fields\CheckboxField;

/**
 * Gumbo page configuration
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class GumboPage extends MetaBox
{
    /**
     * Name of the meta box, used internally
     *
     * @var string
     */
    protected $name = 'gumbo-page';

    /**
     * Title of the meta box
     *
     * @var string
     */
    protected $title = "Gumbo Millennium";

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
            'Instellingen voor pagina\'s van de Gumbo Millennium website',
            new CheckboxField(
                'navbar_transparent',
                'Navigatiebalk transparant',
                'Content zal achter een navigatiebalk vallen, als deze transparant is.'
            )
        ];
    }
}
