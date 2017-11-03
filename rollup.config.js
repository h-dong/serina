import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/serina.ts',
  output: [{
    name: 'Serina',
    file: 'dist/serina.js',
    format: 'iife'
  }],
  plugins: [
    typescript()
  ]
}
