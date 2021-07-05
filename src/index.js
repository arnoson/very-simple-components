/**
 * @typedef {Object<string, HTMLElement>} Refs
 */

/**
 * @typedef {Object<string, Array<HTMLElement>>} RefsAll
 */

/**
 * @typedef {(payload: { el: HTMLElement, refs: Refs, refsAll: RefsAll}) => object?} Component
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

/**
 * @param {string} name
 * @param {Component} component
 * @returns {Component}
 */
export const registerComponent = (name, component) => {
  if (typeof component !== 'function') {
    throw new Error(`Component ${name} is not a function.`)
  }
  components[name] = component
  return component
}

/**
 * Mount a single component.
 * @param {HTMLElement} el
 */
export const mountComponent = (el, isChild = false) => {
  /* @ts-ignore */
  // Don't re-initialize component.
  if (!el.$component) {
    const refsAll = getAllRefs(el)
    const refs = Object.fromEntries(
      Object.entries(refsAll).map(([key, value]) => [key, value[0]])
    )

    const component = getComponent(el)
    if (component) {
      /* @ts-ignore */
      el.$component = component({ el, refs, refsAll }) || {}
    }
  }

  if (!isChild) {
    mountChildComponents(el)
  }
}

/** @param {HTMLElement} el */
const mountChildComponents = el => {
  const elements = el.querySelectorAll('[data-component]')
  for (let i = 0; i < elements.length; i++) {
    const el = /** @type {HTMLElement} */ (elements[i])
    mountComponent(el, true)
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
 * @param {HTMLElement} el
 * @returns {RefsAll}
 */
const getAllRefs = el => {
  /** @type {RefsAll} */
  const refs = {}
  walkComponent(el, el => {
    const { ref } = el.dataset
    if (ref) {
      const entry = refs[ref]
      if (!entry) {
        refs[ref] = [el]
      } else {
        entry.push(el)
      }
    }
  })
  return refs
}
