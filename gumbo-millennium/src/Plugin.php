<?php
declare(strict_types=1);

namespace Gumbo\Plugin;

use Illuminate\Container\Container;
use Philo\Blade\Blade;
use Gumbo\Plugin\Hooks\AbstractHook;
use GuzzleHttp\Client as GuzzleClient;

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

    protected $guzzleClient;

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

    /**
     * Creates a new Guzzle HTTP client
     *
     * @return GuzzleClient
     */
    protected function getGuzzleClient() : GuzzleClient
    {
        // Don't spam clients
        if ($this->guzzleClient) {
            return $this->guzzleClient;
        }

        // Build a sane user agent
        $userAgent = sprintf(
            'Gumbo Millennium WordPress (Guzzle %d; cURL %s; WordPress %s; +%s); PHP %s',
            GuzzleClient::VERSION,
            curl_version()['version'],
            get_bloginfo('version'),
            get_site_url(),
            PHP_VERSION
        );

        // Build client
        $this->guzzleClient = new GuzzleClient([
            'base_uri' => home_url(),
            'connect_timeout' => 0.5,
            'cookies' => true,
            'http_errors' => false,
            'headers' => [
                'Accepts' => 'application/json',
                'User-Agent' => $userAgent,
                'Authenticate' => sprintf(
                    'WordPress %s',
                    get_option('wordpress-auth-secret', 'secret')
                )
            ]
        ]);

        // Return client
        return $this->guzzleClient;
    }

    /**
     * Sends a request, return contents in 'data' key, error in 'error' key and
     * end condition in 'ok'
     *
     * @param string $url
     * @param array $data
     * @return array Data, check 'ok'
     */
    public function request(string $url, array $data = null) : array
    {
        // Add authentication header
        $options = [];

        // Determine method by data existence
        if ($data && (is_string($data) || is_array($data))) {
            $options['form_data'] = $data;
            $method = 'POST';
        } else {
            $method = 'GET';
        }

        // Get local path or URL
        $path = ltrim($url, '/');
        $url = (substr($path, 0, 4) === 'http') ? $path : "/api/{$path}";

        // Get request
        $resp = $this->getGuzzleClient()->request($method, $url, $options);

        // Check content for JSON
        $content = $resp->getBody();

        // Return null if non 2xx
        if ($resp->getStatusCode() >= 300 || $resp->getStatusCode() < 200) {
            return [
                'ok' => false,
                'url' => $url,
                'data' => $content,
                'error' => [
                    'code' => $resp->getStatusCode(),
                    'reason' => $resp->getReasonPhrase()
                ]
            ];
        }

        return [
            'ok' => true,
            'url' => $url,
            'data' => $content
        ];
    }
}
