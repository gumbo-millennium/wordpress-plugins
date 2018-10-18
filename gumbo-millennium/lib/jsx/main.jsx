/**
 * Main Gutenberg module loader
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Import objects
import overrideCoreBlocks from './helpers/core-wrapper'
import filterBlocks from './whitelist'
import registerBlocks from './blocks'

/*
  HELPER METHODS
*/

// Filter blocks
filterBlocks()

// Wrap core blocks in .container
overrideCoreBlocks()

/*
  BLOCK REGISTRATION
*/
registerBlocks()
