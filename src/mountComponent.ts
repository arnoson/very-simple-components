import { getComponent } from './registerComponent'
import { SimpleRefs, SimpleRefsAll } from './types'
import { walkComponent } from './walkComponent'

const getRefsAll = (el: HTMLElement): SimpleRefsAll => {
  const refs: SimpleRefsAll = {}
  walkComponent(el, el => {
    const { ref } = el.dataset
    if (ref) {
      refs[ref] ??= []
      refs[ref].push(el)
    }
  })
  return refs
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
  // Don't re-initialize component.
  if (!(el as any).$component) {
    const refsAll = getRefsAll(el)
    const refs: SimpleRefs = Object.fromEntries(
      Object.entries(refsAll).map(([key, value]) => [key, value[0]])
    )

    const component = getComponent(el)
    if (component) {
      ;(el as any).$component = component({ el, refs, refsAll }) || {}
    }
  }

  if (!isChild) mountChildComponents(el)
}

/** Mount all components inside the element */
export const mountComponents = (root = document.body) => {
  mountChildComponents(root)
}
