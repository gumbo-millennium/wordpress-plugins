/**
 * Unique selling points, contains unique selling point blocks
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { registerBlockType } from '../helpers/gumbo'
import svg from './../helpers/svg'

// Constant imports
const { RichText, InnerBlocks } = wp.editor
const { times } = window.lodash

// Metadata
const meta = {
  title: 'Unieke verkooppunten',
  icon: svg('key-selling-points')
}

// Attributes
const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: '.unique-selling-points__header-title'
  },
  subtitle: {
    type: 'string',
    source: 'html',
    selector: '.unique-selling-points__header-text'
  }
}

// Edit definitions
const ALLOWED_BLOCKS = ['gumbo/unique-selling-point']
const TEMPLATE = times(4, () => ['gumbo/unique-selling-point'])

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  return <div className="unique-selling-points unique-selling-points--editor">
    <div className="container">
      <header className="unique-selling-points__header">
        <RichText
          tagName="h3"
          className="unique-selling-points__header-title"
          placeholder="Typ een slimme titel"
          value={attributes.title}
          onChange={(title) => setAttributes({ title })}
        />
        <RichText
          tagName="p"
          className="unique-selling-points__header-text"
          placeholder="Waarom zou je voor ons kiezen?"
          value={attributes.subtitle}
          onChange={(subtitle) => setAttributes({ subtitle })}
        />
      </header>
      <section className="unique-selling-points__features">
        <div className="row">
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={TEMPLATE}
          />
        </div>
      </section>
    </div>
  </div>
}

// Save method (stored HTML)
const save = function ({ attributes }) {
  return <div className="gumbo-shaded-block unique-selling-points">
    <div className="container">
      <header className="unique-selling-points__header">
        <RichText.Content
          tagName="h3"
          className="unique-selling-points__header-title"
          value={attributes.title}
        />
        <RichText.Content
          tagName="p"
          className="unique-selling-points__header-text"
          value={attributes.subtitle}
        />
      </header>
      <section className="unique-selling-points__features">
        <div className="row">
          <InnerBlocks.Content />
        </div>
      </section>
    </div>
  </div>
}

// Publish block
export default () => {
  registerBlockType('gumbo/unique-selling-points', {
    ...meta,
    attributes,
    edit,
    save
  })
}
