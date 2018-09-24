<?php
declare(strict_types=1);

namespace Gumbo\Plugin;

use Gumbo\Plugin\Hooks\AbstractHook;
use Gumbo\Plugin\Hooks\PostTypeHandler;

/**
 * Boots the plugin, which /should/ be loaded as a must-use plugin. This means
 * there are no installation and uninstallation hooks available!
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class Plugin
{
    protected $hookClasses = [
        PluginFilterHandler::class,
        GutenbergHandler::class,
        PostTypeHandler::class,
    ];

    /**
     * Returns the root path to the plugin
     *
     * @return string
     */
    public static function getPluginPath() : string
    {
        return __DIR__;
    }

    /**
     * Launches the plugin, by registering all bindings.
     */
    public function boot() : void
    {
        // Bind shortcodes
        $this->bindAssets();

        // Bind hooks
        $this->bindHooks();
    }

    /**
     * Handles WordPress bindings for hooks.
     */
    protected function bindHooks() : void
    {
        // Dynamically add hooks
        foreach ($this->hookClasses as $hookClass) {
            if (is_a($hookClass, AbstractHook::class, true)) {
                (new $hookClass)->bind();
            }
        }

        // TODO Add more items, if required
    }

    /**
     * Handles WordPress bindings for actions.
     */
    protected function bindAssets() : void
    {
        $handler = new AssetHandler;
        $handler->bind();
    }
}
