/** @param {*} arg */
export const isString = arg =>
  Object.prototype.toString.call(arg) === '[object String]'
