/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

import registerBlock from './gumbo'

const BLOCK_NAME = 'gumbo/unique-selling-point'
const { RichText, MediaUpload } = wp.editor

const attributes = {
  title: {
    source: 'text',
    selector: '.unique-selling-points__feature-title'
  },
  content: {
    source: 'html',
    selector: '.unique-selling-points__feature-desc'
  },
  id: {
    type: 'number'
  },
  src: {
    type: 'string',
    source: 'attribute',
    attribute: 'src',
    selector: '.unique-selling-points__feature-icon'
  }
}

const edit = function ({ attributes, setAttributes }) {
  const onSelectImage = media => {
    if (!media || !media.url) {
      setAttributes({ src: undefined, id: undefined })
      return
    }
    setAttributes({ src: media.url, id: media.id })
  }

  let iconPlaceholder
  iconPlaceholder = ({open}) => {
    if (!attributes.src) {
      return <div
        className="unique-selling-points__feature-icon unique-selling-points__feature-icon--placeholder"
        onClick={open} />
    } else {
      return <img
        src={attributes.src}
        className="unique-selling-points__feature-icon"
        onClick={open} />
    }
  }

  let icon = <MediaUpload
    onSelect={onSelectImage}
    type="image"
    value={attributes.id}
    render={iconPlaceholder}
  />

  return <div className="unique-selling-points__feature unique-selling-points__feature--editor">
    {icon}
    <section className="unique-selling-points__feature-inner">
      <RichText
        tagName="h4"
        multiline=""
        className="unique-selling-points__feature-title"
        placeholder="Uniek verkooppunt"
        value={attributes.title}
        onChange={(title) => setAttributes({ title })}
      />
      <RichText
        tagName="p"
        className="unique-selling-points__feature-desc"
        placeholder="Omschrijving van dit unieke verkooppunt"
        value={attributes.content}
        onChange={(content) => setAttributes({ content })}
      />
    </section>
  </div>
}

const save = function ({ attributes }) {
  return <div className="col-md-6 unique-selling-points__feature">
    <img src={attributes.src} className="unique-selling-points__feature-icon" />
    <section className="unique-selling-points__feature-inner">
      <RichText.Content tagName="h4" className="unique-selling-points__feature-title" value={attributes.title} />
      <RichText.Content tagName="p" value={attributes.content} className="unique-selling-points__feature-desc" />
    </section>
  </div>
}

const init = () => {
  registerBlock({
    name: BLOCK_NAME,
    title: 'Verkooppunt',

    // Only as parent of the USPs block
    parent: ['gumbo/unique-selling-points', 'core/columns'],

    attributes: attributes,
    edit: edit,
    save: save
  })
}

export default init
