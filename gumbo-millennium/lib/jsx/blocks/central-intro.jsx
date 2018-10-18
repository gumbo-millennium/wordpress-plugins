/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { registerBlockType } from '../helpers/gumbo'
import svg from './../helpers/svg'

// Constant imports
const { RichText } = wp.editor

// Metadata
const meta = {
  title: 'Centrale pagina intro',
  icon: svg('info')
}

// Attributes
const attributes = {
  title: {
    source: 'html',
    selector: '.central-intro__title'
  },
  content: {
    source: 'html',
    selector: '.central-intro__content'
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

// Save method (stored HTML)
const save = ({ attributes }) => {
  return <div className="gumbo-shaded-block central-intro">
    <div className="central-intro__container">
      <RichText.Content tagName="h3" className="central-intro__title" value={attributes.title} />
      <hr className="central-intro__divider" />
      <RichText.Content tagName="p" className="central-intro__content" value={attributes.content} />
    </div>
  </div>
}

// Publish block
export default () => {
  registerBlockType('gumbo/central-intro', {
    ...meta,
    attributes,
    save,
    edit
  })
}
