import { it, expect, vi } from 'vitest'
import { registerComponent, mountComponent, mountComponents } from '../src'

it('mounts a component', () => {
  const component = vi.fn()
  registerComponent('test', component)

  const div = document.createElement('div')
  div.dataset.simpleComponent = 'test'

  mountComponent(div)
  expect(component).toBeCalledWith({ el: div, ref: {}, refs: {} })
})

it('mounts multiple components', () => {
  const componentA = vi.fn()
  registerComponent('a', componentA)

  const componentB = vi.fn()
  registerComponent('b', componentB)

  document.body.innerHTML = `
    <div data-simple-component="a"></div>
    <div data-simple-component="a"></div>
    <div data-simple-component="b"></div>
  `
  mountComponents(document.body)
  expect(componentA).toBeCalledTimes(2)
  expect(componentB).toBeCalledTimes(1)
})

it(`doesn't mount an already mounted component`, () => {
  const component = vi.fn()
  registerComponent('test', component)

  const div = document.createElement('div')
  div.dataset.simpleComponent = 'test'

  mountComponent(div)
  mountComponent(div)

  expect(component).toBeCalledTimes(1)
})

it(`doesn't walk elements with data-simple-ignore attribute`, () => {
  const component = vi.fn()
  registerComponent('test', component)

  document.body.innerHTML = `
    <div data-simple-component="test">
      <div data-simple-ignore data-ref="ref">
        <div data-ref="ref"></div>
      </div>
    </div>
  `
  mountComponents(document.body)
  expect(component).toBeCalledWith(expect.objectContaining({ refs: {} }))
})

it('provides a record of single refs', () => {
  const component = vi.fn()
  registerComponent('test', component)

  document.body.innerHTML = `
    <div data-simple-component="test">
      <div data-ref="myRef"></div>
      <div data-simple-component="another-component">
        <!-- This shouldn't show up in the refs because it belongs to another 
        component -->
        <div data-ref="nestedRef"></div>
      </div>
    </div>
  `
  mountComponents(document.body)
  const myRef = document.querySelector(`[data-ref='myRef']`)
  expect(component).toBeCalledWith(expect.objectContaining({ ref: { myRef } }))
})

it('provides a record of groups of refs with the same name', () => {
  const component = vi.fn()
  registerComponent('test', component)

  document.body.innerHTML = `
    <div data-simple-component="test">
      <div id="ref1" data-ref="myRef"></div>
      <div id="ref2" data-ref="myRef"></div>
      <div id="ref3" data-ref="myRef"></div>
    </div>
  `
  mountComponents(document.body)
  const myRef = [
    document.querySelector('#ref1'),
    document.querySelector('#ref2'),
    document.querySelector('#ref3')
  ]
  expect(component).toBeCalledWith(expect.objectContaining({ refs: { myRef } }))
})

it(`exposes the component function's return value`, () => {
  const exposed = { test: () => {} }
  registerComponent('test', () => exposed)

  document.body.innerHTML = `
    <div data-simple-component="test" id="my-id"></div>
  `
  mountComponents(document.body)
  expect(document.getElementById('my-id').$component).toBe(exposed)
})
