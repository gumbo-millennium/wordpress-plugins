<?php

namespace Gumbo\Plugin\Shortcodes;

use DOMDocument;
use DOMElement;
use DOMNode;
use DOMText;

abstract class Shortcode
{
    /**
     * @var DOMDocument
     */
    protected $document;

    /**
     * Register the document
     *
     * @param DOMDocument $document
     */
    public function __construct(DOMDocument &$document)
    {
        $this->document = $document;
    }

    /**
     * Returns the name of the shortcode.
     *
     * @return string
     */
    abstract public function getShortCode() : string;

    /**
     * Handles the shortcode, will receive a list of arguments and the comment node.
     *
     * @param DOMNode $node
     * @param array $args
     * @return void
     */
    abstract public function handle(DOMNode $node, array $args) : void;

    /**
     * Adds text node
     *
     * @param string $text
     * @return DOMText
     */
    public function text(string $text) : DOMText
    {
        return $this->document->createTextNode($text);
    }

    /**
     * Adds attribute
     *
     * @param string $name
     * @param string $value
     * @return DOMText
     */
    public function attribute(string $name, string $value) : \DOMAttr
    {
        $attr = $this->document->createAttribute($name);
        $attr->value = $value;
        return $attr;
    }

    /**
     * Adds DOM element, optionally with text
     *
     * @param string $type Type of node
     * @param string $content Initial content of node
     * @return DOMElement
     */
    public function node(string $type, string $content = null) : \DOMElement
    {
        $node = $this->document->createElement($type);

        // Add text if non-empty
        if (!empty($content)) {
            $textNode = $this->document->createTextNode($content);
            $node->appendChild($textNode);
        }

        return $node;
    }
}
