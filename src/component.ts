import {
  Component,
  ComponentDefinition,
  ComponentSetup
} from './types/component'

export const components: Record<string, Component<any>> = {}
export const getComponent = (el: HTMLElement) => {
  const name = el.dataset.component
  return name ? components[name] : undefined
}

export function component<Setup extends ComponentSetup>(
  name: string,
  setup: Setup
): Component

export function component<
  Definition extends ComponentDefinition,
  Setup extends ComponentSetup<Definition>
>(
  name: string,
  definition: Definition,
  setup: Setup
): Component<Definition, Setup>

export function component<
  Definition extends ComponentDefinition,
  Setup extends ComponentSetup<Definition>
>(
  name: string,
  arg1: Definition | Setup,
  arg2?: Setup
): Component<Definition, Setup> {
  const hasBothArgs = arg2 !== undefined
  const definition = (hasBothArgs ? arg1 : {}) as Definition
  const setup = (hasBothArgs ? arg2 : arg1) as Setup

  if (typeof setup !== 'function')
    throw new Error(`Component ${name} is not a function.`)

  const component = { definition, setup }
  components[name] = component
  return component
}

export const define = <Definition extends ComponentDefinition>(
  definition: Definition
) => definition
