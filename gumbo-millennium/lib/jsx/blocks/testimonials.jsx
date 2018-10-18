/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { findClosestImageSize } from '../helpers/image-helper'
import { registerBlockType } from '../helpers/gumbo'
import svg from './../helpers/svg'

// Constant imports
const { Dashicon } = wp.components
const { RichText, MediaUpload } = wp.editor

// Metadata
const meta = {
  title: 'Leden citaat',
  icon: svg('quote'),
  keywords: ['quote', 'cite']
}

// Attributes
const attributes = {
  content: {
    type: 'string',
    source: 'html',
    selector: '.testimonials__quote'
  },
  author: {
    type: 'string',
    source: 'html',
    selector: '.testimonials__author-name'
  },
  company: {
    type: 'string',
    source: 'html',
    selector: '.testimonials__author-company'
  },
  id: {
    type: 'number'
  },
  photo: {
    type: 'string',
    source: 'attribute',
    attribute: 'data-photo',
    selector: '.testimonials__photo'
  }
}

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  /**
   * Finds the properly sized media for this element
   * @param {object} media
   */
  const onSelectImage = media => {
    // Find properly scaled media
    const scaledMedia = findClosestImageSize(media, 64)

    // Sets the attributes
    setAttributes({
      photo: scaledMedia.url ? scaledMedia.url : null,
      id: scaledMedia.url ? scaledMedia.id : null
    })
  }

  /**
   * Shows an icon on the media selector
   *
   * @param {object} param0
   */
  const iconPlaceholder = ({ open }) => {
    return attributes.photo ? (
      <div data-photo={attributes.photo} className="testimonials__photo" onClick={open} style={{
        'background-image': `url("${attributes.photo}")`
      }} />
    ) : (
      <div
        className="testimonials__photo testimonials__photo--placeholder" onClick={open}>
        <Dashicon icon="format-image" />
      </div>
    )
  }

  /**
   * Icon picker, invisibly wraps the containing node
   */
  const icon = <MediaUpload
    onSelect={onSelectImage}
    type="image"
    value={attributes.id}
    render={iconPlaceholder}
  />

  return <div className="testimonials testimonials--editor">
    <RichText
      tagName="div"
      multiline=""
      className="testimonials__quote"
      placeholder="Alle wegen leiden naar Rome"
      value={attributes.content}
      onChange={(content) => setAttributes({ content })}
    />
    <div className="testimonials__meta">
      {icon}
      <div className="testimonials__author">
        <RichText
          tagName="p"
          className="testimonials__author-name"
          placeholder="John Doe"
          value={attributes.author}
          onChange={(author) => setAttributes({ author })}
        />
        <RichText
          tagName="p"
          className="testimonials__author-company"
          placeholder="John's Company inc (optioneel)"
          value={attributes.company}
          onChange={(company) => setAttributes({ company })}
        />
      </div>
    </div>
  </div>
}

// Save method (stored HTML)
const save = ({ attributes }) => {
  const photo = attributes.photo ? (
    <div data-photo={attributes.photo} className="testimonials__photo" style={{
      'background-image': `url("${attributes.photo}")`
    }} />
  ) : null

  return <div className="gumbo-shaded-block testimonials">
    <div className="container">
      <RichText.Content tagName="div" className="testimonials__quote" value={attributes.content} />
      <div className="testimonials__meta">
        {photo}
        <div className="testimonials__author">
          <RichText.Content tagName="span" value={attributes.author} className="testimonials__author-name" />
          <RichText.Content tagName="span" value={attributes.company} className="testimonials__author-company" />
        </div>
      </div>
    </div>
  </div>
}

// Publish block
export default () => {
  registerBlockType('gumbo/testimonials', {
    ...meta,
    attributes,
    save,
    edit
  })
}
