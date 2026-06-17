import { registerComponent, mountComponents, define, unmountComponent } from '.'

const counterDef = define({
  props: { count: 0 },
  events: { count: Number }
})

registerComponent('counter', counterDef, ctx => {
  const { el, props, ComponentEvent } = ctx
  const { count, countDisplay } = ctx.refs

  const update = (value: number) => (countDisplay!.innerText = `${value}`)

  count?.addEventListener('click', () => {
    update(++props.count)
    el.dispatchEvent(new ComponentEvent('count', { detail: props.count }))
  })

  update(props.count)
})

const todosDef = define({ props: { todos: [] as string[] } })

registerComponent('todos', todosDef, ({ props }) => {
  console.log(props.todos)

  props.todos = [...props.todos, 'three']
})

registerComponent('ticker', ({ el, signal }) => {
  let tick = 0
  const id = setInterval(() => console.log(tick++), 1000)

  window.addEventListener('resize', () => console.log('resize'), { signal })
  window.addEventListener(
    'click',
    () => {
      unmountComponent(el)
      el.remove()
    },
    { signal }
  )

  return {
    cleanup: () => clearInterval(id)
  }
})

mountComponents()
