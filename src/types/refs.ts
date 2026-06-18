import { Component, ComponentElement } from '../types'
import { ComponentDefinition } from './component'

export type Refs = Record<string, HTMLElement | ComponentElement<any>>

export type RefsAll<R extends Refs = any> = {
  [K in keyof R]: R[K][]
}

export type ResolveRefs<R extends ComponentDefinition['refs']> = {
  [K in keyof R]: R[K] extends typeof HTMLElement
    ? R[K]['prototype']
    : R[K] extends Component
      ? ComponentElement<R[K]>
      : never
}
