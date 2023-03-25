import { expect, it, vi } from 'vitest'
import {
  mountComponent,
  mountComponents,
  registerComponent,
  SimpleElement
} from '../src'

it('mounts a component', () => {
  const setup = vi.fn()
  registerComponent('test', setup)

  const div = document.createElement('div')
  div.dataset.simpleComponent = 'test'

  mountComponent(div)
  expect(setup).toBeCalledWith({
    el: div,
    refs: {},
    refsAll: {},
    props: div.dataset,
    ComponentEvent: CustomEvent
  })
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
  expect(component).toBeCalledWith(expect.objectContaining({ refs: { myRef } }))
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
  expect(component).toBeCalledWith(
    expect.objectContaining({ refsAll: { myRef } })
  )
})

it(`parses props`, () => {
  document.body.innerHTML = `
    <div
      data-simple-component="test"
      data-number="1"
      data-string="text"
      data-bool="true"
      data-array="[1,2,3]"
      data-obj='{ "hello": "world" }'
    ></div>
  `

  const options = {
    props: {
      number: Number,
      string: String,
      bool: Boolean,
      array: Array,
      obj: Object
    }
  }

  let props: any
  registerComponent('test', options, ctx => (props = ctx.props))
  mountComponents()

  expect(props.number).toBe(1)
  expect(props.string).toBe('text')
  expect(props.bool).toBe(true)
  expect(props.array).toEqual([1, 2, 3])
  expect(props.obj).toEqual({ hello: 'world' })
})

it(`provides default values for props`, () => {
  document.body.innerHTML = `<div data-simple-component="test"></div>`
  const el = document.querySelector('div')

  const options = {
    props: {
      number: 10,
      string: 'hello',
      bool: true,
      array: () => [],
      obj: () => ({})
    }
  }

  let props: any
  registerComponent('test', options, ctx => (props = ctx.props))
  mountComponents()

  expect(props.number).toBe(10)
  expect(props.string).toBe('hello')
  expect(props.bool).toBe(true)
  expect(props.array).toEqual([])
  expect(props.obj).toEqual({})
})

it('interferes prop types from default values', () => {
  document.body.innerHTML = `
    <div
      data-simple-component="test"
      data-number="1"
      data-string="text"
      data-bool="true"
      data-array="[1,2,3]"
      data-obj='{ "hello": "world" }'
    ></div>
  `

  const options = {
    props: {
      number: 42,
      string: 'default',
      bool: false,
      array: () => [],
      obj: () => ({})
    }
  }

  let props: any
  registerComponent('test', options, ctx => (props = ctx.props))
  mountComponents()

  expect(props.number).toBe(1)
  expect(props.string).toBe('text')
  expect(props.bool).toBe(true)
  expect(props.array).toEqual([1, 2, 3])
  expect(props.obj).toEqual({ hello: 'world' })
})

it(`exposes the component's refs`, () => {
  const component = registerComponent('test', () => {})

  document.body.innerHTML = `
    <div data-simple-component="test" id="my-id">
      <div id="ref" data-ref="ref"></div>
    </div>
  `
  const refs = { ref: document.getElementById('ref') }
  mountComponents(document.body)
  const el = document.getElementById('my-id') as SimpleElement<typeof component>
  expect(el.$refs).toEqual(refs)
})

it(`exposes the component's refsAll`, () => {
  const component = registerComponent('test', () => {})

  document.body.innerHTML = `
    <div data-simple-component="test" id="my-id">
      <div id="ref1" data-ref="myRef"></div>
      <div id="ref2" data-ref="myRef"></div>
    </div>
  `

  const myRef = [
    document.getElementById('ref1'),
    document.getElementById('ref2')
  ]

  mountComponents(document.body)
  const el = document.getElementById('my-id') as SimpleElement<typeof component>
  expect(el.$refsAll).toEqual({ myRef })
})

it(`exposes the component's props`, () => {
  document.body.innerHTML = `
    <div data-simple-component="test" id="my-id"></div>
  `
  const options = { props: { prop: 10 } }
  let props: any
  const component = registerComponent(
    'test',
    options,
    ctx => (props = ctx.props)
  )
  mountComponents()

  const el = document.getElementById('my-id') as SimpleElement<typeof component>
  expect(el.$props).toBe(props)
})

it(`exposes the component's setup function's return value`, () => {
  const exposed = { test: () => {} }
  const component = registerComponent('test', () => exposed)

  document.body.innerHTML = `
    <div data-simple-component="test" id="my-id"></div>
  `

  mountComponents(document.body)
  const el = document.getElementById('my-id') as SimpleElement<typeof component>
  expect(el.$component).toBe(exposed)
})
