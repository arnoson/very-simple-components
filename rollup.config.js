import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import fileSize from 'rollup-plugin-filesize'

const fileSizeOptions = { showMinifiedSize: false, showBrotliSize: true }

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.es.js',
      format: 'es'
    },
    plugins: [terser(), fileSize(fileSizeOptions)]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.iife.js',
      format: 'iife',
      name: 'very'
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
      terser(),
      fileSize(fileSizeOptions)
    ]
  }
]
