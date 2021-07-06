type Refs = Record<string, HTMLElement>
type RefsAll = Record<string, HTMLElement[]>

type Component = (payload: {
  el: HTMLElement
  refs: Refs
  refsAll: RefsAll
}) => any
