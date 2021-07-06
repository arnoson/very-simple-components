import { walkComponent } from './walkComponent'
import { RefsAll } from './types'

export const getAllRefs = (el: HTMLElement) => {
  const refs: RefsAll = {}
  walkComponent(el, el => {
    const { ref } = el.dataset
    if (ref) {
      const entry = refs[ref]
      if (!entry) {
        refs[ref] = [el]
      } else {
        entry.push(el)
      }
    }
  })
  return refs
}
