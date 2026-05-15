import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      thresholds: {
        functions: 100,
        lines: 100,
      },
    },
  },
  resolve: {
    alias: [
      { find: 'serina', replacement: path.resolve(__dirname, 'src', 'index') },
      { find: 'locales', replacement: path.resolve(__dirname, 'src', 'locales') },
      { find: 'parsers', replacement: path.resolve(__dirname, 'src', 'parsers') },
      { find: 'patterns', replacement: path.resolve(__dirname, 'src', 'patterns') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src', 'utils') },
      { find: 'parser', replacement: path.resolve(__dirname, 'src', 'parser') },
      { find: 'types', replacement: path.resolve(__dirname, 'src', 'types') },
    ],
  },
});
