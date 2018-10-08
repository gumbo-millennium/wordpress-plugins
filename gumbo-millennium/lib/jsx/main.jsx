/**
 * Main Gutenberg module loader
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Import objects
import filterBlocks from './whitelist'
import registerBlocks from './blocks'
import registerMeta from './meta'

/*
  HELPER METHODS
*/

// Filter blocks
filterBlocks()

/*
  META BLOCK REGISTRATION
*/
registerMeta()

/*
  BLOCK REGISTRATION
*/
registerBlocks()
