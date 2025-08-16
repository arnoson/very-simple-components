import { SimpleDirectiveDefinition } from './types'
import { SimpleComponentDefinition } from './types'

export const define = <
  Definition extends SimpleComponentDefinition | SimpleDirectiveDefinition
>(
  definition: Definition
) => definition
