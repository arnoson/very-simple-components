interface CustomEventInitRequired<T = any> extends CustomEventInit {
  detail: T
}

type HTMLElementConstructor = typeof HTMLElement

type HTMLElementType<T extends HTMLElementConstructor> = T['prototype']

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

export type SimpleRefs = Record<string, HTMLElement | SimpleElement<any>>

export type SimpleRefsAll<R extends SimpleRefs = any> = {
  [K in keyof R]: R[K][]
}

export interface SimpleComponentOptions {
  el?: HTMLElementConstructor
  props?: Record<string, BuiltInType | BuiltInTypeConstructor>
  refs?: Record<string, HTMLElementConstructor | SimpleComponent>
  events?: Record<string, any>
}

type ResolveRefs<Refs extends SimpleComponentOptions['refs']> = {
  [K in keyof Refs]: Refs[K] extends HTMLElementConstructor
    ? HTMLElementType<Refs[K]>
    : Refs[K] extends SimpleComponent
      ? SimpleElement<Refs[K]>
      : never
}

export type SimpleComponentContext<
  Options extends SimpleComponentOptions,
  Refs extends SimpleRefs = ResolveRefs<NonNullable<Options['refs']>>
> = {
  el: Options['el'] extends HTMLElementConstructor
    ? HTMLElementType<Options['el']>
    : HTMLElement

  props: PropTypes<Options['props']>

  refs: Record<string, HTMLElement | undefined> & Partial<Refs>

  refsAll: Record<string, HTMLElement[]> & SimpleRefsAll<Refs>

  ComponentEvent: SimpleComponentEvent<SimpleEventMap<Options['events']>>
}

export type SimpleComponentSetup<Options extends SimpleComponentOptions> = (
  ctx: SimpleComponentContext<Options>
) => any

export type SimpleComponent<
  Options extends SimpleComponentOptions = any,
  Setup extends SimpleComponentSetup<Options> = any
> = {
  setup: Setup
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

export interface SimpleComponentEvent<
  Events extends Record<string, CustomEvent> = any
> extends CustomEvent {
  new <K extends keyof Events>(
    name: string,
    ...args: Events[K]['detail'] extends undefined | null
      ? [eventInitDict?: CustomEventInit]
      : [eventInitDict: CustomEventInitRequired<Events[K]['detail']>]
  ): Events[K]
}

export type SimpleElement<
  Component extends SimpleComponent,
  Options extends SimpleComponentOptions = Component['options'],
  Context extends SimpleComponentContext<any> = SimpleComponentContext<Options>,
  Events extends SimpleEventMap<any> = SimpleEventMap<Options['events']>
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
  $options: Options
} & Context['el']
