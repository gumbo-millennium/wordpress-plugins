/**
 * WordPress dependencies
 */
const { __ } = wp.i18n
const { Component } = wp.element
const { IconButton, BaseControl } = wp.components
const { MediaUpload } = wp.editor

/**
 * Returns the filename of a given path or URL
 *
 * @param {String} path Path or URL of the file
 */
const basename = (path) => {
  return `${path}`.substring(path.lastIndexOf('/') + 1)
}

/**
 * File picker, selects file using the file finder
 */
class FilePickControl extends Component {
  /**
   * Renders the field
   */
  render () {
    const {
      allowedTypes,
      children,
      className,
      help,
      instanceId,
      label,
      mediaId,
      onChange,
      value,
      icon = 'upload',
      ...props
    } = this.props

    let { mediaUrl = null } = this.props

    const id = `inspector-text-control-${instanceId}`

    return (
      <BaseControl label={label} id={id} help={help} className={className}>
        <MediaUpload
          onSelect={media => {
            mediaUrl = media.url
            onChange(media && media.url ? media.url : undefined)
          }}
          allowedTypes={allowedTypes}
          value={mediaId}
          render={({ open }) => (
            <IconButton
              className="is-button is-default"
              icon={icon}
              onClick={open}
              style={{display: 'block'}}
              {...props}
            >
              {mediaUrl ? basename(mediaUrl) : __('Select file')}
            </IconButton>
          )}
        />
      </BaseControl>
    )
  }
}

export default FilePickControl
