import { addListeners, getRefs, walkComponent } from './utils/utils.js'

/**
 * @typedef {({ el: HTMLElement, refs: Refs}) => object?} Component
 */

/** @type {Object<string, Component>} */
const components = {}

/**
 * @private
 * @param {HTMLElement} el
 * @returns {Component}
 */
const getComponent = el => components[el.dataset.component]

/**
 * @param {string} name
 * @param {Component} component
 * @returns {Component}
 */
export const registerComponent = (name, component) => {
  components[name] = component
  return component
}

/**
 * Mount a single component.
 * @param {HTMLElement} el
 * @param {object} [component]
 */
export const mountComponent = (el, component = null, isChild = false) => {
  const refs = getRefs(el)
  component = component ?? getComponent(el)
  const context = component({ el, refs })

  // Walk the component and add event listeners.
  walkComponent(el, el => addListeners(el, context))

  // `mountChildComponents` will detect also nested children so we have to call
  // it only once on the top component.
  if (!isChild) {
    mountChildComponents(el)
  }
}

/**
 * Mount all components inside the element.
 * @param {HTMLElement} root - The containing element.
 */
export const mountComponents = (root = document.body) => {
  mountChildComponents(root)
}

/**
 * Mount all components inside an element.
 * @param {HTMLElement} root
 */
const mountChildComponents = root => {
  for (const name in components) {
    const elms = root.querySelectorAll(`[data-component='${name}']`)
    for (let i = 0; i < elms.length; i++) {
      const el = /** @type {HTMLElement} */ (elms[i])
      mountComponent(el, components[name], true)
    }
  }
}
