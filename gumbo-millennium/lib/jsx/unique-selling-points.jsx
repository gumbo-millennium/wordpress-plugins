/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Import times
import { times } from 'lodash'
import registerBlock from './gumbo'
import { trophy as icon } from './svg'

const BLOCK_NAME = 'gumbo/unique-selling-points'
const { RichText, InnerBlocks } = wp.editor

const attributes = {
  title: {
    source: 'text',
    selector: '.unique-selling-points__header-title'
  },
  subtitle: {
    source: 'html',
    selector: '.unique-selling-points__header-text'
  }
}

const ALLOWED_BLOCKS = ['gumbo/unique-selling-point']
const TEMPLATE = times(4, () => ['gumbo/unique-selling-point'])

const edit = function ({ attributes, className, setAttributes }) {
  return <div class="unique-selling-points unique-selling-points--editor">
    <div class="container">
      <header class="unique-selling-points__header">
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
      <section class="unique-selling-points__features">
        <div class="row">
          <InnerBlocks
            template={TEMPLATE}
            templateLock="all"
            allowedBlocks={ALLOWED_BLOCKS}
          />
        </div>
      </section>
    </div>
  </div>
}

const save = function ({ attributes }) {
  return <div class="unique-selling-points">
    <div class="container">
      <header class="unique-selling-points__header">
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
      <section class="unique-selling-points__features">
        <div class="row">
          <InnerBlocks.Content />
        </div>
      </section>
    </div>
  </div>
}

const init = () => {
  registerBlock({
    name: BLOCK_NAME,
    title: 'Unieke verkooppunten',
    svg: icon,

    attributes: attributes,
    edit: edit,
    save: save
  })
}

export default init
