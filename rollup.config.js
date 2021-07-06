import fileSize from 'rollup-plugin-filesize'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.es.js', format: 'es' },
    plugins: [
      esbuild({
        minify: process.env.NODE_ENV === 'production'
      }),
      fileSize({ showMinifiedSize: false, showBrotliSize: true })
    ]
  },
  {
    input: './src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]
