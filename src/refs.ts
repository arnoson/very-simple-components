import { SimpleRefs, SimpleRefsAll } from './types'
import { walkComponent } from './walkComponent'

export const getRefs = (el: HTMLElement) => {
  const refsAll: SimpleRefsAll = {}
  const addRef = (name: string, el: HTMLElement) => {
    refsAll[name] ??= []
    refsAll[name].push(el)
  }

  walkComponent(el, el => {
    const { ref } = el.dataset
    if (ref) addRef(ref, el)
  })

  const deepRefs = el.querySelectorAll<HTMLElement>('[data-ref*="/"]')
  deepRefs.forEach(refEl => {
    const [parent, name] = refEl.dataset.ref!.split('/')

    const selector = parent.match(/^\((.*)\)$/)?.[1]
    const parentSelector = selector ?? `[data-simple-component='${parent}']`

    const parentEl = el.closest(parentSelector)
    if (parentEl === el) addRef(name, refEl)
  })

  const refs: SimpleRefs = Object.fromEntries(
    Object.entries(refsAll).map(([key, value]) => [key, value[0]])
  )

  return { refs, refsAll }
}
