import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/serina.ts',
  output: [{
    name: 'Serina',
    file: 'dist/serina.js',
    format: 'umd'
  }],
  plugins: [
    typescript(),
    resolve()
    // commonjs()
  ]
}
