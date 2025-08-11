import {
  createPropsProxy,
  getDefaultProp,
  isBuiltInTypeConstructor,
  stringifyProp
} from './props'
import { getRefs } from './refs'
import { getComponent } from './registerComponent'
import { SimpleComponentEvent, SimpleElement } from './types'

const mountChildComponents = (el: HTMLElement) => {
  const elements = el.querySelectorAll<HTMLElement>('[data-simple-component]')
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    mountComponent(el, true)
  }
}

/** Mount a single component */
export const mountComponent = (el: HTMLElement, isChild = false) => {
  const component = getComponent(el)
  const isInitialized = !!(el as SimpleElement<any>).$component

  if (!isInitialized && component) {
    const simpleEl = el as SimpleElement<typeof component>

    const propsDefinitions = component.options.props
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
    const ctx = { el, props, refs, refsAll, ComponentEvent }

    simpleEl.$props = props
    simpleEl.$refs = refs
    simpleEl.$refsAll = refsAll
    simpleEl.$component = component.setup(ctx) || {}
  }

  if (!isChild) mountChildComponents(el)
}

/** Mount all components inside the element */
export const mountComponents = (root = document.body) => {
  mountChildComponents(root)
}
