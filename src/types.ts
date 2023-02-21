export type SimpleRefs = Record<string, HTMLElement | undefined>

export type SimpleRefsAll = Record<string, HTMLElement[]>

export type DefineRefs<T> = SimpleRefs & Partial<T>

export type DefineRefsAll<T> = SimpleRefsAll & T

export type SimpleInstance<C extends SimpleComponent> = ReturnType<C>

export type SimpleElement<C extends SimpleComponent, T = HTMLElement> = T & {
  $component: SimpleInstance<C>
}

export interface SimpleComponentPayload<T> {
  el: T
  refs: SimpleRefs
  refsAll: SimpleRefsAll
}

export type SimpleComponent<T = HTMLElement> = (
  payload: SimpleComponentPayload<T>
) => any
