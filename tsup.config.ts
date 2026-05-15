import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    serina: 'src/index.ts',
  },
  format: ['esm'],
  dts: true,
  tsconfig: 'tsconfig.build.json',
  clean: !options.watch,
  sourcemap: true,
  splitting: false,
  outExtension({ format }) {
    if (format === 'esm') return { js: '.module.js' };
    return { js: '.js' };
  },
}));
