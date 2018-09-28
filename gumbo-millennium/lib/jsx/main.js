/**
 * Main Gutenberg module loader
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Import objects
import registerUSPGroup from './unique-selling-points'
import registerUSPItem from './unique-selling-point'
import registerSponsor from './sponsor'

// Register the Unique Selling Points
registerUSPGroup()
registerUSPItem()

// Register sponsor block
registerSponsor()
