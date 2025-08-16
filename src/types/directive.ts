import { BuiltInPrimitive, BuiltInPrimitiveConstructor } from './base'

/* Modifiers */

type ModifierTypes<Definitions extends SimpleDirectiveDefinition['modifiers']> =
  {
    [K in keyof Definitions]: Definitions[K] extends BuiltInPrimitiveConstructor
      ? ReturnType<Definitions[K]> | undefined
      : Definitions[K] extends () => any
        ? ReturnType<Definitions[K]>
        : Definitions[K]
  }

/* Directive */

export type SimpleDirective<
  Definition extends SimpleDirectiveDefinition = any,
  Setup extends SimpleDirectiveSetup<Definition> = any
> = {
  setup: Setup
  definition: Definition
}

export interface SimpleDirectiveDefinition {
  el?: typeof HTMLElement
  modifiers?: Record<string, BuiltInPrimitive | BuiltInPrimitiveConstructor>
}

export type SimpleDirectiveSetup<Definition extends SimpleDirectiveDefinition> =
  (ctx: SimpleDirectiveContext<Definition>) => any

export type SimpleDirectiveContext<
  Definition extends SimpleDirectiveDefinition
> = {
  el: Definition['el'] extends typeof HTMLElement
    ? Definition['el']['prototype']
    : HTMLElement

  modifiers: ModifierTypes<Definition['modifiers']>
}

/* Element with directive mounted */

export type SimpleDirectiveElement = {
  $directives: Record<string, ReturnType<SimpleDirective['setup']>>
} & HTMLElement
