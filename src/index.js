import { walkComponent, parseEvents, registerEvents } from './utils/utils.js'
import './types'

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
  component = component ?? getComponent(el)

  const allEvents = []
  const refs = {}

  // Search for `data-on-...` event definitions and references.
  // `walkComponent` won't traverse nested components but will execute the
  // callback a last time on the nested component's root element before
  // stopping.
  walkComponent(el, (el, isChildComponent) => {
    // Add a new reference to the list or group multiple references with the
    // same name into an array.
    const { ref } = el.dataset
    if (ref) {
      const entry = refs[ref]
      refs[ref] = entry
        ? Array.isArray(entry)
          ? entry.concat(entry, el)
          : [entry, el]
        : el
    }

    if (!isChildComponent) {
      const events = parseEvents(el)
      events && allEvents.push(events)
    }
  })

  const context = component({ el, refs })

  registerEvents(allEvents, context)

  const veryEl = /** @type {VeryHTMLElement} */ (el)
  veryEl.$very = context

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
