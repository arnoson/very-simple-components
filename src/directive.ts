import { getDefaultProp, isBuiltInTypeConstructor, parseProp } from './props'
import {
  SimpleDirective,
  SimpleDirectiveDefinition,
  SimpleDirectiveSetup
} from './types/directive'

export const directives: Record<string, SimpleDirective> = {}

export function registerDirective<
  Setup extends SimpleDirectiveSetup<Definition>,
  Definition extends SimpleDirectiveDefinition = {}
>(name: string, setup: Setup): SimpleDirective<Definition, Setup>

export function registerDirective<
  Setup extends SimpleDirectiveSetup<Definition>,
  Definition extends SimpleDirectiveDefinition = {}
>(
  name: string,
  definition: Definition,
  setup: Setup
): SimpleDirective<Definition, Setup>

export function registerDirective<
  Setup extends SimpleDirectiveSetup<Definition>,
  Definition extends SimpleDirectiveDefinition = {}
>(
  name: string,
  arg1: Definition | Setup,
  arg2?: Setup
): SimpleDirective<Definition, Setup> {
  const hasBothArgs = arg2 !== undefined
  const definition = (hasBothArgs ? arg1 : {}) as Definition
  const setup = (hasBothArgs ? arg2 : arg1) as Setup

  if (typeof setup !== 'function')
    throw new Error(`Directive ${name} is not a function.`)

  const directive = { definition, setup }
  directives[name] = directive
  return directive
}
