<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

/**
 * Abstract class that's hooked up to WordPress
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
abstract class AbstractHook
{
    /**
     * Binds the plugin to it's hooks
     *
     * @return void
     */
    abstract public function bind() : void;

    /**
     * Debugs a (set of) variable(s), and exists code.
     *
     * @param mixed $args
     * @return void
     */
    protected function debug(...$args) : void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([$args]);
        die();
    }
}
