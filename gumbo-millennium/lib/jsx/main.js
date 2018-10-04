/**
 * Main Gutenberg module loader
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Import objects
import filterBlocks from './whitelist'
import registerCentralIntro from './central-intro'
import registerCtaBanner from './cta-banner'
import registerSponsor from './sponsor'
import registerTestimonials from './testimonials'
import registerUSPGroup from './unique-selling-points'
import registerUSPItem from './unique-selling-point'

/*
  HELPER METHODS
*/

// Filter blocks
filterBlocks()

/*
  BLOCK REGISTRATION
*/

// Register central introduction
registerCentralIntro()

// Register call-to-action banner
registerCtaBanner()

// Register sponsor block
registerSponsor()

// Register testimonials
registerTestimonials()

// Register the Unique Selling Points
registerUSPGroup()
registerUSPItem()

