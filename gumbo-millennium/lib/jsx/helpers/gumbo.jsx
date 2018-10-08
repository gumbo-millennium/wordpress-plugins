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

export function registerBlockType (name, args) {
  let opts = {
    ...baseConfig,
    ...args
  }

  if (!args.hasOwnProperty('supports')) {
    opts.supports = { ...baseConfig.supports, ...args.supports }
  }

  wpRegister(name, opts)
}
