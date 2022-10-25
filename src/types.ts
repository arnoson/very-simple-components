export type SimpleRef = Record<string, HTMLElement | undefined>

export type SimpleRefs = Record<string, HTMLElement[]>

export type DefineRef<T> = SimpleRef & Partial<T>

export type DefineRefs<T> = SimpleRefs & T

export type SimpleInstance<C extends SimpleComponent> = ReturnType<C>

export type SimpleElement<C extends SimpleComponent, T = HTMLElement> = T & {
  $component: SimpleInstance<C>
}

export interface SimpleComponentPayload<T> {
  el: T
  ref: SimpleRef
  refs: SimpleRefs
}

export type SimpleComponent<T = HTMLElement> = (
  payload: SimpleComponentPayload<T>
) => any
