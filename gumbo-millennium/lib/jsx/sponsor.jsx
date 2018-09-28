/**
 * Sponsor block
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

import registerBlock from './gumbo'
import { ad as icon } from './svg'

const BLOCK_NAME = 'gumbo/sponsor'

const init = () => {
  registerBlock({
    name: BLOCK_NAME,
    title: 'Sponsor',
    svg: icon,

    supports: {
      multiple: false
    },

    edit: () => <p className="sponsor-placeholder">Sponsor advertentie</p>,
    save: () => null
  })
}

export default init
