import { getComponent } from './component'
import {
  createPropsProxy,
  getDefaultProp,
  isBuiltInTypeConstructor,
  stringifyProp
} from './props'
import { getRefs } from './refs'
import { SimpleComponentEvent, SimpleElement } from './types'

const mountComponent = (el: HTMLElement) => {
  const component = getComponent(el)
  if (!component) return

  const isInitialized = !!(el as SimpleElement<any>).$component
  if (isInitialized) return

  const simpleEl = el as SimpleElement<typeof component>

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
  const ComponentEvent = CustomEvent as SimpleComponentEvent
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

  simpleEl.$props = props
  simpleEl.$refs = refs
  simpleEl.$refsAll = refsAll
  simpleEl.$definition = component.definition
  simpleEl.$component = component.setup(ctx) ?? {}

  simpleEl.$destroy = () => {
    controller.abort()
    cleanupFn?.()
  }
}

/** Mount a component and all child components */
export const mount = (el: HTMLElement = document.body) => {
  mountComponent(el)
  const elements = el.querySelectorAll<HTMLElement>('[data-component]')
  elements.forEach(mountComponent)
}

/** Unmount a single component, running any cleanup */
export const unmount = (el: HTMLElement) => {
  const simpleEl = el as SimpleElement<any>
  if (simpleEl.$destroy) {
    simpleEl.$destroy()
    delete (simpleEl as any).$component
    delete (simpleEl as any).$destroy
  }
}
