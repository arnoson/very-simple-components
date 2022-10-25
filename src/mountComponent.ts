import { getComponent } from './registerComponent'
import { SimpleRef, SimpleRefs } from './types'
import { walkComponent } from './walkComponent'

const getRefs = (el: HTMLElement): SimpleRefs => {
  const refs: SimpleRefs = {}
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
    const refs = getRefs(el)
    const ref: SimpleRef = Object.fromEntries(
      Object.entries(refs).map(([key, value]) => [key, value[0]])
    )

    const component = getComponent(el)
    if (component) {
      ;(el as any).$component = component({ el, ref, refs }) || {}
    }
  }

  if (!isChild) mountChildComponents(el)
}

/** Mount all components inside the element */
export const mountComponents = (root = document.body) => {
  mountChildComponents(root)
}
