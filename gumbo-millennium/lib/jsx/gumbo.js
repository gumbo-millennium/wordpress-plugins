/**
 * Gumbo base plugin
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const { registerBlockType } = wp.blocks

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

/**
 * Registers a block, make sure to specify a name, title and icon
 * @param {Object} args
 */
const registerBlock = (args) => {
  let { name, title } = args

  if (!name || !title) {
    throw Error('Did not receive a name or title for a block')
  }

  const finalConfig = {...baseConfig, ...args}

  if (args.hasOwnProperty('supports')) {
    finalConfig.supports = {...baseConfig.supports, ...args.supports}
  }

  if (finalConfig.hasOwnProperty('svg')) {
    finalConfig.icon = args.svg

    delete finalConfig.svg
  }

  delete finalConfig.name

  console.log('Register block %s, %s: %O', name, title, finalConfig)

  registerBlockType(name, finalConfig)
}

export default registerBlock
