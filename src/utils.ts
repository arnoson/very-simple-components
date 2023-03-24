export const isBuiltInTypeConstructor = (value: any) =>
  [Number, String, Boolean, Array, Object].includes(value)
