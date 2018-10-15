/**
 * Load blocks
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

import registerBanner from './banner'
import registerCentralIntro from './central-intro'
import registerCtaBanner from './cta-banner'
import registerSponsor from './sponsor'
import registerTestimonial from './testimonials'
import registerUniqueSellingPoint from './unique-selling-point'
import registerUniqueSellingPoints from './unique-selling-points'

export default function () {
  // Register blocks
  registerBanner()
  registerCentralIntro()
  registerCtaBanner()
  registerSponsor()
  registerTestimonial()
  registerUniqueSellingPoint()
  registerUniqueSellingPoints()
}
