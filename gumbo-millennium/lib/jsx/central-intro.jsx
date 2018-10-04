/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

import registerBlock from './gumbo'
import iconRender from './svg'

const BLOCK_NAME = 'gumbo/central-intro'
const { RichText } = wp.editor
const icon = iconRender('question')

const attributes = {
  title: {
    source: 'text',
    selector: '.central-intro__title'
  },
  content: {
    source: 'html',
    selector: '.central-intro__content'
  }
}

const edit = function ({ attributes, className, setAttributes }) {
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

const save = function ({ attributes }) {
  return <div className="central-intro">
    <div className="central-intro__container">
      <RichText.Content tagName="h3" className="central-intro__title" value={attributes.title} />
      <hr className="central-intro__divider" />
      <RichText.Content tagName="p" className="central-intro__content" value={attributes.content} />
    </div>
  </div>
}

const init = () => {
  registerBlock({
    name: BLOCK_NAME,
    title: 'Centrale pagina intro',
    icon: icon,

    attributes: attributes,
    edit: edit,
    save: save,

    styles: [
      { name: 'light', label: 'Licht', isDefault: true },
      { name: 'regular', label: 'Normaal' },
      { name: 'dark', label: 'Donker' },
      { name: 'brand', label: 'Gumbo Groen' }
    ]
  })
}

export default init
