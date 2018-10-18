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
  title: 'Bestuursleden',
  icon: svg('board-group')
}

// Attributes
const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: '.board-members__header-title'
  }
}

// Edit definitions
const ALLOWED_BLOCKS = ['gumbo/board-member']
const TEMPLATE = times(5, () => ['gumbo/board-member'])

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  return <section className="board-members board-members--editor">
    <div className="board-members__header">
      <RichText
        tagName="h3"
        className="board-members__header-text"
        placeholder="Typ een slimme titel"
        value={attributes.title}
        onChange={(title) => setAttributes({ title })}
      />
    </div>
    <div className="board-members__members">
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
      />
    </div>
  </section>
}

// Save method (stored HTML)
const save = function ({ attributes }) {
  return <section className="gumbo-shaded-block board-members board-members--editor">
    <div className="container board-members__container">
      <div className="board-members__header">
        <RichText.Content
          tagName="h3"
          className="board-members__header-title"
          value={attributes.title}
        />
      </div>
      <div className="row board-members__members">
        <InnerBlocks.Content />
      </div>
    </div>
  </section>
}

// Publish block
export default () => {
  registerBlockType('gumbo/board-members', {
    ...meta,
    attributes,
    edit,
    save
  })
}
