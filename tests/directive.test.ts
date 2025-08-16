import { expect, it, vi } from 'vitest'
import { registerDirective } from '../src/directive'
import { mount, mountDirectives } from '../src/mount'

it('mounts a directive', () => {
  const setup = vi.fn()
  registerDirective('test', setup)

  const div = document.createElement('div')
  div.dataset.simpleDirective = 'test'
  div.dataset.simpleComponent = 'test'

  mountDirectives(div)
  expect(setup).toBeCalledWith({
    el: div,
    modifiers: {}
  })
})

it('mounts directives on all elements', () => {
  const directiveA = vi.fn()
  registerDirective('a', directiveA)

  const directiveB = vi.fn()
  registerDirective('b', directiveB)

  document.body.innerHTML = `
      <div data-simple-directive="a"></div>
      <div data-simple-directive="a"></div>
      <div data-simple-directive="b"></div>
    `
  mount(document.body)
  expect(directiveA).toBeCalledTimes(2)
  expect(directiveB).toBeCalledTimes(1)
})

it(`doesn't re-mount a directive`, () => {
  const directive = vi.fn()
  registerDirective('test', directive)

  const div = document.createElement('div')
  div.dataset.simpleDirective = 'test'

  mountDirectives(div)
  mountDirectives(div)

  expect(directive).toBeCalledTimes(1)
})
