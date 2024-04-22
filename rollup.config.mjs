import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
// const license = require('rollup-plugin-license');
import license from 'rollup-plugin-license';

// const { banner } = pkg
// const license = `
// /**
//  * @Rabbitor/radix
//  * (c) 2024 Rabbitor
//  * Released under the MIT License.
//  */
// `
export default {
  input: 'index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [json(), typescript(), terser(), license({
    banner: {
      content: `
        MIT License
        Author: Rabbitor
        @Rabbitor/radix v1.0.0
      `
    }
  })]
}
