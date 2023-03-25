import { SimpleRefs, SimpleRefsAll } from './types'
import { walkComponent } from './walkComponent'

export const getRefs = (el: HTMLElement) => {
  const refsAll: SimpleRefsAll = {}
  walkComponent(el, el => {
    const { ref } = el.dataset
    if (ref) {
      refsAll[ref] ??= []
      refsAll[ref].push(el)
    }
  })

  const refs: SimpleRefs = Object.fromEntries(
    Object.entries(refsAll).map(([key, value]) => [key, value[0]])
  )

  return { refs, refsAll }
}
