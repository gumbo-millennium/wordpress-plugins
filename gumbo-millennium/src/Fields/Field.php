<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Fields;

use Philo\Blade\Blade;
use Illuminate\View\View;


/**
 * A dynamic field, used to render extra fields in meta boxes
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
abstract class Field
{
    /**
     * @var string Field and meta field name
     */
    protected $name;

    /**
     * @var string Field label
     */
    protected $label;

    /**
     * @var string Help text
     */
    protected $help;

    /**
     * Creates a new field with the given name and label
     *
     * @param string $name
     * @param string $label
     */
    public function __construct(string $name, string $label, string $help = null)
    {
        if (!preg_match('/^[a-z][a-z0-9_\-]+$/', $name)) {
            throw new \LogicException(sprintf(
                'Name "%s" is invalid, can only contain a-z, 0-9, dashes and underscores.',
                $name
            ));
        }

        // Assign name and label
        $this->name = $name;
        $this->label = $label;

        // Assign help
        $help = $help ? trim($help) : null;
        $this->help = !empty($help) ? $help : null;
    }

    /**
     * In-memory cache of views
     *
     * @param Blade $blade
     * @param string $viewName
     * @return View
     */
    final protected function getView(Blade $blade, string $viewName) : View
    {
        static $viewCache = [];

        if (isset($viewCache[$viewName])) {
            return $viewCache[$viewName];
        }

        return $viewCache[$viewName] = $blade->view()->make($viewName);
    }

    /**
     * Actually renders the form, by retrieving the corresponding data from the database.
     *
     * @param Blade $blade Dependency-injected Laravel Blade engine
     * @param \WP_Post $post
     * @param bool $authorized Is the user authorized to edit this item?
     * @return void
     */
    final public function render(Blade $blade, \WP_Post $post, bool $authorized) : void
    {
        // Get field value from post
        $value = get_post_meta($post->ID, $this->name, true);

        // Render view using Blade
        echo $this->getView($blade, $this->getViewName())->with([
            'field' => $this,
            'value' => $value === '' ? $this->getDefaultValue() : $value,
            'authorized' => $authorized
        ])->render();
    }

    /**
     * Stores the single field type for the given post
     *
     * @param int $id
     * @return void
     */
    public function store(\WP_Post $post) : void
    {
        // Get value from form submission
        $value = filter_has_var(INPUT_POST, $this->name) ? filter_input(INPUT_POST, $this->name) : null;

        // Validate value if it's not empty
        $value = ($value === null || $value === '') ? null : $this->filterData($value);

        // Update the meta field in the database.
        update_post_meta($post->ID, $this->name, $value);
    }

    /**
     * Returns the default value for the item. Defaults to a null value.
     *
     * @return mixed
     */
    protected function getDefaultValue()
    {
        return null;
    }

    /**
     * Magically retrieve properties from the object, even if they're protected or private.
     *
     * @param string $key
     * @return mixed
     * @throws LogicException if the code requests non-existing properties.
     */
    public function __get(string $key)
    {
        // Return the property if it exists
        if (property_exists($this, $key)) {
            return $this->{$key};
        }

        // Return exception otherwise
        throw new \LogicException(sprintf(
            'Tried to access non-existing propety [%s] on [%s]',
            $key,
            static::class
        ));
    }

    /**
     * Returns the name of the Blade view to render the form field with.
     *
     * @return string
     */
    abstract protected function getViewName() : string;

    /**
     * Sanitizes data for the field
     *
     * @param mixed $value  "Dirty" value
     * @return mixed        Clean value
     */
    abstract protected function filterData($value);
}
