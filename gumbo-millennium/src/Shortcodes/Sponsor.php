<?php

namespace Gumbo\Plugin\Shortcodes;

use DOMNode;

/**
 * Replace [sponsor] with a dynamic Blade statement
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class Sponsor extends Shortcode
{
    public function getShortCode() : string
    {
        return 'sponsor';
    }

    public function handle(DOMNode $node, array $args) : void
    {
        $parent = $node->parentNode;
        $next = $node->nextSibling;

        $textNode = $this->text("@include('bits.sponsor')");
        $parent->insertBefore($textNode, $next);

        $divNode = $this->node('div');
        $divNode->appendChild($this->attribute('class', 'sponsor-container'));
        $divNode->appendChild($this->attribute('data-content', 'sponsor'));
        $parent->insertBefore($divNode, $next);
    }
}
