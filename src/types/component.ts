import {
  ComponentEvent as ComponentEventType,
  EventMap,
  Refs,
  RefsAll
} from '../types'
import { BuiltInType, BuiltInTypeConstructor } from './base'
import { PropTypes } from './props'
import { ResolveRefs } from './refs'

export type Component<
  Definition extends ComponentDefinition = any,
  Setup extends ComponentSetup<Definition> = any
> = {
  setup: Setup
  definition: Definition
}

export type ComponentInstance<C extends Component<any>> = ReturnType<C['setup']>

export interface ComponentDefinition {
  el?: typeof HTMLElement
  props?: Record<string, BuiltInType | BuiltInTypeConstructor>
  refs?: Record<string, typeof HTMLElement | Component>
  events?: Record<string, any>
}

export type ComponentSetup<Definition extends ComponentDefinition = {}> = (
  ctx: ComponentContext<Definition>
) => any

export type ComponentContext<
  Definition extends ComponentDefinition,
  R extends Refs = ResolveRefs<NonNullable<Definition['refs']>>
> = {
  el: Definition['el'] extends typeof HTMLElement
    ? Definition['el']['prototype']
    : HTMLElement
  props: PropTypes<Definition['props']>
  refs: Record<string, HTMLElement | undefined> & Partial<R>
  refsAll: Record<string, HTMLElement[]> & RefsAll<R>
  ComponentEvent: ComponentEventType<EventMap<Definition['events']>>
  signal: AbortSignal
  cleanup: (fn: () => void) => void
}

/* Element with a mounted component */

export type ComponentElement<
  C extends Component,
  Definition extends ComponentDefinition = C['definition'],
  Events extends EventMap<any> = EventMap<Definition['events']>
> = {
  addEventListener: <K extends keyof Events>(
    type: K,
    listener: (this: ComponentElement<C>, ev: Events[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => void

  removeEventListener: <K extends keyof Events>(
    type: K,
    listener: (this: ComponentElement<C>, ev: Events[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => void

  $component: ComponentInstance<C>
  $destroy: () => void
} & (Definition['el'] extends typeof HTMLElement
  ? Definition['el']['prototype']
  : HTMLElement)
