/**
 * Wraps all core elements in a container
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */

const { addFilter } = wp.hooks
const coreRegex = /^core(-embed)?\//i

export default function overrideCoreBlocks () {
  addFilter('blocks.getSaveElement', 'gumbo/wrap-core-modules', (element, {name}) => {
    if (!coreRegex.test(name)) {
      return element
    }

    return <div className="container gumbo-normal-content">
      {element}
    </div>
  })
}
