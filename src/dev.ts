import {
  registerComponent,
  mountComponents,
  SimpleElement,
  defineOptions
} from '.'

const counterOptions = defineOptions({
  props: { count: 0 },
  events: { count: Number }
})

registerComponent('counter', counterOptions, ctx => {
  const { el, props, ComponentEvent } = ctx
  const { count, countDisplay } = ctx.refs

  const update = (value: number) => (countDisplay!.innerText = `${value}`)

  count?.addEventListener('click', () => {
    update(++props.count)
    el.dispatchEvent(new ComponentEvent('count', { detail: props.count }))
  })

  update(props.count)
})

const todosOptions = {
  props: { todos: [] as string[] }
}

registerComponent('todos', todosOptions, ({ props }) => {
  console.log(props.todos)

  props.todos = [...props.todos, 'three']
})

mountComponents()
