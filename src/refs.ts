import { SimpleRefs, SimpleRefsAll } from './types'

export const getRefs = (el: HTMLElement) => {
  const refsAll: SimpleRefsAll = {}
  const addRef = (name: string, el: HTMLElement) => {
    refsAll[name] ??= []
    refsAll[name].push(el)
  }

  el.querySelectorAll<HTMLElement>('[data-ref]').forEach(refEl => {
    const value = refEl.dataset.ref!
    const isDeepRef = value.includes('/')

    if (isDeepRef) {
      const [parent, name] = value.split('/')

      const selector = parent.match(/^\((.*)\)$/)?.[1]
      const parentSelector = selector ?? `[data-component='${parent}']`

      const parentEl = refEl.closest(parentSelector)
      if (parentEl === el) addRef(name, refEl)
    } else {
      const closestComponent = refEl.closest('[data-component]')
      if (closestComponent === el) addRef(value, refEl)
    }
  })

  const refs: SimpleRefs = Object.fromEntries(
    Object.entries(refsAll).map(([key, value]) => [key, value[0]])
  )

  return { refs, refsAll }
}
