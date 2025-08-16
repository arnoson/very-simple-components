import { registerComponent, mountComponents, define } from '.'

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

mountComponents()
