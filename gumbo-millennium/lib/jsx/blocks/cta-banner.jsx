/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { registerBlockType } from '../helpers/gumbo'
import LinkedButton from '../components/linked-button'
import svg from './../helpers/svg'

// Constant imports
const { RichText } = wp.editor

// Metadata
const meta = {
  title: 'Call to Action blok',
  icon: svg('call-to-action')
}

// Attributes
const attributes = {
  primary: {
    source: 'html',
    selector: '.cta-banner__text-primary'
  },
  secondary: {
    source: 'html',
    selector: '.cta-banner__text-secondary'
  },
  linkText: {
    source: 'text',
    selector: '.cta-banner__btn'
  },
  linkUrl: {
    type: 'string',
    source: 'attribute',
    attribute: 'href',
    selector: '.cta-banner__btn'
  }
}

// List of styles
const styles = [
  { name: 'light', label: 'Licht', isDefault: true },
  { name: 'regular', label: 'Normaal' },
  { name: 'dark', label: 'Donker' },
  { name: 'brand', label: 'Gumbo Groen' }
]

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  return <div className="cta-banner cta-banner--editor">
    <div className="cta-banner__text-container">
      <RichText
        tagName="strong"
        multiline=""
        className="cta-banner__text-primary"
        placeholder="Ready to join the action?"
        value={attributes.primary}
        onChange={primary => setAttributes({ primary })}
      />
      <RichText
        tagName="p"
        multiline=""
        className="cta-banner__text-secondary"
        placeholder="What's really holding you back?"
        value={attributes.secondary}
        onChange={secondary => setAttributes({ secondary })}
      />
    </div>

    <div className="cta-banner__link-container">
      <LinkedButton
        tagName="a"
        multiline=""
        className="cta-banner__btn"
        placeholder="Join us"
        title={attributes.linkText}
        url={attributes.linkUrl}
        onTitleChange={linkText => setAttributes({ linkText })}
        onUrlChange={linkUrl => setAttributes({ linkUrl })}
      />
    </div>
  </div>
}

// Save method (stored HTML)
const save = ({ attributes }) => {
  return <div className="cta-banner">
    <div className="container cta-banner__container">
      <div className="cta-banner__text-container">
        <RichText.Content tagName="strong" className="cta-banner__text-primary" value={attributes.primary} />
        <RichText.Content tagName="p" className="cta-banner__text-secondary" value={attributes.secondary} />
      </div>

      <RichText.Content
        tagName="a"
        className="cta-banner__btn"
        href={attributes.linkUrl}
        value={attributes.linkText} />
    </div>
  </div>
}

// Publish block
export default () => {
  registerBlockType('gumbo/cta-block', {
    ...meta,
    attributes,
    styles,
    save,
    edit
  })
}
