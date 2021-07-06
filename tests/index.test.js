import {
  registerComponent,
  mountComponent,
  mountComponents
} from '../dist/index.es.js'

test('mounts a component', () => {
  const component = jest.fn()
  registerComponent('test', component)

  const div = document.createElement('div')
  div.dataset.component = 'test'

  mountComponent(div)
  expect(component).toBeCalledWith({ el: div, refs: {}, refsAll: {} })
})

test('mounts multiple components', () => {
  const componentA = jest.fn()
  registerComponent('a', componentA)

  const componentB = jest.fn()
  registerComponent('b', componentB)

  document.body.innerHTML = `
    <div data-component="a"></div>
    <div data-component="a"></div>
    <div data-component="b"></div>
  `
  mountComponents(document.body)
  expect(componentA).toBeCalledTimes(2)
  expect(componentB).toBeCalledTimes(1)
})

test(`doesn't mount an already mounted component`, () => {
  const component = jest.fn()
  registerComponent('test', component)

  const div = document.createElement('div')
  div.dataset.component = 'test'

  mountComponent(div)
  mountComponent(div)

  expect(component).toBeCalledTimes(1)
})

test(`doesn't walk elements with data-ignore attribute`, () => {
  const component = jest.fn()
  registerComponent('test', component)

  document.body.innerHTML = `
    <div data-component="test">
      <div data-ignore data-ref="ref">
        <div data-ref="ref"></div>
      </div>
    </div>
  `
  mountComponents(document.body)
  expect(component).toBeCalledWith(expect.objectContaining({ refs: {} }))
})

test('provides refs', () => {
  const component = jest.fn()
  registerComponent('test', component)

  document.body.innerHTML = `
    <div data-component="test">
      <div data-ref="myRef"></div>
      <div data-component="another-component">
        <!-- This shouldn't show up in the refs because it belongs to another 
        component -->
        <div data-ref="nestedRef"></div>
      </div>
    </div>
  `
  mountComponents(document.body)
  const myRef = document.querySelector(`[data-ref='myRef']`)
  expect(component).toBeCalledWith(
    expect.objectContaining({
      refs: { myRef }
    })
  )
})

test('provides refsAll', () => {
  const component = jest.fn()
  registerComponent('test', component)

  document.body.innerHTML = `
    <div data-component="test">
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
  expect(component).toBeCalledWith(
    expect.objectContaining({
      refsAll: { myRef }
    })
  )
})
