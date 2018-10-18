/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { registerBlockType } from '../helpers/gumbo'
// import LinkedButton from '../components/linked-button'
import svg from './../helpers/svg'

// Constant imports
const { PanelBody, Toolbar } = wp.components
const { Fragment } = wp.element
const { BlockControls, InspectorControls, RichText, URLInputButton } = wp.editor

// Metadata
const meta = {
  title: 'Call to Action blok',
  icon: svg('call-to-action'),
  keywords: ['cta']
}

// Attributes
const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: '.cta-banner__text-primary'
  },
  lead: {
    type: 'string',
    source: 'html',
    selector: '.cta-banner__text-secondary'
  },
  linkText: {
    type: 'string',
    source: 'html',
    selector: '.cta-banner__btn'
  },
  linkUrl: {
    type: 'string',
    source: 'attribute',
    attribute: 'href',
    selector: '.cta-banner__btn'
  }
}

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  const { linkText, linkUrl, title, lead } = attributes

  const changeUrl = (url, post) => {
    if (!linkText && post && post.title) {
      setAttributes({ linkText: post.title })
    }
    setAttributes({ linkUrl: url })
  }

  const controls = (
    <Fragment>
      <BlockControls>
        <Toolbar>
          <URLInputButton
            url={linkUrl || ''}
            onChange={changeUrl}
            placeholder='https://'
          />
        </Toolbar>
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Fuck a duck">

        </PanelBody>
      </InspectorControls>
    </Fragment>
  )

  const textFields = (
    <div className="cta-banner__text-container">
      <RichText
        tagName="strong"
        multiline=""
        className="cta-banner__text-primary"
        placeholder="Ready to join the action?"
        value={title}
        onChange={title => setAttributes({ title })}
      />
      <RichText
        tagName="p"
        multiline=""
        className="cta-banner__text-secondary"
        placeholder="What's really holding you back?"
        value={lead}
        onChange={lead => setAttributes({ lead })}
      />
    </div>
  )

  const ctaButton = (
    <div className="cta-banner__link-container">
      <RichText
        tagName="div"
        multiline=""
        className="cta-banner__btn"
        placeholder="Join us"
        value={linkText}
        onChange={linkText => setAttributes({ linkText })}
      />
    </div>
  )

  const input = (
    <div className="cta-banner cta-banner--editor">
      <div className="cta-banner__container">
        {textFields}
        {ctaButton}
      </div>
    </div>
  )

  return <Fragment>
    {controls}
    {input}
  </Fragment>
}

// Save method (stored HTML)
const save = ({ attributes }) => {
  const {title, lead, linkUrl: url, linkText: text} = attributes

  return <div className="cta-banner">
    <div className="container cta-banner__container">
      <div className="cta-banner__text-container">
        <RichText.Content tagName="strong" className="cta-banner__text-primary" value={title} />
        <RichText.Content tagName="p" className="cta-banner__text-secondary" value={lead} />
      </div>

      <RichText.Content
        tagName="a"
        className="cta-banner__btn"
        href={url}
        value={text} />
    </div>
  </div>
}

// Publish block
export default () => {
  registerBlockType('gumbo/cta-banner', {
    ...meta,
    attributes,
    save,
    edit
  })
}
