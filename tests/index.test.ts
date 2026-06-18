import { expect, it, vi } from 'vitest'
import { component, define } from '../src'
import { instance, mount, unmount } from '../src/mount'

it('mounts a component', () => {
  const setup = vi.fn()
  component('test', setup)

  const div = document.createElement('div')
  div.dataset.component = 'test'

  mount(div)
  expect(setup).toHaveBeenCalledWith(
    expect.objectContaining({
      el: div,
      refs: {},
      refsAll: {},
      props: div.dataset,
      ComponentEvent: CustomEvent,
      signal: expect.any(AbortSignal),
      cleanup: expect.any(Function)
    })
  )
})

it('aborts signal when component is unmounted', () => {
  const div = document.createElement('div')
  div.dataset.component = 'signal-test'

  let componentSignal: AbortSignal
  component('signal-test', ({ signal }) => {
    componentSignal = signal
  })

  mount(div)
  expect(componentSignal!.aborted).toBe(false)

  unmount(div)
  expect(componentSignal!.aborted).toBe(true)
})

it('calls cleanup() when component is unmounted', () => {
  const div = document.createElement('div')
  div.dataset.component = 'cleanup-test'

  const cleanup = vi.fn()
  component('cleanup-test', ({ cleanup: onCleanup }) => {
    onCleanup(cleanup)
  })

  mount(div)
  expect(cleanup).not.toHaveBeenCalled()

  unmount(div)
  expect(cleanup).toHaveBeenCalledTimes(1)
})

it('mounts multiple components', () => {
  const componentA = vi.fn()
  component('a', componentA)

  const componentB = vi.fn()
  component('b', componentB)

  document.body.innerHTML = `
    <div data-component="a"></div>
    <div data-component="a"></div>
    <div data-component="b"></div>
  `
  mount(document.body)
  expect(componentA).toBeCalledTimes(2)
  expect(componentB).toBeCalledTimes(1)
})

it(`doesn't mount an already mounted component`, () => {
  const test = vi.fn()
  component('test', test)

  const div = document.createElement('div')
  div.dataset.component = 'test'

  mount(div)
  mount(div)

  expect(test).toBeCalledTimes(1)
})

it('provides a record of single refs', () => {
  const test = vi.fn()
  component('test', test)

  document.body.innerHTML = `
    <div data-component="test" id="my-test">
      <div id="ref1" data-ref="myRef"></div>
      <div data-component="another-component">
        <div data-ref="otherComponentsRef"></div>
        <div id="ref2" data-ref="test/deepRef"></div>
        <div id="ref3" data-ref="(#my-test)/selectorDeepRef"></div>
      </div>
    </div>
  `
  mount(document.body)
  const myRef = document.querySelector('#ref1')
  const deepRef = document.querySelector('#ref2')
  const selectorDeepRef = document.querySelector('#ref3')
  expect(test).toHaveBeenCalledWith(
    expect.objectContaining({ refs: { myRef, deepRef, selectorDeepRef } })
  )
})

it('provides a record of groups of refs with the same name', () => {
  const test = vi.fn()
  component('test', test)

  document.body.innerHTML = `
    <div data-component="test">
      <div id="ref1" data-ref="myRef"></div>
      <div id="ref2" data-ref="myRef"></div>
      <div id="ref3" data-ref="myRef"></div>
      <div data-component="another-component">
        <div id="ref4" data-ref="test/myRef"></div>
      </div>
    </div>
  `
  mount(document.body)
  const myRef = [
    document.querySelector('#ref1'),
    document.querySelector('#ref2'),
    document.querySelector('#ref3'),
    document.querySelector('#ref4')
  ]
  expect(test).toHaveBeenCalledWith(
    expect.objectContaining({ refsAll: { myRef } })
  )
})

it(`parses props`, () => {
  document.body.innerHTML = `
    <div
      data-component="test"
      data-number="1"
      data-string="text"
      data-bool="true"
      data-array="[1,2,3]"
      data-obj='{ "hello": "world" }'
    ></div>
  `

  const def = define({
    props: {
      number: Number,
      string: String,
      bool: Boolean,
      array: Array,
      obj: Object
    }
  })

  let props: any
  component('test', def, ctx => (props = ctx.props))
  mount()

  expect(props.number).toBe(1)
  expect(props.string).toBe('text')
  expect(props.bool).toBe(true)
  expect(props.array).toEqual([1, 2, 3])
  expect(props.obj).toEqual({ hello: 'world' })
})

it(`provides default values for props`, () => {
  document.body.innerHTML = `<div data-component="test"></div>`
  const el = document.querySelector('div')

  const def = define({
    props: {
      number: 10,
      string: 'hello',
      bool: true,
      array: () => [],
      obj: () => ({})
    }
  })

  let props: any
  component('test', def, ctx => (props = ctx.props))
  mount()

  expect(props.number).toBe(10)
  expect(props.string).toBe('hello')
  expect(props.bool).toBe(true)
  expect(props.array).toEqual([])
  expect(props.obj).toEqual({})
})

it(`adds default values to the dataset`, () => {
  document.body.innerHTML = `<div data-component="test" data-provided="provided"></div>`
  const el = document.querySelector('div')

  const def = define({
    props: {
      missing: 10,
      provided: 'default',
      ignore: Number
    }
  })

  component('test', def, () => {})
  mount()

  expect(el?.dataset.missing).toBe('10')
  expect(el?.dataset.provided).toBe('provided')
  expect(el?.dataset.ignore).toBe(undefined)
})

it('interferes prop types from default values', () => {
  document.body.innerHTML = `
    <div
      data-component="test"
      data-number="1"
      data-string="text"
      data-bool="true"
      data-array="[1,2,3]"
      data-obj='{ "hello": "world" }'
    ></div>
  `

  const def = define({
    props: {
      number: 42,
      string: 'default',
      bool: false,
      array: () => [],
      obj: () => ({})
    }
  })

  let props: any
  component('test', def, ctx => (props = ctx.props))
  mount()

  expect(props.number).toBe(1)
  expect(props.string).toBe('text')
  expect(props.bool).toBe(true)
  expect(props.array).toEqual([1, 2, 3])
  expect(props.obj).toEqual({ hello: 'world' })
})

it(`exposes the component's setup function's return value`, () => {
  const exposed = { test: () => {} }
  const Test = component('test', () => exposed)

  document.body.innerHTML = `
    <div data-component="test" id="my-id"></div>
  `

  mount(document.body)
  const el = document.getElementById('my-id')
  const test = instance(el!, Test)
  expect(test.$component).toBe(exposed)
})
