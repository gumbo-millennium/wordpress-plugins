/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const blockName = 'gumbo/sponsor'
const { registerBlockType, registerBlockStyle } = wp.blocks

const edit = () => {
  return <p className="sponsor-placeholder">Sponsor advertentie</p>
}

const save = () => null

const config = {
  title: 'Sponsor',
  icon: 'archive',
  category: 'gumbo',

  // Disable custom class
  customClassName: false,
  className: false,

  edit: edit,
  save: save
}

const init = () => registerBlockType(blockName, config)

export default init
