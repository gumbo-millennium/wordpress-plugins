/**
 * SVG icons
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const icons = {
  ad: {
    title: 'Ad indicator',
    description: 'The word "ad" in a rounded rectangular box',
    size: '0 0 512 512',
    path: 'M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm16 336c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16V112c0-8.82 7.18-16 16-16h416c8.82 0 16 7.18 16 16v288zm-72-240h-16c-4.42 0-8 3.58-8 8v64.88c-9.45-5.5-20.28-8.88-32-8.88-35.35 0-64 28.65-64 64s28.65 64 64 64c11.72 0 22.55-3.38 32-8.88v.88c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V168c0-4.42-3.58-8-8-8zm-56 160c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32zM196.97 165.13a8.007 8.007 0 0 0-7.47-5.13h-27.01c-3.31 0-6.28 2.04-7.47 5.13l-67.69 176C85.31 346.37 89.18 352 94.8 352h17.15c3.31 0 6.28-2.04 7.47-5.13L142.07 288h67.86l22.64 58.87a8.007 8.007 0 0 0 7.47 5.13h17.15c5.62 0 9.48-5.63 7.47-10.87l-67.69-176zM154.37 256L176 199.77 197.63 256h-43.26z'
  },
  question: {
    title: 'Question symbol',
    description: 'A question mark in a circle',
    size: '0 0 512 512',
    path: 'M256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm7.67-24h-16c-6.627 0-12-5.373-12-12v-.381c0-70.343 77.44-63.619 77.44-107.408 0-20.016-17.761-40.211-57.44-40.211-29.144 0-44.265 9.649-59.211 28.692-3.908 4.98-11.054 5.995-16.248 2.376l-13.134-9.15c-5.625-3.919-6.86-11.771-2.645-17.177C185.658 133.514 210.842 116 255.67 116c52.32 0 97.44 29.751 97.44 80.211 0 67.414-77.44 63.849-77.44 107.408V304c0 6.627-5.373 12-12 12zM256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8z'
  },
  bullseye: {
    title: 'Bullseye',
    description: 'A mouse cursor pointing at the centre of a target',
    size: '0 0 496 512',
    path: 'M241.5 240.7L20.83 303.41c-15.63 4.44-17.46 25.86-2.82 32.89l55.27 26.54-60.59 60.59c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c6.25 6.25 14.44 9.37 22.63 9.37s16.38-3.12 22.63-9.37l60.59-60.59 26.54 55.27c3.25 6.76 9.56 10.01 15.86 10.01 7.34 0 14.64-4.41 17.04-12.83l62.72-220.67c3.77-13.3-8.53-25.57-21.82-21.79zm-61.35 197.32l-29.7-61.85-92.51 92.51-22.62-22.62 92.51-92.51-61.84-29.71 159.5-45.33-45.34 159.51zM328 256c0-44.11-35.89-80-80-80-33.74 0-62.53 21.07-74.26 50.69C228.07 211.24 236.67 208 248 208c26.47 0 48 21.53 48 48 0 11.26-3.1 19.44-18.69 74.26C306.93 318.53 328 289.74 328 256zm-76.08 163.61C340.71 417.47 412 345.29 412 256c0-90.65-73.36-164-164-164-89.31 0-161.47 71.3-163.61 160.08l32.95-9.36C124.12 176.23 179.76 124 248 124c72.79 0 132 59.21 132 132 0 68.23-52.24 123.88-118.71 130.66l-9.37 32.95zM248 8C111.03 8 0 119.03 0 256c0 7.3.47 14.49 1.09 21.63 3.46-1.97 7-3.87 10.99-5l20.47-5.82c-.18-3.6-.55-7.16-.55-10.81 0-119.1 96.9-216 216-216s216 96.9 216 216-96.9 216-216 216c-3.65 0-7.21-.37-10.81-.55l-5.82 20.46c-1.14 4.02-3.15 7.5-5.14 10.98 7.19.63 14.42 1.1 21.77 1.1 136.97 0 248-111.03 248-248S384.97 8 248 8z'
  },
  images: {
    title: 'Collection of images',
    description: 'Two rectangular image symbols stacked onto eachother',
    size: '0 0 576 512',
    path: 'M528 32H112c-26.51 0-48 21.49-48 48v16H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-16h16c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-48 400c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h16v240c0 26.51 21.49 48 48 48h368v16zm64-64c0 8.822-7.178 16-16 16H112c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM176 200c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm240.971 23.029c-9.373-9.373-24.568-9.373-33.941 0L288 238.059l-31.029-31.03c-9.373-9.373-24.569-9.373-33.941 0l-88 88A24.002 24.002 0 0 0 128 312v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88zM480 320H160v-4.686l80-80 48 48 112-112 80 80V320z'
  },
  trophy: {
    title: 'Trophy',
    description: 'An outline of a trophy',
    size: '0 0 576 512',
    path: 'M370.5 138.9l-50.2-7.3-22.5-45.5c-4-8.1-15.7-8.2-19.7 0l-22.5 45.5-50.2 7.3c-9 1.3-12.6 12.4-6.1 18.8l36.3 35.4-8.6 50c-1.5 8.9 7.9 15.8 16 11.6l44.9-23.6 44.9 23.6c8 4.2 17.5-2.6 16-11.6l-8.6-50 36.3-35.4c6.7-6.4 3-17.5-6-18.8zm-60.3 44.4l5.2 30.6-27.4-14.4-27.5 14.4 5.2-30.6-22.2-21.6 30.7-4.5 13.7-27.8 13.7 27.8 30.7 4.5-22.1 21.6zM448 64V12c0-6.6-5.4-12-12-12H140c-6.6 0-12 5.4-12 12v52H12C5.4 64 0 69.4 0 76v61.6C0 199.7 68.1 272 160.7 285.7c29.4 60.7 73.7 90.3 111.3 96.9V480h-86c-14.4 0-26 11.7-26 26.1 0 3.3 2.7 5.9 6 5.9h244c3.3 0 6-2.6 6-5.9 0-14.4-11.6-26.1-26-26.1h-86v-97.4c37.7-6.6 81.9-36.2 111.3-96.9C508 272 576 199.6 576 137.6V76c0-6.6-5.4-12-12-12H448zM32 137.6V96h96v24c0 51.8 7 94.9 18.5 130.2C77.9 232.5 32 178 32 137.6zM288 352c-72 0-128-104-128-232V32h256v88c0 128-56 232-128 232zm256-214.4c0 40.4-46 94.9-114.5 112.6C441 214.9 448 171.8 448 120V96h96v41.6z'
  },
  comment: {
    title: 'Comment balloon',
    description: 'A rectangular balloon containing arbitrary text, symbolizing a discussion entry',
    size: '0 0 512 512',
    path: 'M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm32 352c0 17.6-14.4 32-32 32H293.3l-8.5 6.4L192 460v-76H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h384c17.6 0 32 14.4 32 32v288zM280 240H136c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h144c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm96-96H136c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8z'
  },
  a11y: {
    title: 'Accessibility icon',
    description: 'A human figure in an outlined circle',
    size: '0 0 512 512',
    path: 'M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.663 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.663 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm139.701-299.677c2.03 8.601-3.296 17.218-11.896 19.249-31.006 7.321-59.956 13.775-88.689 17.114.535 114.852 13.167 139.988 27.255 176.036 4.02 10.289-1.063 21.888-11.352 25.906-10.296 4.022-21.89-1.069-25.906-11.352-9.319-23.841-18.551-44.565-24.271-87.277h-9.685c-5.728 42.773-14.986 63.515-24.27 87.276-4.023 10.299-15.633 15.369-25.906 11.353-10.289-4.019-15.371-15.617-11.353-25.906 14.103-36.083 26.72-61.235 27.255-176.036-28.734-3.339-57.683-9.793-88.689-17.114-8.6-2.031-13.926-10.648-11.895-19.249 2.03-8.6 10.647-13.926 19.249-11.896 105.222 24.845 135.48 24.893 240.904 0 8.599-2.022 17.218 3.297 19.249 11.896zm-177.895-42.517c0-21.094 17.1-38.193 38.194-38.193s38.194 17.1 38.194 38.193S277.094 168 256 168s-38.194-17.1-38.194-38.194z'
  }
}

/**
 * Builds an icon, using the name specified
 *
 * @param {String} iconName Icon name
 * @returns {null|Function}
 */
const buildIcon = iconName => {
  if (!icons.hasOwnProperty(iconName)) {
    return null
  }

  const icon = icons[iconName]
  const properties = {
    viewBox: icon.size,
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-labelledby': 'title',
    'aria-describedby': 'description',
    role: 'img'
  }

  return <svg {...properties }>
    <title id="title">{icon.title}</title>
    <desc id="description">{icon.description}</desc>
    <g>
      <path fill="currentColor" d={icon.path} />
    </g>
  </svg>
}

export default buildIcon