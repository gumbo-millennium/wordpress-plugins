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
const { __ } = wp.i18n
const { IconButton } = wp.components
const { RichText, MediaUpload } = wp.editor

// Metadata
const meta = {
  title: 'Bestuurslid',
  icon: svg('board-member'),

  // Only as parent of the board members block
  parent: ['gumbo/board-members', 'core/columns']
}

// Attributes
const attributes = {
  id: {
    type: 'number'
  },
  src: {
    type: 'string',
    source: 'attribute',
    attribute: 'src',
    selector: '.board-members__member-photo'
  },
  name: {
    type: 'string',
    source: 'html',
    selector: '.board-members__member-name'
  },
  role: {
    type: 'string',
    source: 'html',
    selector: '.board-members__member-role'
  }
}

// Edit method (editor-visible HTML)
const edit = ({ attributes, className, setAttributes }) => {
  /**
   * Finds properly scaled image
   * @param {objet} media
   */
  const onSelectImage = media => {
    // Find properly scaled media
    const scaledMedia = findClosestImageSize(media, 300)

    // Sets the attributes
    setAttributes({
      src: scaledMedia.url ? scaledMedia.url : null,
      id: scaledMedia.url ? scaledMedia.id : null
    })
  }

  /**
   * Entire image should be clickable to chang
   * @param {object} param0
   */
  let iconPlaceholder = ({ open }) => {
    if (!attributes.src) {
      return <div
        className="board-members__member-photo board-members__member-photo--placeholder">
        <IconButton icon="format-image" onClick={open} children={__('Select an image')} />
      </div>
    } else {
      return <img
        src={attributes.src}
        alt={attributes.name}
        className="img-fluid board-members__member-photo"
        onClick={open} />
    }
  }

  return <div className="board-members__member">
    <MediaUpload
      onSelect={onSelectImage}
      type="image"
      value={attributes.id}
      render={iconPlaceholder}
    />
    <RichText
      tagName="p"
      multiline=""
      className="board-members__member-name"
      placeholder="Joanne Doe"
      value={attributes.name}
      onChange={(name) => setAttributes({ name })}
    />
    <RichText
      tagName="p"
      multiline=""
      className="board-members__member-role"
      placeholder="Dakloos"
      value={attributes.role}
      onChange={(role) => setAttributes({ role })}
    />
  </div>
}

// Save method (stored HTML)
const save = function ({ attributes }) {
  // Get image or placeholder
  const image = attributes.src ? (
    <img src={attributes.src} alt={attributes.name} className="img-fluid board-members__member-photo" />
  ) : (
    <div className="board_members__member-photo board_members__member-photo--placeholder"></div>
  )

  // Render HTML
  return <div className="col-md-4 col-sm-6 board-members__member-row">
    <address className="board-members__member">
      {image}
      <RichText.Content tagName="p" value={attributes.name} className="board-members__member-name" />
      <RichText.Content tagName="p" value={attributes.role} className="board-members__member-role" />
    </address>
  </div>
}

// Publish block
export default () => {
  registerBlockType('gumbo/board-member', {
    ...meta,
    attributes,
    edit,
    save
  })
}
