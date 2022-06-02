import { Component } from './types'

export const components: Record<string, Component> = {}
export const getComponent = (el: HTMLElement) => {
  const name = el.dataset.simpleComponent
  return name ? components[name] : undefined
}

export const registerComponent = (name: string, component: Component) => {
  if (typeof component !== 'function') {
    throw new Error(`Component ${name} is not a function.`)
  }
  components[name] = component
  return component
}
