/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { registerBlockType } from '../helpers/gumbo'
import svg from './../helpers/svg'

// Metadata
const meta = {
  title: 'Sponsor',
  icon: svg('ad')
}

// Attributes
const attributes = {}

// List of styles
const styles = []

// Edit method (editor-visible HTML)
const edit = ({ className }) => {
  return <p className="sponsor-placeholder">Sponsor advertentie</p>
}

// Publish block
export default () => {
  registerBlockType('gumbo/sponsor', {
    ...meta,
    attributes,
    styles,
    edit
  })
}