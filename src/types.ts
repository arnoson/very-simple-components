declare global {
  interface Element {
    $component: any
  }
}

export interface ComponentPayload {
  el: HTMLElement
  ref: Record<string, HTMLElement>
  refs: Record<string, HTMLElement[]>
}

export type Component = (payload: ComponentPayload) => any
