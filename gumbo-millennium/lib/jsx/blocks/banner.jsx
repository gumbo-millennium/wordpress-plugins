/**
 * Banner, in three sizes: small (blog), medium and large
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

// Imports
import { registerBlockType } from '../helpers/gumbo'
import LinkedButton from '../components/linked-button'
import { default as svg } from './../helpers/svg'

// Constant imports
const { __ } = wp.i18n
const { Toolbar, IconButton } = wp.components
const { Fragment } = wp.element
const { BlockControls, MediaUpload, RichText } = wp.editor

// Metadata
const meta = {
  title: 'Banner',
  icon: svg('banner-icon')
}

// Attributes
const attributes = {
  title: {
    source: 'text',
    selector: '.hero__header'
  },
  lead: {
    source: 'html',
    selector: '.hero__lead'
  },
  buttonText: {
    source: 'text',
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
  backdropId: {
    type: 'number'
  },
  backdropUrl: {
    type: 'string'
  },
  size: {
    type: 'string',
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
 * List of sizes available for the banner
 */
const BANNER_SIZES = [
  {
    icon: svg('banner-large'),
    title: __('Tall'),
    size: 'large'
  },
  {
    icon: svg('banner-medium'),
    title: __('Medium'),
    size: 'medium'
  },
  {
    icon: svg('banner-small'),
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
  const { size, title, lead, buttonText, buttonUrl, buttonVisible, backdropId, backdropUrl } = attributes
  const sizeClass = getSizeClass(size)
  const heroClass = `hero hero--editor hero--${sizeClass}`
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
      icon={activeSize ? activeSize.icon : svg('banner-size', 20)}
      label={__('Banner size')}
      controls={BANNER_SIZES.map(control => {
        const { size: controlSize } = control
        const isActive = (size === controlSize)

        return {
          ...control,
          isActive,
          onClick: (controlSize) => setAttributes({size: controlSize})
        }
      })}
    />
  )

  const controls = (
    <Fragment>
      <BlockControls>
        <Toolbar>
          <MediaUpload
            onSelect={onSelectImage}
            allowedTypes={['image']}
            value={backdropId}
            render={({ open }) => (
              <IconButton
                className="components-toolbar__control"
                label={__('Edit image')}
                icon="edit"
                onClick={open}
              />
            )}
          />
        </Toolbar>
        {sizeControl}
      </BlockControls>
    </Fragment>
  )

  const bannerTitle = (
    <RichText
      tagName="h3"
      format="string"
      className="hero__header"
      placeholder="The quick, brown fox jumps over a lazy dog. "
      value={title}
      onChange={(title) => setAttributes({ title })}
    />
  )

  const bannerSubtitle = size !== 'blog' && (
    <Fragment>
      <RichText
        tagName="p"
        format="string"
        placeholder="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        className="hero__lead"
        value={lead}
        onChange={(lead) => setAttributes({ lead })}
      />
    </Fragment>
  )

  const bannerButton = buttonVisible && size !== 'blog' && (
    <div className="hero__cta">
      <LinkedButton
        tagName="a"
        multiline=""
        className="hero__cta-btn"
        placeholder="Deus vult"
        title={buttonText}
        url={buttonUrl}
        onTitleChange={buttonText => setAttributes({ buttonText })}
        onUrlChange={buttonUrl => setAttributes({ buttonUrl })}
      />
    </div>
  )

  return <Fragment>
    {controls}
    <div className={heroClass} style={heroStyle}>
      {bannerTitle}
      {bannerSubtitle}
      {bannerButton}
    </div>
  </Fragment>
}

// Save method (stored HTML)
const save = ({ attributes }) => {
  // Get save-required variables
  const { size, buttonVisible, backdropUrl } = attributes
  const sizeClass = getSizeClass(size)
  const heroClass = `hero hero--${sizeClass}`
  const heroStyle = {
    backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none'
  }

  const bannerTitle = <RichText.Content tagName="h3" className="hero__header" value={attributes.title} />

  const bannerSubtitle = size !== 'blog' && (<RichText.Content tagName="p" className="hero__lead" value={attributes.lead} />)

  const bannerButton = size !== 'blog' && buttonVisible && (
    <div className="hero__cta">
      <RichText.Content tagName="a" className="btn btn-brand hero__cta-btn" href={attributes.buttonUrl} value={attributes.buttonText} />
    </div>
  )

  return (
    <div className={heroClass} style={heroStyle}>
      <div className="hero__container">
        {bannerTitle}
        {bannerSubtitle}
        {bannerButton}
      </div>
    </div>
  )
}

// Publish block
export default () => {
  registerBlockType('gumbo/banner', {
    ...meta,
    attributes,
    save,
    edit
  })
}
