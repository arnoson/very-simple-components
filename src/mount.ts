import { getComponent } from './component'
import {
  createPropsProxy,
  getDefaultProp,
  isBuiltInTypeConstructor,
  stringifyProp
} from './props'
import { getRefs } from './refs'
import {
  ComponentEvent as ComponentEventType,
  ComponentElement,
  Component
} from './types'

const mountComponent = (el: Element) => {
  if (!(el instanceof HTMLElement)) return

  const component = getComponent(el)
  if (!component) return

  const isInitialized = !!(el as ComponentElement<any>).$component
  if (isInitialized) return

  const propsDefinitions = component.definition.props
  const props = propsDefinitions
    ? createPropsProxy(el, propsDefinitions)
    : el.dataset

  // Add missing default prop values to dataset for CSS/query selectors.
  if (propsDefinitions) {
    for (const [key, definition] of Object.entries(propsDefinitions)) {
      if (el.dataset[key] !== undefined) continue

      const providesDefault = !isBuiltInTypeConstructor(definition)
      if (!providesDefault) continue

      const value = getDefaultProp(definition)
      el.dataset[key] = stringifyProp(value)
    }
  }

  const { refs, refsAll } = getRefs(el)
  const ComponentEvent = CustomEvent as ComponentEventType
  const controller = new AbortController()
  let cleanupFn: (() => void) | undefined
  const cleanup = (fn: () => void) => {
    cleanupFn = fn
  }
  const ctx = {
    el,
    props,
    refs,
    refsAll,
    ComponentEvent,
    signal: controller.signal,
    cleanup
  }

  const componentEl = el as ComponentElement<typeof component>
  componentEl.$component = component.setup(ctx) ?? {}
  componentEl.$destroy = () => {
    controller.abort()
    cleanupFn?.()
  }
}

/** Mount a component and all child components */
export const mount = (el: Element = document.body) => {
  if (el instanceof HTMLElement) mountComponent(el)
  el.querySelectorAll('[data-component]').forEach(mountComponent)
}

/** Get a mounted component element with correct typings */
export const instance = <T extends Component>(
  el: HTMLElement,
  _component: T
): ComponentElement<T> => el as ComponentElement<T>

/** Unmount a single component, running any cleanup */
const unmountComponent = (el: Element) => {
  const componentEl = el as ComponentElement<any>
  if (componentEl.$destroy) {
    componentEl.$destroy()
    delete componentEl.$component
    delete componentEl.$destroy
  }
}

/** Unmount a component and all child components */
export const unmount = (el: Element = document.body) => {
  if (el.hasAttribute('data-component')) unmountComponent(el)
  el.querySelectorAll('[data-component]').forEach(unmountComponent)
}
