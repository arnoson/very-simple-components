import { SimpleComponent, SimpleElement } from '../types'
import { SimpleComponentDefinition } from './component'

export type SimpleRefs = Record<string, HTMLElement | SimpleElement<any>>

export type SimpleRefsAll<R extends SimpleRefs = any> = {
  [K in keyof R]: R[K][]
}

export type ResolveRefs<Refs extends SimpleComponentDefinition['refs']> = {
  [K in keyof Refs]: Refs[K] extends typeof HTMLElement
    ? Refs[K]['prototype']
    : Refs[K] extends SimpleComponent
      ? SimpleElement<Refs[K]>
      : never
}
