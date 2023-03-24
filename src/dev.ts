import { registerComponent, mountComponents } from '.'

const options = {
  props: { message: String, propWithDefault: 123 }
}

registerComponent('test', options, ({ props }) => {
  console.log(props.propWithDefault)
})

mountComponents()
