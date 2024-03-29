import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        coverage: {
            provider: 'istanbul',
        },
    },
    resolve: {
        alias: [
            { find: 'serina', replacement: path.resolve(__dirname, 'src', 'serina') },
            { find: 'serina.schema', replacement: path.resolve(__dirname, 'src', 'serina.schema') },
            { find: 'utils', replacement: path.resolve(__dirname, 'src', 'utils') },
            { find: 'filters', replacement: path.resolve(__dirname, 'src', 'filters') },
            { find: 'lib', replacement: path.resolve(__dirname, 'src', 'lib') },
        ],
    },
});
