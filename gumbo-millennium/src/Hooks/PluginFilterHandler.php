<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Hooks;

/**
 * Handles filterig the plugins, so users cannot install unwanted plugins.
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class PluginFilterHandler extends AbstractHook
{
    /**
     * Plugins that cannot be uninstalled
     */
    const PROTECTED_PLUGINS = [
        'gumbo-millennium',
        'gutenberg',
    ];

    /**
     * Plugins that are allowed to be installed
     */
    const ALLOWED_PLUGINS = [
        'advanced-custom-fields',
        'contact-form-7',
        'gumbo-millennium',
        'gutenberg',
        'hello-dolly',
    ];

    /**
     * Default-installed plugins, which are not allowed to be activated
     */
    const BANNED_PLUGINS = [
        'akismet',
        'hello-dolly',
        'hello.php',
    ];

    /**
     * Map of capabilities not allowed for the given plugins
     */
    const RESTRICTED_ACTIONS = [
        'activate_plugin' => self::BANNED_PLUGINS,
        'deactivate_plugin' => self::PROTECTED_PLUGINS,
        'delete_plugin' => self::PROTECTED_PLUGINS,
    ];

    /**
     * Theme we want the site to have. After this theme is the current theme, changing the
     * theme will no longer be allowed
     */
    const SITE_THEME = 'gumbo-millennium';

    /**
     * Binds to the Plugin API response
     *
     * @return void
     */
    public function bind() : void
    {
        // Filter plugin API for hot tags
        add_filter('plugins_api', [$this, 'filterPluginApi'], 10, 2);

        // Filter plugin API responses
        add_filter('plugins_api_result', [$this, 'filterPluginApiResponse'], 10, 2);

        // Hide certain actions from plugins
        add_filter('plugin_action_links', [$this, 'restrictInstalledPluginActions'], 10, 3);

        // Disallow changing themes after preferred theme is set.
        add_filter('user_has_cap', [$this, 'restrictThemeChange'], 99, 3);
    }

    /**
     * Don't call WP-API for hot plugins and tags.
     *
     * @param mixed $result
     * @param string $action
     * @return object|bool
     */
    public function filterPluginApi($result, string $action)
    {
        // Don't allow API calls for hot items
        if ($action === 'hot_tags' || $action == 'hot_categories') {
            return (object) [];
        }

        // Allow the HTTP api to do what it does
        return false;
    }

    /**
     * Filters WordPress Plugin API using a whitelist
     *
     * @param object $res
     * @param string $action
     * @return array
     */
    public function filterPluginApiResponse(object $res, string $action = null)
    {
        // return if it's an error
        if ($res instanceof \WP_Error) {
            return $res;
        }

        // Also return if there are no plugins in the response
        if (!property_exists($res, 'plugins') || !is_array($res->plugins)) {
            return $res;
        }

        // Make list of allowed plugins
        $newPlugins = [];
        foreach ($res->plugins as $index => $plugin) {
            // No slug equals no listing
            if (!property_exists($plugin, 'slug')) {
                continue;
            }

            // Only allow certain slugs
            if (in_array($plugin->slug, self::ALLOWED_PLUGINS)) {
                $newPlugins[] = $plugin;
            }
        }

        // Return new list of plugins
        $res->plugins = $newPlugins;

        // Update result count
        $res->info['results'] = count($newPlugins);

        // Return res
        return $res;
    }

    /**
     * Disallow uninstalling whitelisted plugins
     *
     * @param array $actions List of links
     * @param string $pluginFile Plugin filename
     * @param array $pluginData Plugin data
     * @return array
     */
    public function restrictInstalledPluginActions(array $actions, string $pluginFile, array $pluginData) : array
    {
        $slug = $pluginData['slug'] ?? null;

        // Hide the delete action, since we don't want users to delete plugins or themes
        if (in_array($slug, self::PROTECTED_PLUGINS)) {
            unset($actions['delete']);
            unset($actions['deactivate']);
        }

        // Hide the activate action on forbidden plugins (installed by default)
        if (in_array($slug, self::BANNED_PLUGINS) && isset($actions['activate'])) {
            unset($actions['activate']);
        }

        return $actions;
    }

    /**
     * Prevent the user from switching theme after the wanted theme is activated
     *
     * @param array $allCaps
     * @param array $caps
     * @param array $args
     * @return array
     */
    public function restrictThemeChange(array $allCaps, $caps, array $args) : array
    {
        $restrictedCaps = [
            'switch_themes',
            'install_themes'
        ];
        $requestedCap = $args[0];

        if (!in_array($requestedCap, $restrictedCaps, true)) {
            return $allCaps;
        }

        // Remove install and switch capabilities if the current theme is the wanted theme
        if (wp_get_theme()->template === self::SITE_THEME) {
            foreach ($restrictedCaps as $cap) {
                $allCaps[$cap] = false;
            }
        }

        return $allCaps;
    }
}
