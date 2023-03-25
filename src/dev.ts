import {
  registerComponent,
  mountComponents,
  SimpleElement,
  defineOptions
} from '.'

const options = defineOptions({
  props: { count: 0 },
  events: { count: Number }
})

const component = registerComponent('counter', options, ctx => {
  const { el, props, ComponentEvent } = ctx
  const { count, countDisplay } = ctx.refs

  const update = (value: number) => (countDisplay!.innerText = `${value}`)

  count?.addEventListener('click', () => {
    update(++props.count)
    el.dispatchEvent(new ComponentEvent('count', props.count))
  })

  update(props.count)
})

type ComponentElement = SimpleElement<typeof component>
const el = document.querySelector<ComponentElement>(
  '[data-simple-component="counter"]'
)!

el.addEventListener('count', ({ detail: count }) =>
  console.log(`Count: ${count}`)
)

mountComponents()
