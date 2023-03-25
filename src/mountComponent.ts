import { createPropsProxy } from './props'
import { getRefs } from './refs'
import { getComponent } from './registerComponent'
import { SimpleComponentEvent, SimpleElement } from './types'

/**
 * Just a little syntactic sugar for `CustomEvent`. Passed to the component's
 * context as the fully typed `ComponentEvent`.
 * */
export class CustomEventFactory {
  constructor(name: string, detail?: any) {
    return new CustomEvent(name, { detail })
  }
}

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
  const isInitialized = !!(el as SimpleElement).$component

  if (!isInitialized && component) {
    const simpleEl = el as SimpleElement<typeof component>

    const propsDefinitions = component.options.props
    const props = propsDefinitions
      ? createPropsProxy(el, propsDefinitions)
      : el.dataset

    const { refs, refsAll } = getRefs(el)
    const ComponentEvent = CustomEventFactory as SimpleComponentEvent
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
