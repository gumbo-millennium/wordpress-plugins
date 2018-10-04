/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n
const {
  Component,
  Fragment
} = wp.element
const { compose } = wp.compose
const {
  Dashicon,
  IconButton
} = wp.components
const {
  URLInput,
  RichText
} = wp.editor

class LinkedButton extends Component {
  constructor () {
    super(...arguments)
    this.nodeRef = null
    this.bindRef = this.bindRef.bind(this)
  }

  bindRef (node) {
    if (!node) {
      return
    }
    this.nodeRef = node
  }

  render () {
    const {
      title,
      url,
      onTitleChange,
      onUrlChange,
      className
    } = this.props

    return (
      <Fragment>
        <div className="gumbo-editor-button" ref={this.bindRef}>
          <RichText
            placeholder={ __('Add text…') }
            value={title}
            onChange={(value) => onTitleChange(value)}
            formattingControls={[]}
            className={classnames(
              className,
              'gumbo-editor-button__inner'
            )}
            keepPlaceholderOnFocus
          />
        </div>
        <form
          className={classnames(
            'block-library-button__inline-link',
            'gumbo-editor-button__inner'
          )} onSubmit={(event) => event.preventDefault()}>
          <Dashicon icon="admin-links" />
          <URLInput
            value={url}
            onChange={(value) => onUrlChange(value)}
          />
          <IconButton icon="editor-break" label={ __('Apply') } type="submit" />
        </form>
      </Fragment>
    )
  }
}

export default compose()(LinkedButton)
