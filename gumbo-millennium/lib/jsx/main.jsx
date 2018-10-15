/**
 * Main Gutenberg module loader
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Import objects
import filterBlocks from './whitelist'
import registerBlocks from './blocks'

/*
  HELPER METHODS
*/

// Filter blocks
filterBlocks()

/*
  BLOCK REGISTRATION
*/
registerBlocks()
