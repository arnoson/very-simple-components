import { BuiltInType, BuiltInTypeConstructor } from './base'

/* Props */

type PropTypes<Definitions extends SimpleComponentDefinition['props']> = {
  [K in keyof Definitions]: Definitions[K] extends BuiltInTypeConstructor
    ? ReturnType<Definitions[K]> | undefined
    : Definitions[K] extends () => any
      ? ReturnType<Definitions[K]>
      : Definitions[K]
}

/* Refs */

export type SimpleRefs = Record<string, HTMLElement | SimpleElement<any>>

export type SimpleRefsAll<R extends SimpleRefs = any> = {
  [K in keyof R]: R[K][]
}

type ResolveRefs<Refs extends SimpleComponentDefinition['refs']> = {
  [K in keyof Refs]: Refs[K] extends typeof HTMLElement
    ? Refs[K]['prototype']
    : Refs[K] extends SimpleComponent
      ? SimpleElement<Refs[K]>
      : never
}

/* Events */

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

interface CustomEventInitRequired<T = any> extends CustomEventInit {
  detail: T
}

/* Component */

export type SimpleComponent<
  Definition extends SimpleComponentDefinition = any,
  Setup extends SimpleComponentSetup<Definition> = any
> = {
  setup: Setup
  definition: Definition
}

export type SimpleInstance<Component extends SimpleComponent<any>> = ReturnType<
  Component['setup']
>

export interface SimpleComponentDefinition {
  el?: typeof HTMLElement
  props?: Record<string, BuiltInType | BuiltInTypeConstructor>
  refs?: Record<string, typeof HTMLElement | SimpleComponent>
  events?: Record<string, any>
}

export type SimpleComponentSetup<
  Definition extends SimpleComponentDefinition = {}
> = (ctx: SimpleComponentContext<Definition>) => any

export type SimpleComponentContext<
  Definition extends SimpleComponentDefinition,
  Refs extends SimpleRefs = ResolveRefs<NonNullable<Definition['refs']>>
> = {
  el: Definition['el'] extends typeof HTMLElement
    ? Definition['el']['prototype']
    : HTMLElement
  props: PropTypes<Definition['props']>
  refs: Record<string, HTMLElement | undefined> & Partial<Refs>
  refsAll: Record<string, HTMLElement[]> & SimpleRefsAll<Refs>
  ComponentEvent: SimpleComponentEvent<SimpleEventMap<Definition['events']>>
}

/* Element with a mounted component */

export type SimpleElement<
  Component extends SimpleComponent,
  Definition extends SimpleComponentDefinition = Component['definition'],
  Context extends
    SimpleComponentContext<any> = SimpleComponentContext<Definition>,
  Events extends SimpleEventMap<any> = SimpleEventMap<Definition['events']>
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
  $definition: Definition
} & Context['el']
