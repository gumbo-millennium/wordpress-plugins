/**
 * Gumbo base plugin
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const { registerBlockType: wpRegister } = wp.blocks

const baseConfig = {
  title: null,
  icon: null,

  // Add category
  category: 'gumbo',

  // Disable class changes
  supports: {
    customClassName: false
  },

  edit: () => null,
  save: () => null
}

export default function registerBlockType (args) {
  let name = args.name || null
  let opts = {
    ...baseConfig,
    ...args
  }

  if (!args.hasOwnProperty('supports')) {
    opts.supports = { ...baseConfig.supports, ...args.supports }
  }

  wpRegister(name, opts)
}
