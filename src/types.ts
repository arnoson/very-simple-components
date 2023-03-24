type HTMLElementConstructor = typeof HTMLElement

type HTMLElementType<T extends HTMLElementConstructor> = T['prototype']

type HTMLElementsTypes<T extends Record<string, HTMLElementConstructor>> = {
  [K in keyof T]: HTMLElementType<T[K]>
}

type BuiltInType = Number | String | Array<any> | Object | Boolean

type BuiltInTypeConstructor =
  | NumberConstructor
  | StringConstructor
  | ArrayConstructor
  | ObjectConstructor
  | BooleanConstructor

type PropTypes<Definitions extends SimpleComponentOptions['props']> = {
  [K in keyof Definitions]: Definitions[K] extends BuiltInTypeConstructor
    ? ReturnType<Definitions[K]> | undefined
    : Definitions[K] extends () => any
    ? ReturnType<Definitions[K]>
    : Definitions[K]
}

export type SimpleRefs = Record<string, HTMLElement>

export type SimpleRefsAll<R extends SimpleRefs> = {
  [K in keyof R]: R[K][]
}

export interface SimpleComponentOptions {
  el?: HTMLElementConstructor
  props?: Record<string, BuiltInType | BuiltInTypeConstructor>
  refs?: Record<string, HTMLElementConstructor>
  events?: Record<string, any>
}

export type SimpleComponentPayload<
  Options extends SimpleComponentOptions,
  Refs extends SimpleRefs = HTMLElementsTypes<NonNullable<Options['refs']>>
> = {
  el: Options['el'] extends HTMLElementConstructor
    ? HTMLElementType<Options['el']>
    : HTMLElement

  props: PropTypes<Options['props']>

  refs: Record<string, HTMLElement | undefined> & Partial<Refs>

  refsAll: Record<string, HTMLElement[]> & SimpleRefsAll<Refs>
}

export type SimpleComponentSetup<O extends SimpleComponentOptions> = (
  payload: SimpleComponentPayload<O>
) => any

export type SimpleComponent<Options extends SimpleComponentOptions> = {
  setup: SimpleComponentSetup<Options>
  options: Options
}

export type SimpleInstance<Component extends SimpleComponent<any>> = ReturnType<
  Component['setup']
>

export type SimpleElement<
  Component extends SimpleComponent<any>,
  Options extends SimpleComponentOptions = Component['options'],
  Payload extends SimpleComponentPayload<any> = SimpleComponentPayload<Options>
> = Payload['el'] & {
  $component: SimpleInstance<Component>
  $refs: Payload['refs']
  $refsAll: Payload['refsAll']
}
