/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const blockName = 'gumbo/sponsor-large'
const { registerBlockType, registerBlockStyle } = wp.blocks
const blockStyle = {
  backgroundColor: '#900',
  color: '#fff',
  padding: '20px'
}

const edit = ({ attributes }) => {
  return <p className="sponsor-large-block {{attributes.className}}">Hello editor.</p>
}

const save = ({ attributes }) => {
  return <p className={attributes.className}>Hello saved content.</p>
}

const config = {
  title: 'Sponsor (groot)',

  icon: 'archive',

  category: 'layout',

  edit: edit,
  save: save
}

const init = () => {
  console.log('Registering config %O for %O', config, blockName)
  console.log('Using %O', registerBlockType)

  registerBlockType(blockName, config)
  registerBlockStyle(blockName, 'gray')
}

export default init
