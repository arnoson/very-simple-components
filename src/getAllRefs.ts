import { walkComponent } from './walkComponent'

export const getAllRefs = (el: HTMLElement) => {
  /** @type {RefsAll} */
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
