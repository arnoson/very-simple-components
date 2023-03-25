import {
  SimpleComponent,
  SimpleComponentOptions,
  SimpleComponentSetup
} from './types'

export const components: Record<string, SimpleComponent<any>> = {}
export const getComponent = (el: HTMLElement) => {
  const name = el.dataset.simpleComponent
  return name ? components[name] : undefined
}

export const defineOptions = <Options extends SimpleComponentOptions>(
  options: Options
) => options

export function registerComponent<
  Setup extends SimpleComponentSetup<Options>,
  Options extends SimpleComponentOptions = {}
>(name: string, setup: Setup): SimpleComponent<Options>

export function registerComponent<
  Setup extends SimpleComponentSetup<Options>,
  Options extends SimpleComponentOptions = {}
>(name: string, options: Options, setup: Setup): SimpleComponent<Options>

export function registerComponent<
  Setup extends SimpleComponentSetup<Options>,
  Options extends SimpleComponentOptions = {}
>(name: string, arg1: Options | Setup, arg2?: Setup): SimpleComponent<Options> {
  const hasBothArgs = arg2 !== undefined
  const options = (hasBothArgs ? arg1 : {}) as Options
  const setup = (hasBothArgs ? arg2 : arg1) as Setup

  if (typeof setup !== 'function')
    throw new Error(`Component ${name} is not a function.`)

  const component = { options, setup }
  components[name] = component
  return component
}
