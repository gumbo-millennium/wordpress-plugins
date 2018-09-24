<?php
declare (strict_types = 1);

namespace Gumbo\Plugin;

/**
 * Registers and optionally enqueues assets
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class AssetHandler
{
    /**
     * Prefix for the scripts and stylesheets
     */
    const SCRIPT_PREFIX = 'gumbo-millennium-plugin';

    /**
     * Scripts to load
     */
    const SCRIPT_LIST = [
        'plugin-js' => ['js', 'dist/gumbo-plugin.js', null, true],
        'plugin-css' => ['css', 'dist/gumbo-plugin.css', null, true],
    ];

    /**
     * Returns the name of the script or styleheet
     *
     * @param string $name
     * @return string Full name of the asset
     */
    public static function getWordPressAssetName(string $name) : string
    {
        if (!isset(self::SCRIPT_LIST[$name])) {
            throw new \LogicException("Script [{$name}] not found!");
        }

        return implode('-', [self::SCRIPT_PREFIX, $name]);
    }

    /**
     * Triggers an asset to be loaded
     *
     * @param string $name
     * @return void
     */
    public static function enqueueAsset(string $name) : void
    {
        // Get full name
        $fullName = self::getWordPressAssetName($name);

        // Get script info
        $info = self::SCRIPT_LIST[$name];

        // Get correct function name
        $method = $type === 'css' ? 'wp_enqueue_style' : 'wp_enqueue_script';

        // Enqueue script
        $method($fullName);
    }

    /**
     * Launches the plugin, by registering all bindings.
     */
    public function bind() : void
    {
        // Bind scripts on init
        add_action('init', \Closure::fromCallable([$this, 'register']));
    }

    /**
     * Registers assets
     *
     * @return void
     */
    protected function register() : void
    {
        $basePath = plugin_dir_url(__DIR__);

        foreach (self::SCRIPT_LIST as $name => $props) {
            list($type, $path, $dependencies, $autoload) = $props;

            // Get full name
            $fullName = self::getWordPressAssetName($name);

            // Get function name
            $method = vsprintf('wp_%s_%s', [
                $autoload ? 'enqueue' : 'register',
                $type === 'css' ? 'style' : 'script'
            ]);

            $fullPath = $basePath . $path;

            // Call method
            $method($fullName, $fullPath, $dependencies ?? []);
        }
    }
}
