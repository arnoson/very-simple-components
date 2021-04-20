# Very Simple Components

A tiny library that helps you to register javascript logic on the HTML you already have. Like a very simplified version of [alpine.js](https://github.com/alpinejs/alpine/) or [stimulus](https://github.com/hotwired/stimulus).

## Example

```js
// components/gallery.js

import { registerComponent } from 'very-simple-components'

registerComponent('gallery', ({ el, refs, refsAll }) => {
  // Multiple HTML elements can have the same `ref` name. They will be
  // grouped in `refsAll`.
  const { slides } = refsAll
  // Normal refs, that occur only once in your component, are stored in `refs`.
  const { prev, next } = refs

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

<div id="my-gallery" data-component="gallery">
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

  // This will look for any elements with a `data-component` attribute and
  // mount the corresponding component.
  mountComponents()
</script>
```

## Why?

Although frameworks like alpine.js or stimulus are meant to work with the HTML you already have, I needed something even simpler. Very Simple Components is targeted especially to static sites where we don't need component life cycles. Also for some websites even directives, registering event handlers in markup and many other advanced features are sometimes overkill.

Very Simple Components just gives you a way to easily attach your javascript logic to HTML elements, and provides refs to more quickly access HTML elements within your component root. That's it ;)
