import { define, registerComponent } from '.'
import { registerDirective } from './directive'
import { mount } from './mount'

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

const todosDef = define({
  props: { todos: [] as string[] }
})

registerComponent('todos', todosDef, ({ props }) => {
  console.log(props.todos)

  props.todos = [...props.todos, 'three']
})

const autoHideDef = define({
  modifiers: { threshold: 60, direction: 'down' }
})

registerDirective('auto-hide', autoHideDef, ({ el, modifiers }) => {
  let direction: 'up' | 'down'
  let isScrolling = false
  let lastScroll = 0
  let startScroll = 0

  console.log(modifiers)

  window.addEventListener('scroll', () => {
    const scroll = document.documentElement.scrollTop

    if (!isScrolling) {
      startScroll = lastScroll = scroll
      isScrolling = true
      return
    }

    const distance = Math.abs(startScroll - scroll)
    const lastDirection = direction
    direction = scroll > lastScroll ? 'down' : 'up'

    if (direction !== lastDirection) {
      startScroll = lastScroll = scroll
      isScrolling = true
      return
    }

    if (distance > modifiers.threshold) {
      el.hidden = direction === modifiers.direction
      isScrolling = false
      return
    }

    lastScroll = scroll
  })
})

mount()
