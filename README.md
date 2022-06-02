# ♻️ Very Simple Components

A very simple way to attach javascript to the DOM. When even [petite-vue](https://github.com/vuejs/petite-vue) or [alpine.js](https://github.com/alpinejs/alpine/) would be too much.

💾 less than 0.5kb (minify and gzip)

## Installation

```
npm i @very-simple/components
```

## Example

```js
// components/gallery.js

import { registerComponent } from '@very-simple/components'

registerComponent('gallery', ({ el, ref, refs }) => {
  // Multiple HTML elements can have the same `ref` name. They will be
  // grouped in `refs` ...
  const { slides } = refs
  // ... whereas `ref` only stores a single element per name.
  const { prev, next } = ref

  let currentIndex = 0
  const maxIndex = slides.length - 1

  const selectSlide = index => {
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

<div id="my-gallery" data-simple-component="gallery">
  <div data-ref="slides">A</div>
  <div data-ref="slides">B</div>
  <div data-ref="slides">C</div>
  <button data-ref="prev">Prev</button>
  <button data-ref="next">Next</button>
</div>

<script type="module">
  import { mountComponents } from 'very-simple-components'
  // We only have to import the component, it will register itself.
  import './components/gallery.js'

  // This will look for any elements with a `data-simple-component` attribute and
  // mount the corresponding component.
  mountComponents()
</script>
```

## Documentation

### Mount a single component

Note: this will also mount any child components.

```ts
mountComponent(el: HTMLElement)
```

### Mount all components

```ts
// If no `root` is provided, `<body>` is used.
mountComponent(root?: HTMLElement)
```

### Ignore elements

Sometimes it is useful to skip big DOM elements when searching for components
to mount:

```html
<div data-simple-ignore>
  <!-- a lot of DOM elements ... -->
</div>
```

### Expose component methods

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
