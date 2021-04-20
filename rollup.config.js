import { terser } from 'rollup-plugin-terser'
import fileSize from 'rollup-plugin-filesize'

const fileSizeOptions = { showMinifiedSize: false, showBrotliSize: true }

export default [
  {
    input: 'src/index.js',
    output: { file: 'dist/index.es.js', format: 'es' },
    plugins: [
      terser(),
      fileSize({ showMinifiedSize: false, showBrotliSize: true })
    ]
  }
]
