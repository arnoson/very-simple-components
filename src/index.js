import { walkComponent, isString } from './utils/utils.js'

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
  const component = getComponent(el)

  const refsAll = getAllRefs(el)
  const refs = Object.fromEntries(
    Object.entries(refsAll).map(([key, value]) => [key, value[0]])
  )

  if (component) {
    /* @ts-ignore */
    el.$component = component({ el, refs, refsAll }) || {}
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
    // Don't re-initialize components.
    /* @ts-ignore */
    if (!el.$component) {
      mountComponent(el, true)
    }
  }
}

/**
 * Mount all components inside the element.
 * @param {HTMLElement} root - The containing element.
 */
export const mountComponents = (root = document.body) => {
  mountComponent(root)
}

/**
 * @param {string | HTMLElement} el An element (or an id).
 */
export const getInstance = el =>
  // @ts-ignore
  (isString(el) ? document.getElementById(el) : el)?.__very_instance

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
