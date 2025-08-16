import {
  SimpleComponentEvent,
  SimpleEventMap,
  SimpleRefs,
  SimpleRefsAll
} from '../types'
import { BuiltInType, BuiltInTypeConstructor } from './base'
import { PropTypes } from './props'
import { ResolveRefs } from './refs'

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
