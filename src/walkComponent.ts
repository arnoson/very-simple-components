export const walkComponent = (
  el: HTMLElement,
  callback: (el: HTMLElement, isChildComponent: boolean) => any,
  isChild = false
) => {
  if (!isChild) callback(el, false)

  let node = el.firstElementChild as HTMLElement
  while (node) {
    if (!node.hasAttribute('data-ignore')) {
      const isChildComponent = node.hasAttribute('data-component')
      callback(node, isChildComponent)
      if (!isChildComponent) walkComponent(node, callback, true)
    }
    node = node.nextElementSibling as HTMLElement
  }
}
