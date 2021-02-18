import { evalExpression } from './evalExpression.js'

const eventPrefix = 'data-on-'
const eventPrefixLength = eventPrefix.length

/**
 * Register an event listener on the element.
 * @private
 * @param {HTMLElement} el
 * @param {string} event
 * @param {string} expression
 * @param {object} context
 */
const addListener = (el, event, expression, context) => {
  /** @type {*} */
  const handler = evalExpression(context, expression)
  el.addEventListener(event, handler)
}

/**
 * Register event listeners on the element.
 * @param {HTMLElement} el
 * @param {object} context
 */
export const addListeners = (el, context) => {
  const { length } = el.attributes
  for (let i = 0; i < length; i++) {
    const { nodeName, nodeValue } = el.attributes[i]
    if (nodeName.startsWith(eventPrefix)) {
      addListener(el, nodeName.substring(eventPrefixLength), nodeValue, context)
    }
  }
}
