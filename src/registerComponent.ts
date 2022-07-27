import { Component } from './types'

export const components: Record<string, Component<any>> = {}
export const getComponent = (el: HTMLElement) => {
  const name = el.dataset.simpleComponent
  return name ? components[name] : undefined
}

export const registerComponent = <T extends HTMLElement>(
  name: string,
  component: Component<T>
) => {
  if (typeof component !== 'function') {
    throw new Error(`Component ${name} is not a function.`)
  }
  components[name] = component
  return component
}
