declare global {
  interface Element {
    $component: any
  }
}

export interface ComponentPayload<T> {
  el: T
  ref: Record<string, HTMLElement>
  refs: Record<string, HTMLElement[]>
}

export type Component<T> = (payload: ComponentPayload<T>) => any
