/** @typedef {Object<string, HTMLElement | Array<HTMLElement>>} Refs */

/**
 * Get all references inside an element.
 * @param {HTMLElement} el - The element.
 * @return {Refs}
 */
export const getRefs = el => {
  /** @type {Refs} */
  const refs = {}
  el.querySelectorAll('[data-ref]').forEach(
    /** @param {HTMLElement} el */
    el => {
      // Add a new reference to the list or group multiple references with the
      // same name into an array.
      const { ref } = el.dataset
      const entry = refs[ref]
      refs[ref] = entry
        ? Array.isArray(entry)
          ? [...entry, el]
          : [entry, el]
        : el
    }
  )
  return refs
}
