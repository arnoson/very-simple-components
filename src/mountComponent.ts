import { getAllRefs } from './getAllRefs'
import { getComponent } from './registerComponent'

/**
 * Mount a single component.
 */
export const mountComponent = (el: HTMLElement, isChild = false) => {
  /* @ts-ignore */
  // Don't re-initialize component.
  if (!el.$component) {
    const refsAll = getAllRefs(el)
    const refs = Object.fromEntries(
      Object.entries(refsAll).map(([key, value]) => [key, value[0]])
    )

    const component = getComponent(el)
    if (component) {
      /* @ts-ignore */
      el.$component = component({ el, refs, refsAll }) || {}
    }
  }

  if (!isChild) {
    mountChildComponents(el)
  }
}

export const mountChildComponents = (el: HTMLElement) => {
  const elements = el.querySelectorAll<HTMLElement>('[data-component]')
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    mountComponent(el, true)
  }
}

/**
 * Mount all components inside the element.
 */
export const mountComponents = (root = document.body) => {
  mountChildComponents(root)
}
