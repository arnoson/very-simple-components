/**
 * @param {HTMLElement} el
 * @param {(el: HTMLElement, isChildComponent: boolean) => any} callback
 */
export const walkComponent = (el, callback, isChild = false) => {
  if (!isChild) {
    callback(el, false)
  }

  let node = /** @type {HTMLElement} */ (el.firstElementChild)
  while (node) {
    if (!node.hasAttribute('data-very-ignore')) {
      const isChildComponent = node.hasAttribute('data-component')
      callback(node, isChildComponent)
      !isChildComponent && walkComponent(node, callback, true)
    }
    node = /** @type {HTMLElement} */ (node.nextElementSibling)
  }
}
