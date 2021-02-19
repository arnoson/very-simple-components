/**
 * Eval an expression in a context.
 * Highly inspired by alpine.js (https://github.com/alpinejs/alpine/blob/95cff65be3a91976222f7a72a4d3ab9f52b281bc/src/utils.js#L100)
 * @param {object} context
 * @param {string} expression
 * @returns {Function}
 */
export const evalExpression = (context, expression) => {
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
