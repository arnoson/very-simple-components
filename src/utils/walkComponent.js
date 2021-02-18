/**
 * @param {HTMLElement} el
 * @param {(el: HTMLElement) => any} callback
 */
export const walkComponent = (el, callback, isChild = false) => {
  if (!isChild) {
    callback(el)
  }

  let node = /** @type {HTMLElement} */ (el.firstElementChild)
  while (node) {
    if (
      !node.hasAttribute('data-component') &&
      !node.hasAttribute('data-very-ignore')
    ) {
      node.style.backgroundColor = 'yellow'
      callback(node)
      walkComponent(node, callback, true)
    }
    node = /** @type {HTMLElement} */ (node.nextElementSibling)
  }
}
