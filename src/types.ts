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

export type SimpleRefsAll<R extends SimpleRefs = any> = {
  [K in keyof R]: R[K][]
}

export interface SimpleComponentOptions {
  el?: HTMLElementConstructor
  props?: Record<string, BuiltInType | BuiltInTypeConstructor>
  refs?: Record<string, HTMLElementConstructor>
  events?: Record<string, any>
}

export type SimpleComponentContext<
  Options extends SimpleComponentOptions,
  Refs extends SimpleRefs = HTMLElementsTypes<NonNullable<Options['refs']>>
> = {
  el: Options['el'] extends HTMLElementConstructor
    ? HTMLElementType<Options['el']>
    : HTMLElement

  props: PropTypes<Options['props']>

  refs: Record<string, HTMLElement | undefined> & Partial<Refs>

  refsAll: Record<string, HTMLElement[]> & SimpleRefsAll<Refs>

  ComponentEvent: SimpleComponentEvent<SimpleEventMap<Options['events']>>
}

export type SimpleComponentSetup<O extends SimpleComponentOptions> = (
  ctx: SimpleComponentContext<O>
) => any

export type SimpleComponent<Options extends SimpleComponentOptions = any> = {
  setup: SimpleComponentSetup<Options>
  options: Options
}

export type SimpleInstance<Component extends SimpleComponent<any>> = ReturnType<
  Component['setup']
>

export type SimpleEventMap<Definitions> = {
  [K in keyof Definitions]: Definitions[K] extends BuiltInTypeConstructor
    ? CustomEvent<ReturnType<Definitions[K]>>
    : CustomEvent<Definitions[K]>
}

export type SimpleComponentEvent<
  Events extends Record<string, CustomEvent> = any
> = {
  new <K extends keyof Events, Detail = Events[K]['detail']>(
    name: string,
    ...args: Detail extends undefined | null ? [] : [detail: Detail]
  ): Events[K]
}

export type SimpleElement<
  Component extends SimpleComponent = SimpleComponent,
  Options extends SimpleComponentOptions = Component['options'],
  Context extends SimpleComponentContext<any> = SimpleComponentContext<Options>,
  Events extends SimpleEventMap<Options['events']> = SimpleEventMap<
    Options['events']
  >
> = {
  addEventListener: <K extends keyof Events>(
    type: K,
    listener: (this: SimpleElement<Component>, ev: Events[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => void

  removeEventListener: <K extends keyof Events>(
    type: K,
    listener: (this: SimpleElement<Component>, ev: Events[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => void

  $component: SimpleInstance<Component>
  $refs: Context['refs']
  $refsAll: Context['refsAll']
  $props: Context['props']
} & Context['el']
