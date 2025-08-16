import { getDefaultProp, isBuiltInTypeConstructor, parseProp } from './props'
import { SimpleDirectiveDefinition } from './types'

export const parseModifiers = (
  serialized: string,
  definitions: SimpleDirectiveDefinition['modifiers']
): Record<string, string | boolean | number> => {
  if (!serialized) return {}

  // First parse the raw modifiers.
  const rawModifiers: Record<string, string | true> = {}
  const options = serialized
    .slice(1, -1)
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)

  for (const option of options) {
    if (option.includes('=')) {
      const [key, value] = option.split('=').map(s => s.trim())
      if (key) rawModifiers[key] = value
    } else {
      rawModifiers[option] = true
    }
  }

  if (!definitions) return rawModifiers

  // If we have a modifiers definition provided, we can cast the values and
  // add defaults.
  const modifiers: Record<string, string | boolean | number> = {}
  for (const [key, definition] of Object.entries(definitions)) {
    const value = rawModifiers[key]
    const isConstructor = isBuiltInTypeConstructor(definition)

    if (value === undefined) {
      if (!isConstructor) modifiers[key] = getDefaultProp(definition)
    } else {
      const type = isConstructor
        ? definition.prototype.constructor.name.toLowerCase()
        : typeof definition
      modifiers[key] = parseProp(value, type)
    }
  }

  return modifiers
}
