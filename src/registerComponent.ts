export const components: Record<string, Component> = {}
export const getComponent = (el: HTMLElement) =>
  components[el.dataset.component]

export const registerComponent = (name: string, component: Component) => {
  if (typeof component !== 'function') {
    throw new Error(`Component ${name} is not a function.`)
  }
  components[name] = component
  return component
}
