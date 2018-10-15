<?php
declare(strict_types=1);
/**
 * Gumbo Millennium plugin for WordPress
 *
 * Plugin Name:     Gumbo Millennium integratie
 * Description:     WordPress plugin voor integratie met de Gumbo Millennium website.
 * Version:         1.0.0
 * Author:          Digitale Commissie
 * License:         MPL-2.0
 * License URI:     https://www.mozilla.org/en-US/MPL/2.0/
 */

use Gumbo\Plugin\BladeEngine;
use Gumbo\Plugin\Hooks\AbstractHook;
use Gumbo\Plugin\Hooks\GutenbergHandler;
use Gumbo\Plugin\Hooks\LoopbackRestHandler;
use Gumbo\Plugin\Hooks\MetaFieldHandler;
use Gumbo\Plugin\Hooks\PluginFilterHandler;
use Gumbo\Plugin\Hooks\PostConversionHook;
use Gumbo\Plugin\Hooks\PostTypeHandler;
use Gumbo\Plugin\Plugin;
use Philo\Blade\Blade;

if (!defined('ABSPATH')) {
    // Decline loading the file, if we're not in a WordPress environment
    http_response_code(403);
    exit;
}

// Load autolaoder
require_once __DIR__ . '/vendor/autoload.php';


// Proxy loader
$plugin = Plugin::getInstance();

// Bind handlers
$plugin->addHandler(PluginFilterHandler::class);
$plugin->addHandler(GutenbergHandler::class);
$plugin->addHandler(LoopbackRestHandler::class);
$plugin->addHandler(MetaFieldHandler::class);
$plugin->addHandler(PostConversionHook::class);
$plugin->addHandler(PostTypeHandler::class);

// Bind Blade engine
$plugin->register(Blade::class, function () {
    // Blade templates
    $templateDir = __DIR__ . '/views';
    $cacheDir = __DIR__ . '/cache/blade';

    // Create instance
    return new BladeEngine($templateDir, $cacheDir);
});

// Return plugin
$plugin->boot();
