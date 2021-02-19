const eventPrefix = 'data-on-'
const eventPrefixLength = eventPrefix.length

/**
 * Eval an event expression in a context.
 * Highly inspired by alpine.js (https://github.com/alpinejs/alpine/blob/95cff65be3a91976222f7a72a4d3ab9f52b281bc/src/utils.js#L100)
 * @param {object} context
 * @param {string} expression
 * @returns {Function}
 */
export const evalEventExpression = (context, expression) => {
  const body = `with(context) { return ${expression} }`

  if (context[expression]) {
    // Handle short notations (`test` instead of `test()`).
    const fn = new Function('context', body)(context)
    return function () {
      fn.apply(context, arguments)
    }
  } else {
    const fn = new Function('context', '$event', body)
    return (
      /** @param {Event} event */
      event => fn.call(context, context, event)
    )
  }
}

/**
 * Register an event listener on the element.
 * @private
 * @param {HTMLElement} el
 * @param {string} event
 * @param {string} expression
 * @param {object} context
 */
export const registerEvent = (el, event, expression, context) => {
  /** @type {*} */
  const handler = evalEventExpression(context, expression)
  el.addEventListener(event, handler)
}

/**
 * Register a list of event listeners (on different elements).
 * @param {Array<{ el: HTMLElement, event: string, expression: string }>} events
 * @param {*} context
 */
export const registerEvents = (events, context) => {
  for (const { el, event, expression } of events) {
    registerEvent(el, event, expression, context)
  }
}

/**
 * Parse all `data-on-...` event definitions on the element.
 * @param {HTMLElement} el
 */
export const parseEvents = el => {
  const events = []
  const { length } = el.attributes
  for (let i = 0; i < length; i++) {
    const { nodeName, nodeValue } = el.attributes[i]
    if (nodeName.startsWith(eventPrefix)) {
      events.push({
        el,
        event: nodeName.substring(eventPrefixLength),
        expression: nodeValue
      })
    }
  }
  return events.length && events
}
