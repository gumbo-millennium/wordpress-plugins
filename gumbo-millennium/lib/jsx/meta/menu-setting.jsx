/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import svg from './../helpers/svg'
import { registerBlockType } from '../helpers/gumbo'

// Constant imports
const { RichText } = wp.editor

// Metadata
const meta = {
  title: 'Navigatiebalk instellingen',
  icon: svg('a11y')
}

// Attributes
const attributes = {
  transparent: {
    source: 'meta',
    meta: 'navbar_transparent',
    type: 'boolean'
  },
  fixed: {
    source: 'meta',
    meta: 'navbar_fixed',
    type: 'boolean'
  }
}

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  return <div className="central-intro central-intro--editor">
    <RichText
      tagName="h3"
      format="string"
      className="central-intro__title"
      placeholder="Welkom op de website"
      value={attributes.title}
      onChange={(title) => setAttributes({ title })}
    />
    <hr className="central-intro__divider" />
    <RichText
      tagName="p"
      format="string"
      placeholder="Dit is de mooiste website van Nederland."
      className="central-intro__content"
      value={attributes.content}
      onChange={(content) => setAttributes({ content })}
    />
  </div>
}

// Publish block
export default () => {
  registerBlockType('gumbo/meta-menu-setting', {
    ...meta,
    attributes,
    edit
  })
}
