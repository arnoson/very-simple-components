import { BuiltInTypeConstructor } from './base'

export type SimpleEventMap<Definitions> = {
  [K in keyof Definitions]: Definitions[K] extends BuiltInTypeConstructor
    ? CustomEvent<ReturnType<Definitions[K]>>
    : CustomEvent<Definitions[K]>
}

export interface SimpleComponentEvent<
  Events extends Record<string, CustomEvent> = any
> extends CustomEvent {
  new <K extends keyof Events>(
    name: string,
    ...args: Events[K]['detail'] extends undefined | null
      ? [eventInitDict?: CustomEventInit]
      : [eventInitDict: CustomEventInitRequired<Events[K]['detail']>]
  ): Events[K]
}

interface CustomEventInitRequired<T = any> extends CustomEventInit {
  detail: T
}
