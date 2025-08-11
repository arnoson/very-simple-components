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
    if (!ref) return

    const isDeepRef = ref.includes('/')
    if (isDeepRef) return

    addRef(ref, el)
  })

  // Deep refs can't be handled during DOM walk, since we stop at child
  // components.
  const deepRefs = el.querySelectorAll<HTMLElement>('[data-ref*="/"]')
  deepRefs.forEach(refEl => {
    const [parent, name] = refEl.dataset.ref!.split('/')

    const selector = parent.match(/^\((.*)\)$/)?.[1]
    const parentSelector = selector ?? `[data-simple-component='${parent}']`

    const parentEl = refEl.closest(parentSelector)
    if (parentEl === el) addRef(name, refEl)
  })

  const refs: SimpleRefs = Object.fromEntries(
    Object.entries(refsAll).map(([key, value]) => [key, value[0]])
  )

  return { refs, refsAll }
}
