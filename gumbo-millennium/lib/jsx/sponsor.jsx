/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

import registerBlock from './gumbo'
import iconRender from './svg'
const icon = iconRender('ad')

const BLOCK_NAME = 'gumbo/sponsor'

const init = () => {
  registerBlock({
    name: BLOCK_NAME,
    title: 'Sponsor',
    icon: icon,

    supports: {
      multiple: false
    },

    edit: () => <p className="sponsor-placeholder">Sponsor advertentie</p>,
    save: () => null
  })
}

export default init
