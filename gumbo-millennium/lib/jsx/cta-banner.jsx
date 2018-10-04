/**
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

import registerBlock from './gumbo'
import iconRender from './svg'
import LinkedButton from './components/linked-button'

const BLOCK_NAME = 'gumbo/cta-block'
const { RichText } = wp.editor
const icon = iconRender('bullseye')

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

const edit = props => {
  console.log('Got properties: %O', props)
  let { attributes, setAttributes } = props

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

const save = ({attributes}) => {
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

const init = () => {
  registerBlock({
    name: BLOCK_NAME,
    title: 'Call to Action blok',
    icon: icon,

    attributes: attributes,
    edit: edit,
    save: save
  })
}

export default init
