type Constructor =
  | NumberConstructor
  | StringConstructor
  | ArrayConstructor
  | ObjectConstructor
  | BooleanConstructor

type Props<T> = {
  [K in keyof T]: T[K] extends Constructor
    ? ReturnType<T[K]> | undefined
    : T[K] extends () => any
    ? ReturnType<T[K]>
    : T[K]
}

const isConstructor = (value: any) =>
  [Number, String, Boolean, Array, Object].includes(value)

const parse = (value: any, type: string) =>
  type === 'string'
    ? String(value)
    : type === 'number'
    ? Number(value)
    : type === 'boolean'
    ? value !== 'false'
    : JSON.parse(value)

const getDefaultValue = (definition: any) =>
  definition instanceof Function ? definition() : definition

export const defineProps = <T>(definitions: T) => {
  return (el: HTMLElement) => {
    const props = Object.fromEntries(
      Object.entries(definitions).map(([key, definition]) => {
        const serializedValue = el.dataset[key]
        const providesDefault = !isConstructor(definition)

        const defaultValue = providesDefault
          ? getDefaultValue(definition)
          : undefined

        const type = providesDefault
          ? typeof defaultValue
          : definition.prototype.constructor.name.toLowerCase()

        const value =
          serializedValue === undefined
            ? defaultValue
            : parse(serializedValue, type)

        return [key, value]
      })
    )

    return props as Props<T>
  }
}
