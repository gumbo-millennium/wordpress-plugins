/**
 * Hero, in three sizes: small (blog), medium and large
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
/**
 * External dependencies
 */
import classnames from 'classnames'

// WordPress dependencies
import { registerBlockType } from '../helpers/gumbo'
import { default as svg } from './../helpers/svg'

// Constant imports
const { __ } = wp.i18n
const {
  IconButton,
  PanelBody,
  TextControl,
  ToggleControl,
  Toolbar
} = wp.components
const { Fragment } = wp.element
const {
  BlockControls,
  InspectorControls,
  MediaUpload,
  RichText
} = wp.editor

// Metadata
const meta = {
  title: 'Banner',
  icon: svg('hero-icon'),
  keywords: [
    __('hero'),
    __('jumbotron'),
    __('epic')
  ]
}

// Attributes
const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: '.hero__header'
  },
  lead: {
    type: 'string',
    source: 'html',
    selector: '.hero__lead'
  },
  buttonText: {
    type: 'string',
    source: 'html',
    selector: '.hero__cta-btn'
  },
  buttonUrl: {
    type: 'string',
    source: 'attribute',
    attribute: 'href',
    selector: '.hero__cta-btn'
  },
  buttonVisible: {
    type: 'boolean',
    default: true
  },
  hasMosaic: {
    type: 'boolean',
    default: false
  },
  backdropId: {
    type: 'number'
  },
  backdropUrl: {
    type: 'string'
  },
  size: {
    type: 'string',
    source: 'attribute',
    attribute: 'data-size',
    selector: '.hero',
    default: 'medium'
  }
}

const regex = {
  large: /^(large|big)$/i,
  small: /^(blog|small)$/i
}

/**
 * Returns a class name to apply based on the current size name.
 *
 * @param {string} size Current 'size' setting
 * @returns {String} name of the current size, useable as BEM-modifier
 */
const getSizeClass = size => {
  if (regex.large.test(size)) {
    return 'large'
  } else if (regex.small.test(size)) {
    return 'blog'
  } else {
    return 'medium'
  }
}

/**
 * List of sizes available for the hero
 */
const BANNER_SIZES = [
  {
    icon: svg('hero-large'),
    title: __('Tall'),
    size: 'large'
  },
  {
    icon: svg('hero-medium'),
    title: __('Medium'),
    size: 'medium'
  },
  {
    icon: svg('hero-small'),
    title: __('Short'),
    size: 'blog'
  }
]

// Edit method (editor-visible HTML)
/**
 * Edit method (editor-visible HTML)
 *
 * It renders an image icon in the toolbar, to set, change or remove the backdrop image. It also adds a toolbar
 * button to enable / disable the call-to-action button.
 */
const edit = ({ attributes, className, setAttributes }) => {
  // Get some defintions
  const {
    backdropId,
    backdropUrl,
    buttonText,
    buttonUrl,
    buttonVisible,
    hasMosaic,
    lead,
    size,
    title
  } = attributes
  const sizeClass = getSizeClass(size)
  const heroClass = classnames(
    'hero hero--editor',
    `hero--${sizeClass}`,
    { 'hero--with-cover': hasMosaic },
    { 'hero--with-image': backdropUrl }
  )
  const heroStyle = {
    backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none'
  }
  const activeSize = find(BANNER_SIZES, control => control.size === size)

  // Define toolbar handlers
  const onSelectImage = media => {
    if (!media || !media.url) {
      setAttributes({ backdropUrl: undefined, backdropId: undefined })
      return
    }
    setAttributes({ backdropUrl: media.url, backdropId: media.id })
  }

  const sizeControl = (
    <Toolbar
      isCollapsed={true}
      icon={activeSize ? activeSize.icon : svg('hero-size', 20)}
      label={__('hero size')}
      controls={BANNER_SIZES.map(control => {
        const { size: controlSize } = control
        const isActive = (size === controlSize)

        return {
          ...control,
          isActive,
          onClick: () => {
            console.log('Changing size from %s to %s', size, controlSize)
            setAttributes({ size: controlSize })
          }
        }
      })}
    />
  )

  const mediaToolbar = (
    <Toolbar>
      <MediaUpload
        onSelect={onSelectImage}
        allowedTypes={['image']}
        value={backdropId}
        render={({ open }) => (
          <IconButton
            className="components-toolbar__control"
            label={__('Edit image')}
            icon='format-image'
            onClick={open}
            content={backdropUrl ? __('Change image') : __('Select image')}
          />
        )}
      />
    </Toolbar>
  )

  const imageControl = (
    <PanelBody title={__('Banner settings')}>
      <ToggleControl
        label={__('Show mosaic')}
        help={__('Adds a mosiac effect to the modal')}
        checked={!!hasMosaic}
        onChange={hasMosaic => setAttributes({ hasMosaic })}
      />
    </PanelBody>
  )

  const callToActionSidebar = (
    <PanelBody title={__('Call to Action settings')}>
      <ToggleControl
        label={__('Show Call to Action')}
        checked={!!buttonVisible}
        onChange={buttonVisible => setAttributes({ buttonVisible })}
      />
      {buttonVisible && <TextControl
        label={__('Call to Action URL')}
        help={__('URL to link to when the user clicks the button')}
        value={buttonUrl || ''}
        onChange={buttonUrl => setAttributes({ buttonUrl })}
        placeholder={buttonVisible ? 'https://' : undefined}
        disabled={!buttonVisible}
      />}
    </PanelBody>
  )

  const controls = (
    <Fragment>
      <BlockControls>
        {mediaToolbar}
        {sizeControl}
      </BlockControls>
      <InspectorControls>
        {imageControl}
        {callToActionSidebar}
      </InspectorControls>
    </Fragment>
  )

  const heroTitle = (
    <div className="hero__header">
      <RichText
        tagName="h3"
        format="string"
        className="hero__header"
        placeholder="Welcome!"
        value={title}
        onChange={(title) => setAttributes({ title })}
      />
    </div>
  )

  const heroSubtitle = size !== 'blog' && (
    <div className="hero__lead">
      <RichText
        tagName="p"
        format="string"
        className="hero__lead"
        placeholder="Welcome to our b-e-a-utiful website!"
        value={lead}
        onChange={(lead) => setAttributes({ lead })}
      />
    </div>
  )

  const heroButton = buttonVisible && size !== 'blog' && (
    <div className="hero__cta">
      <RichText
        placeholder={__('Join us')}
        value={buttonText}
        onChange={(buttonText) => setAttributes({buttonText})}
        formattingControls={[]}
        className='hero__cta-btn'
      />
    </div>
  )

  return <Fragment>
    {controls}
    <div className={heroClass} style={heroStyle} data-align="wide">
      <div className="hero__editor-inner">
        {heroTitle}
        {heroSubtitle}
        {heroButton}
      </div>
    </div>
  </Fragment>
}

// Save method (stored HTML)
const save = ({ attributes }) => {
  // Get save-required variables
  const { size, buttonVisible, backdropUrl, hasMosaic } = attributes
  const sizeClass = getSizeClass(size)
  const heroClass = classnames(
    'hero',
    `hero--${sizeClass}`,
    {'hero--with-cover': hasMosaic}
  )
  const heroStyle = {
    backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none'
  }

  const heroTitle = <RichText.Content tagName="h3" className="hero__header" value={attributes.title} />

  const heroSubtitle = sizeClass !== 'blog' && (<RichText.Content tagName="p" className="hero__lead" value={attributes.lead} />)

  const heroButton = sizeClass !== 'blog' && buttonVisible && (
    <div className="hero__cta">
      <RichText.Content tagName="a" className="btn btn-brand hero__cta-btn" href={attributes.buttonUrl} value={attributes.buttonText} />
    </div>
  )

  const dataProps = {
    'data-size': size
  }

  return (
    <div className={heroClass} style={heroStyle} {...dataProps}>
      <div className="hero__container">
        {heroTitle}
        {heroSubtitle}
        {heroButton}
      </div>
    </div>
  )
}

// Publish block
export default () => {
  registerBlockType('gumbo/hero', {
    ...meta,
    attributes,
    save,
    edit
  })
}
