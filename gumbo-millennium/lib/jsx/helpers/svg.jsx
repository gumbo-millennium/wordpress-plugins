/**
 * SVG icons
 *
 * @author Roelof Roos <github@roelof.io>
 * @license (SEE /LICENSE.md)
 */

const icons = {
  'banner-icon': {
    paths: [
      [false, 'M24 24H0V0h24v24z'],
      [true, 'M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z']
    ]
  },
  // Large banner (full height)
  'banner-large': {
    paths: [
      [false, 'M0 0h24v24H0z'],
      [true, 'M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z']
    ]
  },
  // Medium banner
  'banner-medium': {
    paths: [
      [false, 'M0 0h24v24H0z'],
      [true, 'M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z']
    ]
  },
  // Small banner (short)
  'banner-small': {
    paths: [
      [false, 'M0 0h24v24H0z'],
      [true, 'M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z']
    ]
  },
  // Outline of a banner
  'banner-size': {
    paths: [
      [false, 'M0 0h24v24H0z'],
      [true, 'M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z']
    ]
  },
  // Board group, contains board members
  'board-group': {
    paths: [
      [false, 'M0 0h24v24H0z'],
      [true, 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z']
    ]
  },
  // Board member
  'board-member': {
    paths: [
      [true, 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'],
      [false, 'M0 0h24v24H0z']
    ]
  },
  // Call to action
  'call-to-action': {
    path: 'M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z'
  },
  // Event, single
  event: {
    paths: [
      [true, 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z'],
      [false, 'M0 0h24v24H0z']
    ]
  },
  // Fire / hot
  fire: {
    paths: [
      [true, 'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z'],
      [false, 'M0 0h24v24H0z']
    ]
  },
  // Info
  info: {
    paths: [
      [false, 'M0 0h24v24H0z'],
      [true, 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z']
    ]
  },
  // Quote / comment
  quote: {
    paths: [
      [true, 'M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'],
      [false, 'M0 0h24v24H0z']
    ]
  },
  // Sponsor
  sponsor: {
    paths: [
      [true, 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z'],
      [false, 'M0 0h24v24H0z']
    ]
  },
  // Star, used on unique selling points
  star: {
    paths: [
      [true, 'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'],
      [false, 'M0 0h24v24H0z']
    ]
  }
}

const getIconProperties = iconName => {
  if (!icons.hasOwnProperty(iconName)) {
    console.error(`Tried to load SVG icon ${iconName}, but the icon doesn't exist!`)
    return null
  }

  const icon = icons[iconName]
  const properties = {
    viewBox: icon.size || '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    role: 'img'
  }

  let fields = []
  if (icon.paths) {
    icon.paths.forEach(field => {
      fields.push(<path fill={field[0] ? 'currentColor' : 'none'} d={field[1]} />)
    })
  }

  if (icon.path) {
    fields.push(<path fill="currentColor" d={icon.path} />)
  }

  return {
    ...properties,
    children: fields
  }
}

/**
 * Builds an icon, using the name specified
 *
 * @param {String} iconName Icon name
 * @param {Number} size Size of the icon, in pixels
 * @returns {null|Function}
 */
const buildIcon = (iconName, size = null) => {
  console.log('Called with %o', [iconName, size])

  let props = getIconProperties(iconName)

  if (size) {
    return <svg {...props} width={size} height={size} />
  }

  return <svg {...props} />
}

export default buildIcon
