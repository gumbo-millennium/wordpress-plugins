<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Gutenberg;

use Gumbo\Plugin\Plugin;
use Gumbo\Plugin\AssetHandler;


/**
 * Gutenberg block, with a default register() method.
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
abstract class Block
{
    /**
     * Namespace for the Block
     */
    const BLOCK_NAMESPACE = 'gumbo';

    /**
     * Internal code for the block
     */
    const BLOCK_CODE = 'block-undefined';

    /**
     * Name of the Javascript to bind
     */
    const BLOCK_JS = 'gutenberg';

    /**
     * Register the block type with WordPress
     *
     * @return void
     */
    final public function register() : void
    {
        // Build name from '<namespace>/<code>'
        $blockName = vsprintf('%s/%s', [
            self::BLOCK_NAMESPACE,
            static::BLOCK_CODE
        ]);

        register_block_type($blockName, [
            'editor_script' => AssetHandler::getWordPressAssetName('gutenberg-js'),
            'editor_style' => AssetHandler::getWordPressAssetName('gutenberg-css')
        ]);
    }
}
