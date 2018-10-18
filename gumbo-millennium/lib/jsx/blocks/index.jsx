/**
 * Load blocks
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

import registerBoardMembers from './board-members'
import registerBoardMember from './board-member'
import registerCentralIntro from './central-intro'
import registerCtaBanner from './cta-banner'
import registerHero from './hero'
import registerSponsor from './sponsor'
import registerTestimonial from './testimonials'
import registerUniqueSellingPoint from './unique-selling-point'
import registerUniqueSellingPoints from './unique-selling-points'

export default function () {
  // Register blocks
  registerBoardMembers()
  registerBoardMember()
  registerCentralIntro()
  registerCtaBanner()
  registerHero()
  registerSponsor()
  registerTestimonial()
  registerUniqueSellingPoint()
  registerUniqueSellingPoints()
}
