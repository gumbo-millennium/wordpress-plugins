/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { registerBlockType } from '../helpers/gumbo'
import svg from './../helpers/svg'

// Constant imports
const { RichText, MediaUpload } = wp.editor

// Metadata
const meta = {
  title: 'Leden citaat',
  icon: svg('comment')
}

// Attributes
const attributes = {
  content: {
    source: 'html',
    selector: '.testimonials__quote'
  },
  author: {
    source: 'text',
    selector: '.testimonials__author-name'
  },
  company: {
    source: 'text',
    selector: '.testimonials__author-company'
  },
  id: {
    type: 'number'
  },
  photo: {
    type: 'string',
    source: 'attribute',
    attribute: 'src',
    selector: '.testimonials__photo'
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
  const onSelectImage = media => {
    if (!media || !media.url) {
      setAttributes({ photo: undefined, id: undefined })
      return
    }
    setAttributes({ photo: media.url, id: media.id })
  }

  let iconPlaceholder
  iconPlaceholder = ({ open }) => {
    if (!attributes.photo) {
      return <div
        className="testimonials__photo testimonials__photo--placeholder"
        onClick={open} />
    } else {
      return <img
        src={attributes.photo}
        className="testimonials__photo"
        onClick={open} />
    }
  }

  let icon = <MediaUpload
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
  return <div className="testimonials">
    <div className="container">
      <RichText.Content tagName="div" className="testimonials__quote" value={attributes.content} />
      <div className="testimonials__meta">
        <img src={attributes.photo} className="testimonials__photo" />
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
    styles,
    save,
    edit
  })
}
