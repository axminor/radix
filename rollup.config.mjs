import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [typescript(), json()]
}
