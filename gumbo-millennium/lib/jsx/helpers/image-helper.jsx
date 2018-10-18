/**
 * Image helper methods
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const { forEach: _each } = window.lodash

/**
 * Finds the image closest to the given size
 *
 * @param {Object} media Media object from the MediaUpload object
 * @param {int} size Min minimumSize
 * @param {string} dimension Dimension to use, either [width] or [height]
 */
export function findClosestImageSize (media, minimumSize, dimension = null) {
  // Return empty if empty
  if (!media || !media.url) {
    return null
  }

  // Set some values
  let currentSmallestSize = 99999
  let foundMedia = null

  // get array from Media object
  _each(media.sizes, (mediaSize) => {
    let smallestDimension = dimension && mediaSize[dimension] ? mediaSize[dimension] : Math.min(mediaSize.width, mediaSize.height)

    // Update link if better
    if (smallestDimension > minimumSize && smallestDimension < currentSmallestSize) {
      currentSmallestSize = smallestDimension
      foundMedia = mediaSize
    }
  })

  // Return config
  return {
    ...media,
    ...foundMedia
  }
}
