# ♻️ Very Simple Components

A very simple way to attach javascript/typescript to the DOM. When even [petite-vue](https://github.com/vuejs/petite-vue) or [alpine.js](https://github.com/alpinejs/alpine/) would be too much.

💾 ~ 0.8kb (minify and gzip)

## Installation

```
npm i @very-simple/components
```

## Example

```js
// components/gallery.js

import { registerComponent, defineOptions } from '@very-simple/components'

const options = defineOptions({
  props: { loop: Boolean }
})

registerComponent('gallery', options, ({ el, props, refs, refsAll }) => {
  // Props are read from el's dataset and automatically converted to the correct
  // type. Default values are also possible, see documentation.
  const { loop } = props

  // Multiple HTML elements can have the same `ref` name. They will be
  // grouped in `refsAll` ...
  const { slides } = refsAll

  // ... whereas `refs` only stores a single element per name.
  const { prev, next } = refs

  let currentIndex = 0
  const maxIndex = slides.length - 1

  const selectSlide = index => {
    if (!loop && (index < 0 || index > maxIndex)) return

    currentIndex = index < 0 ? maxIndex : index > maxIndex ? 0 : index
    slides.forEach((el, index) => (el.hidden = index !== currentIndex))
  }

  // Add event listeners.
  prev.addEventListener('click', () => selectSlide(currentIndex - 1))
  next.addEventListener('click', () => selectSlide(currentIndex + 1))

  // Show the first slide.
  selectSlide(currentIndex)
})
```

```html
<!-- index.html -->

<div id="my-gallery" data-simple-component="gallery" data-loop="true">
  <div data-ref="slides">A</div>
  <div data-ref="slides">B</div>
  <div data-ref="slides">C</div>
  <button data-ref="prev">Prev</button>
  <button data-ref="next">Next</button>
</div>

<script type="module">
  import { mountComponents } from '@very-simple/components'
  // We only have to import the component, it will register itself.
  import './components/gallery.js'

  // This will look for any elements with a `data-simple-component` attribute and
  // mount the corresponding component.
  mountComponents()
</script>
```

## Documentation

### Register a Component

```ts
registerComponent('my-name', (ctx: Context) => {})

type Context = {
  // The element the component is mounted to.
  el: HTMLElement

  // The props of the component. If no prop types or default values are defined
  // this is just the element's dataset. Otherwise it will be a proxy around the
  // element's dataset that takes care of converting the props to the correct type.
  // See: #Props
  props: DOMStringMap | Proxy

  // A Record of refs (elements with a `data-ref="name"` inside the component).
  // See: #Refs
  refs: Record<string, HTMLElement | undefined>

  // Similar to refs but can also contain multiple refs with the same name.
  refsAll: Record<string, HTMLElement[]>

  // A fully typed `CustomEvent` constructor to dispatch type safe events.
  // See: #Events
  ComponentEvent: SimpleComponentEvent
}
```

### Register a Component with Options

By passing along `options`, you can add provide additional type hints and automatically parse props from the element's dataset to the correct type.

```ts
const options = defineOptions({
  // Provide a type for the element (default will be HTMLElement)
  el: HTMLImageElement,

  // Provide types and/or default values for props
  // See: #Props
  props: {
    loop: Boolean,
    count: 10
  },

  // Provide types for some or all refs (by default all refs will be HTMLElement)
  // See: #Refs
  refs: { click: HTMLButtonElement },

  // Provide types for the elements events.
  // See: #Events
  events: {
    updateCount: Number,
    close: null
  }
})

registerComponent('my-name', options, (ctx: Context) => {})
```

### Mount a single Component

Note: this will also mount any child components.

```ts
mountComponent(el: HTMLElement)
```

### Mount all Components

```ts
// If no `root` is provided, `<body>` is used.
mountComponent(root?: HTMLElement)
```

### Ignore Elements

Sometimes it is useful to skip big DOM elements when searching for components
to mount:

```html
<div data-simple-ignore>
  <!-- a lot of DOM elements ... -->
</div>
```

### Props

`props`, passed to the component's setup function can read from / write to the component elements dataset. By default all values are strings (as is the normal behavior with an element's dataset). But by providing types and default values for props, these values will be automatically converted to the correct type!

```ts
const options = defineOptions({
  props: { count: 0 }
})

registerComponent('my-component', options, ({ el, props }) => {
  // If the element hasn't `data-count` specified, this will output the default
  // value `0`.
  console.log(props.count) // => 0

  // If the element has `data-count="20"`, "20" will be automatically parsed
  // into a number and returned.
  console.log(props.count) // => 20
})
```

This also works for complex data types:

```ts
const options = defineOptions({
  props: { todos: [] as string[] }
})

// Lets say the html for the component looks like this:
// <div data-simple-component="todo" data-todos='["mount components!", "enjoy"]'>

registerComponent('todo', options, ({ props }) => {
  console.log(props.todos[0]) // => 'mount components!'
})
```

### Expose Component

The component's context and everything you return from the component's setup function is available on the HTML element.

```js
registerComponent('my-component', ({ refs, refsAll, props }) => {
  const sayHello = () => console.log(props.message)
  return { sayHello }
})
```

```html
<div data-simple-component="my-component" id="my-id" data-message="Hello :~)">
  <button data-ref="button">Click me!</button>
</div>
```

```js
const el = document.getElementById('my-id')
el.$refs.button.innerText // => 'Click me!'
el.$component.sayHello() // => 'Hello :~)'
el.$props.message = 'Goodbye'
el.$component.sayHello() // => 'Goodbye'
```

With typescript you can also get autocompletion:

```ts
// my-component.ts
export default registerComponent('my-component', ({ props }) => {
  const sayHello = () => console.log(props.message)
  return { sayHello }
})

// index.ts
import MyComponent from './my-component.ts'
import type { SimpleElement } from '@very-simple/components'

type MyComponentElement = SimpleElement<typeof MyComponent>
const el = document.getElementById<MyComponentElement>('my-id')

el.$component.sayHello() // <- this gets autocompleted
```

### Refs

Refs are of type HTMLElement by default, but it can be useful to define a more
specific type for some of them:

```ts
const options = defineOptions({
  refs: { img: HTMLImageElement, videos: HTMLVideoElement }
})

registerComponent('my-component', options, ({ refs, refsAll }) => {
  const { container, img } = refs
  // container -> HTMLElement
  // img -> HTMLImageElement

  const { slides, videos } = refsAll
  // slides -> HTMLElement[]
  // videos -> HTMLVideoElement[]
})
```

You can also use another simple component as a ref type. This is very useful inside a parent component.

```ts
// child.ts
export default registerComponent('child', () => {})

// parent.ts
import Child from './child.ts'

const options = defineOptions({
  refs: { theChild: Child }
})
registerComponent('parent', options, ({ refs }) => {
  // ...
})
```

```html
<div data-simple-component="parent">
  <div data-simple-component="child" data-ref="theChild"></div>
</div>
```

### Events

Components try to stay as close to native APIs as possible. Therefore events are just [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), but they can be fully typed:

```ts
const options = defineOptions({
  events: { updateCounter: Number, close: null }
})

registerComponent('my-component', options, ({ el, ComponentEvent }) => {
  // These will be autocompleted and generate type-errors if you forget, for
  // example, the value for the `updateCounter` event.
  el.dispatchEvent(new ComponentEvent('updateCounter', { detail: 10 }))
  el.dispatchEvent(new ComponentEvent('close'))

  // `ComponentEvent` ist just the native `CustomEvent` but with types based
  // on your `options.events`.
})
```

This also works if you listen to a component's event from outside the component's setup fuction.

```ts
// my-component.ts
const options = defineOptions({ events: { updateCounter: Number } })
export default registerComponent('my-component', options, () => {})

// index.ts
import MyComponent from './my-component.ts'
import type { SimpleElement } from '@very-simple/components'

type MyComponentElement = SimpleElement<typeof MyComponent>
const el = document.getElementById<MyComponentElement>('my-id')

// This will be fully typed:
el.addEventListener('updateCounter', ({ detail: count }) => console.log(count))
```
