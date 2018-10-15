<?php
declare(strict_types=1);

namespace Gumbo\Plugin\Gutenberg;

/**
 * Meta block to configure page navbar
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class MetaNavbar extends Block
{
    /**
     * Namespace for the Block
     */
    const BLOCK_NAMESPACE = 'gumbo';

    /**
     * Internal code for the block
     */
    const BLOCK_CODE = 'meta-navbar';
}
