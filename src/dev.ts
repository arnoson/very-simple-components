import { registerComponent, mountComponents } from '.'

const options = {
  props: {
    number: 42,
    string: 'default',
    bool: false,
    array: () => [],
    obj: () => ({})
  }
}

registerComponent('test', options, ({ el, props }) => {
  console.log(props.bool, el.dataset.bool)
})

mountComponents()
