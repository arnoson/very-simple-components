import { getComponent } from './registerComponent'
import { SimpleElement, SimpleRefs, SimpleRefsAll } from './types'
import { isBuiltInTypeConstructor } from './utils'
import { walkComponent } from './walkComponent'

const parseProp = (value: any, type: string) =>
  type === 'string' ? String(value) : JSON.parse(value)

const stringifyProp = (value: any) =>
  typeof value === 'string' ? value : JSON.stringify(value)

const getDefaultProp = (definition: any) =>
  definition instanceof Function ? definition() : definition

const createPropsProxy = (
  el: HTMLElement,
  definitions: Record<string, any>
) => {
  const get = (_: Object, key: string) => {
    const value = el.dataset[key]
    const definition = definitions[key]
    if (definition === undefined) return value

    const isConstructor = isBuiltInTypeConstructor(definition)
    const providesDefault = !isConstructor
    if (value === undefined && providesDefault)
      return getDefaultProp(definition)

    const type = isConstructor
      ? definition.prototype.constructor.name.toLowerCase()
      : typeof definition

    return parseProp(value, type)
  }

  const set = (_: Object, key: string, value: unknown) => {
    el.dataset[key] = stringifyProp(value)
    return true
  }

  return new Proxy({}, { get, set })
}

const getRefsAll = (el: HTMLElement): SimpleRefsAll<any> => {
  const refs: SimpleRefsAll<any> = {}
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
      const simpleEl = el as SimpleElement<typeof component>
      const propsDefinitions = component.options.props

      const props = propsDefinitions
        ? createPropsProxy(el, propsDefinitions)
        : el.dataset

      simpleEl.$props = props
      simpleEl.$refs = refs
      simpleEl.$refsAll = refsAll
      simpleEl.$component = component.setup({ el, refs, refsAll, props }) || {}
    }
  }

  if (!isChild) mountChildComponents(el)
}

/** Mount all components inside the element */
export const mountComponents = (root = document.body) => {
  mountChildComponents(root)
}
