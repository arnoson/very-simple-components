# ♻️ Very Simple Components

A very simple way to attach javascript to the DOM. When even [petite-vue](https://github.com/vuejs/petite-vue) or [alpine.js](https://github.com/alpinejs/alpine/) would be too much.

💾 ~ 0.6kb (minify and gzip)

## Installation

```
npm i @very-simple/components
```

## Example

```js
// components/gallery.js

import { registerComponent, defineProps } from '@very-simple/components'

const props = defineProps({ loop: Boolean })
registerComponent('gallery', ({ el, ref, refs }) => {
  // Props are read from el's dataset and automatically converted to the correct
  // type. Default values are also possible, see documentation.
  const { loop } = props(el)

  // Multiple HTML elements can have the same `ref` name. They will be
  // grouped in `refs` ...
  const { slides } = refs

  // ... whereas `ref` only stores a single element per name.
  const { prev, next } = ref

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
registerComponent(name: string, component: Component)

type Component = (payload: {
  el: HTMLElement
  ref: Record<string, HTMLElement>
  refs: Record<string, HTMLElement[]>
}) => any
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

### Define Props

Define properties to automatically convert `el.dataset` properties to the
correct type and enable autocompletion.

```ts
// You can either define a prop's type by proving a constructor ...
defineProps({ answer: Number, enabled: Boolean })

// ... or by providing a default value.
defineProps({ answer: 42, enabled: true })

// For objects and arrays the default value can be wrapped inside a function
defineProps({ list: () => [1, 2, 3] })
```

Example:

```ts
const props = defineProps({
  enabled: true,
  message: String,
  tags: () => ['default']
})

registerComponent('my-component', ({ el }) => {
  const { enabled, message, tags } = props(el)
})
```

```html
<div
  data-simple-component="my-component"
  data-message="Hello"
  data-tags='[ "very", "simple", "components" ]'
></div>
```

### Ignore Elements

Sometimes it is useful to skip big DOM elements when searching for components
to mount:

```html
<div data-simple-ignore>
  <!-- a lot of DOM elements ... -->
</div>
```

### Expose Component Methods

Everything you return from the component function is available on the HTML
element's `$component` property:

```js
registerComponent('my-component', () => {
  const sayHello = () => console.log('Hello :~)')
  return { sayHello }
})
```

```html
<div data-simple-component="my-component" id="my-id"></div>
```

```js
document.getElementById('my-id').$component.sayHello()
```
