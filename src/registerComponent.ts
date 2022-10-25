import { SimpleComponent } from './types'

export const components: Record<string, SimpleComponent<any>> = {}
export const getComponent = (el: HTMLElement) => {
  const name = el.dataset.simpleComponent
  return name ? components[name] : undefined
}

export const registerComponent = <
  T extends HTMLElement,
  C extends SimpleComponent<T>
>(
  name: string,
  component: C
) => {
  if (typeof component !== 'function') {
    throw new Error(`Component ${name} is not a function.`)
  }
  components[name] = component
  return component
}
