import {
  SimpleComponent,
  SimpleComponentDefinition,
  SimpleComponentSetup
} from './types/component'

export const components: Record<string, SimpleComponent<any>> = {}
export const getComponent = (el: HTMLElement) => {
  const name = el.dataset.component
  return name ? components[name] : undefined
}

export function registerComponent<Setup extends SimpleComponentSetup>(
  name: string,
  setup: Setup
): SimpleComponent

export function registerComponent<
  Definition extends SimpleComponentDefinition,
  Setup extends SimpleComponentSetup<Definition>
>(
  name: string,
  definition: Definition,
  setup: Setup
): SimpleComponent<Definition, Setup>

export function registerComponent<
  Definition extends SimpleComponentDefinition,
  Setup extends SimpleComponentSetup<Definition>
>(
  name: string,
  arg1: Definition | Setup,
  arg2?: Setup
): SimpleComponent<Definition, Setup> {
  const hasBothArgs = arg2 !== undefined
  const definition = (hasBothArgs ? arg1 : {}) as Definition
  const setup = (hasBothArgs ? arg2 : arg1) as Setup

  if (typeof setup !== 'function')
    throw new Error(`Component ${name} is not a function.`)

  const component = { definition, setup }
  components[name] = component
  return component
}

export const define = <Definition extends SimpleComponentDefinition>(
  definition: Definition
) => definition
