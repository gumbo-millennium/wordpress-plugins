/**
 * Block some core Gutenberg blocks, if they're not on the whitelist
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const { getBlockTypes, unregisterBlockType } = wp.blocks

/**
 * List of user-available blocks
 */
const coreWhitelist = [
  'block',
  'code',
  'column',
  'columns',
  'embed',
  'freeform',
  'gallery',
  'heading',
  'html',
  'image',
  'list',
  'more',
  'paragraph',
  'preformatted',
  'quote',
  'separator',
  'spacer',
  'subhead',
  'table',
  'template',
  'text-columns',
  'verse',
  'video'
]

/**
 * List of user-available embeds. Restricted due to privacy policy and GDPR
 */
const embedWhitelist = [
  'youtube',
  'vimeo',
  'dailymotion',
  'ted',
  'mixcloud',
  'soundcloud'
]

/**
 * Filters the blocks to remove not-allowed core blocks
 */
const filterBlocks = () => {
  // Only run if Gutenberg is available
  if (!window.hasOwnProperty('wp')) {
    console.warn('Gutenberg does not appear to be loaded, cannot blacklist')
    return
  }

  // Blacklist some core and embed blocks
  getBlockTypes().forEach(block => {
    // Get namespace and block name
    let [, namespace, name] = block.name.match(/^([a-z0-9-]+)\/(.+)$/i)

    // Remove core blocks if they're not in the whitelist
    if (namespace === 'core' && coreWhitelist.indexOf(name) === -1) {
      unregisterBlockType(block.name)
      return
    }

    // Remove embeds if they're not in the whitelist (GDPR)
    if (namespace === 'core-embed' && embedWhitelist.indexOf(name) === -1) {
      unregisterBlockType(block.name)
    }
  })
}

const bindFilter = () => {
  window.addEventListener('load', filterBlocks, {
    once: true,
    passive: true
  })
}

export default bindFilter
