<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\PostTypes\PostType;
use Gumbo\Plugin\PostTypes\ActivityType;

/**
 * Rewrites REST urls to loop back to the WordPress admin interface, as our front-end doesn't actually
 * have the WordPress REST API.
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class LoopbackRestHandler extends AbstractHook
{
    protected $cache = [];

    /**
     * Builds an array containing the regex matching the public site,
     * and the local site to substitute it with.
     *
     * @param int|null $blogId
     * @param string|null $scheme
     * @return array
     */
    public function getCachedRegex(?integer $blogId, ?string $scheme) : array
    {
        $key = sprintf('c:%d:%s', $blogId, $scheme);
        if (array_key_exists($key, $this->cache)) {
            return $this->cache[$key];
        }
        // Get site URL
        $siteUrl = get_site_url($blogId, '/', $scheme);

        // And get the home URL
        $homeUrl = get_home_url($blogId, '/', $scheme);

        // Ensure the home URL is HTTPS (we match this)
        $homeUrl = preg_replace('/^http:/i', 'https:', $homeUrl);

        // Build an escaped home URL
        $escapedHomeUrl = preg_quote($homeUrl, '/');
        $escapedHomeUrl = preg_replace('/^https/', 'https?', $escapedHomeUrl);

        // Build matching regex
        $regex = sprintf('/^%s/', $escapedHomeUrl);

        // Return and cache
        return $this->cache[$key] = [$regex, $siteUrl];
    }
    /**
     * Bind to WordPress
     *
     * @return void
     */
    public function bind() : void
    {
        // Loopback Rest API
        add_filter('rest_url', [$this, 'loopbackUrl'], 20, 4);
    }

    /**
     * Replaces the front-facing URL with an admin-panel one
     *
     * @param string $url Current target URL
     * @param string|null $path Local path
     * @param int|null $blogId Blog ID, for multisite (not often used)
     * @param string $scheme Scheme, probably 'rest'
     * @return string
     * @see get_rest_url
     */
    public function loopbackUrl(string $url, ?string $path, ?integer $blogId, string $scheme) : string
    {
        // Get (cached) regex and replacement for this blog + scheme combo
        list($regex, $replace) = $this->getCachedRegex($blogId, $scheme);

        // Build new URL
        return preg_replace($regex, $replace, $url);
    }
}
