<?php
declare(strict_types=1);

namespace Gumbo\Plugin;

use Illuminate\Container\Container;
use Philo\Blade\Blade;
use Gumbo\Plugin\Hooks\AbstractHook;

/**
 * Boots the plugin, which /should/ be loaded as a must-use plugin. This means
 * there are no installation and uninstallation hooks available!
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class Plugin
{
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
     * Returns singleton instance
     *
     * @return self
     */
    public static function getInstance() : self
    {
        static $instance;
        return $instance ?? ($instance = new self);
    }

    /**
     * Retrieve instance from Plugin Container
     *
     * @param string $abstract
     * @return mixed
     */
    public static function get(string $abstract)
    {
        return self::getInstance()->resolve($abstract);
    }

    /**
     * Contains Laravel container
     *
     * @var Container
     */
    protected $container;

    /**
     * Handlers for WordPress
     *
     * @var array
     */
    protected $handlers = [];

    /**
     * Creates the container
     */
    protected function __construct()
    {
        // Create container
        $this->container = new Container;

        // Register ourselves
        $this->container->instance('plugin', $this);

        // Register asset handler
        $assetHandler = new AssetHandler;
        $assetHandler->bind();
        $this->container->instance('asset', $assetHandler);
    }

    /**
     * Registers a method on the container
     *
     * @param string $abstract
     * @param Closure $method
     * @return void
     */
    public function register(string $abstract, \Closure $method) : void
    {
        $this->container->singleton($abstract, $method);
    }

    /**
     * Get something from the container
     *
     * @param string $abstract
     * @param array  $parameters
     * @return mixed
     */
    public function resolve(string $abstract, $parameters = [])
    {
        return $this->container->make($abstract, $parameters);
    }

    /**
     * Register WordPress handler
     *
     * @param string $className
     * @return void
     */
    public function addHandler(string $className) : void
    {
        if (!is_a($className, AbstractHook::class, true)) {
            throw new \LogicException(sprintf(
                'Tried to bind [%s], which is not an instance of [%s].',
                $className,
                AbstractHook::class
            ));
        }

        // Add handler
        $this->handlers[] = $className;
    }

    /**
     * Launches the plugin, by registering all handlers through the service provider
     */
    public function boot() : void
    {
        // Call bind method, via the Service Injection class
        foreach ($this->handlers as $handler) {
            $this->container->call("{$handler}@bind");
        }
    }
}
