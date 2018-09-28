/**
 * Main Gutenberg module loader
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Import objects
import filterBlocks from './whitelist'
import registerUSPGroup from './unique-selling-points'
import registerUSPItem from './unique-selling-point'
import registerSponsor from './sponsor'
import registerCentralIntro from './central-intro'
import registerTestimonials from './testimonials'

// Filter blocks
filterBlocks()

// Register the Unique Selling Points
registerUSPGroup()
registerUSPItem()

// Register sponsor block
registerSponsor()

// Register central introduction
registerCentralIntro()

// Register testimonials
registerTestimonials()
