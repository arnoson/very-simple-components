const isBuiltInTypeConstructor = (value: any) =>
  [Number, String, Boolean, Array, Object].includes(value)

const parseProp = (value: any, type: string) =>
  type === 'string' ? String(value) : JSON.parse(value)

const stringifyProp = (value: any) =>
  typeof value === 'string' ? value : JSON.stringify(value)

const getDefaultProp = (definition: any) =>
  definition instanceof Function ? definition() : definition

export const createPropsProxy = (
  el: HTMLElement,
  definitions: Record<string, any>
) => {
  const get = (_: Object, key: string) => {
    const value = el.dataset[key]
    const definition = definitions[key]
    if (definition === undefined) return value

    const isConstructor = isBuiltInTypeConstructor(definition)
    const providesDefault = !isConstructor
    if (value === undefined)
      return providesDefault ? getDefaultProp(definition) : undefined

    const type = isConstructor
      ? definition.prototype.constructor.name.toLowerCase()
      : typeof definition

    return parseProp(value, type)
  }

  const set = (_: Object, key: string, value: unknown) => {
    el.dataset[key] = stringifyProp(value)
    return true
  }

  return new Proxy({}, { get, set })
}
