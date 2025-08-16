import { BuiltInTypeConstructor } from './base'
import { SimpleComponentDefinition } from './component'

export type PropTypes<Definitions extends SimpleComponentDefinition['props']> =
  {
    [K in keyof Definitions]: Definitions[K] extends BuiltInTypeConstructor
      ? ReturnType<Definitions[K]> | undefined
      : Definitions[K] extends () => any
        ? ReturnType<Definitions[K]>
        : Definitions[K]
  }
