import { walkComponent } from './walkComponent'
import { RefsAll } from './types'

export const getAllRefs = (el: HTMLElement) => {
  const refs: RefsAll = {}
  walkComponent(el, el => {
    const { ref } = el.dataset
    if (ref) {
      refs[ref] ??= []
      refs[ref].push(el)
    }
  })
  return refs
}
