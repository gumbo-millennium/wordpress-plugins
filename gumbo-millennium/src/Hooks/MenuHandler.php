<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\PostTypes\PostType;
use Gumbo\Plugin\PostTypes\Sponsor;
use Ramsey\Uuid\Uuid;
use WP_User;
use Gumbo\Plugin\Plugin;

/**
 * Informs the front-end site of menu changes
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class MenuHandler extends AbstractHook
{
    const MENU_OPTIONS = [
        'theme_mods_gumbo-millennium'
    ];

    /**
     * Bind to WordPress
     *
     * @return void
     */
    public function bind() : void
    {
        // Listen to menu changes
        add_action('wp_create_nav_menu', [$this, 'sendUpdateMenu'], 20);
        add_action('wp_update_nav_menu', [$this, 'sendUpdateMenu'], 20);
        add_action('wp_delete_nav_menu', [$this, 'sendUpdateMenu'], 20);

        // Listen for changes of options concerning the menus
        add_action('update_option', [$this, 'updateOption'], 20, 2);
    }

    /**
     * Sends a ping to the front-end site on menu update
     *
     * @return void
     */
    public function sendUpdateMenu()
    {
        Plugin::getInstance()->request('/wordpress/menu/');
    }

    /**
     * Listens for option changes to check for menu changes
     *
     * @param string $name
     * @param mixed $value
     * @return mixed
     */
    public function updateOption($name, $value)
    {
        // Check if the option is a change to the theme mods
        if (preg_match('/^theme_mods_/i', $name)) {
            $this->sendUpdateMenu();
        }

        // Forward current value
        return $value;
    }
}
