<?php
declare (strict_types = 1);

namespace Gumbo\Plugin;

use Philo\Blade\Blade as BladeSource;

/**
 * Loads Blade, and ensures template directories exist
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class BladeEngine extends BladeSource
{
    /**
     * Create the specified directories
     *
     * @param array $directories
     * @return void
     */
    protected static function checkDirectories(array $directories) : void
    {
        // Check each directory
        foreach ($directories as $dir) {
            // Throw error if not found
            if (!is_dir($dir)) {
                throw new \RuntimeException("Cannot find directory [{$dir}].");
            }
        }
    }

    /**
     * Validates the given temp directory and resolves a replacement dir if it's not writeable.
     *
     * @param string $cache
     * @return string
     */
    protected static function validateCacheDir(string $cache) : string
    {
        if (is_writeable($cache)) {
            return $cache;
        }

        // Create temp cache directory
        $tempDir = sys_get_temp_dir() . '/blade';
        if (!is_dir($tempDir)) {
            mkdir($tempDir, 0775);
        }

        return $tempDir;
    }

    /**
     * Creates the Blade engine with the given view(s) and cache directory.
     *
     * @param string|array $views
     * @param string $cache
     */
    public function __construct($views, string $cache)
    {
        // Verify views
        if ((!is_array($views) && !is_string($views)) || empty($views)) {
            throw new \LogicException('View directories are not readable (not a string or array).');
        }

        // Verify cache dir
        if (!is_string($cache) || empty($cache)) {
            throw new \LogicException('Cache directory is not readable (not a string).');
        }

        // Make sure views are an array
        $views = is_array($views) ? $views : [$views];

        // Ensure directories exist
        self::checkDirectories($views);
        self::checkDirectories([$cache]);

        // Forward call
        parent::__construct($views, self::validateCacheDir($cache));
    }
}
