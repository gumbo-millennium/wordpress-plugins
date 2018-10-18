/**
 * Unique selling point, child of unique parent nodes
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { findClosestImageSize } from '../helpers/image-helper'
import { registerBlockType } from '../helpers/gumbo'
import svg from './../helpers/svg'

// Constant imports
const { RichText, MediaUpload } = wp.editor

// Metadata
const meta = {
  title: 'Uniek verkooppunt',
  icon: svg('key-selling-point'),

  // Only as parent of the USPs block
  parent: ['gumbo/unique-selling-points', 'core/columns']
}

// Attributes
const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: '.unique-selling-points__feature-title'
  },
  content: {
    type: 'string',
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

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  const onSelectImage = media => {
    // Find properly scaled media
    const scaledMedia = findClosestImageSize(media, 32)

    // Sets the attributes
    setAttributes({
      src: scaledMedia.url ? scaledMedia.url : null,
      id: scaledMedia.url ? scaledMedia.id : null
    })
  }

  let iconPlaceholder
  iconPlaceholder = ({ open }) => {
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
    allowedTypes={['image']}
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

// Save method (stored HTML)
const save = function ({ attributes }) {
  const icon = attributes.src ? (
    <img role="presentation" src={attributes.src} className="unique-selling-points__feature-icon" />
  ) : (
    <div role="presentation" className="unique-selling-points__feature-icon unique-selling-points__feature-icon--placeholder" />
  )
  return <section className="col-md-6 unique-selling-points__feature">
    {icon}
    <div className="unique-selling-points__feature-inner">
      <RichText.Content tagName="h4" className="unique-selling-points__feature-title" value={attributes.title} />
      <RichText.Content tagName="p" value={attributes.content} className="unique-selling-points__feature-desc" />
    </div>
  </section>
}

// Publish block
export default () => {
  registerBlockType('gumbo/unique-selling-point', {
    ...meta,
    attributes,
    edit,
    save
  })
}
