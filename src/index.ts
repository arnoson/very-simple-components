type Refs = Record<string, HTMLElement>
type RefsAll = Record<string, HTMLElement[]>
type Component = (payload: {
  el: HTMLElement
  refs: Refs
  refsAll: RefsAll
}) => any

const components: Record<string, Component> = {}
const getComponent = (el: HTMLElement) => components[el.dataset.component]

export const walkComponent = (
  el: HTMLElement,
  callback: (el: HTMLElement, isChildComponent: boolean) => any,
  isChild = false
) => {
  if (!isChild) {
    callback(el, false)
  }

  let node = el.firstElementChild as HTMLElement
  while (node) {
    if (!node.hasAttribute('data-ignore')) {
      const isChildComponent = node.hasAttribute('data-component')
      callback(node, isChildComponent)
      !isChildComponent && walkComponent(node, callback, true)
    }
    node = node.nextElementSibling as HTMLElement
  }
}

export const registerComponent = (name: string, component: Component) => {
  if (typeof component !== 'function') {
    throw new Error(`Component ${name} is not a function.`)
  }
  components[name] = component
  return component
}

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

const mountChildComponents = (el: HTMLElement) => {
  const elements = el.querySelectorAll<HTMLElement>('[data-component]')
  for (let i = 0; i < elements.length; i++) {
    const el = /** @type {HTMLElement} */ elements[i]
    mountComponent(el, true)
  }
}

/**
 * Mount all components inside the element.
 */
export const mountComponents = (root = document.body) => {
  mountChildComponents(root)
}

const getAllRefs = (el: HTMLElement) => {
  /** @type {RefsAll} */
  const refs: RefsAll = {}
  walkComponent(el, el => {
    const { ref } = el.dataset
    if (ref) {
      const entry = refs[ref]
      if (!entry) {
        refs[ref] = [el]
      } else {
        entry.push(el)
      }
    }
  })
  return refs
}
