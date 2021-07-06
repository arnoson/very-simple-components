export type Refs = Record<string, HTMLElement>
export type RefsAll = Record<string, HTMLElement[]>

export type Component = (payload: {
  el: HTMLElement
  refs: Refs
  refsAll: RefsAll
}) => any
