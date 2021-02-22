import {
  walkComponent,
  parseEvents,
  registerEvents,
  isString
} from './utils/utils.js'

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
  component = component ?? getComponent(el)

  // We first store all events without registering them, because we don't know
  // the refs yet (which we need to create the event handlers' context).
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

  // Store the context on the el so we can retrieve it with the `very()` helper
  // function.
  /* @ts-ignore */
  el.__very = context

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

/**
 *
 * @param {string | HTMLElement} el An element (or an id).
 */
export const very = el =>
  // @ts-ignore
  (isString(el) ? document.getElementById(el) : el)?.__very
