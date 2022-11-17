import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
    },
    resolve: {
        alias: [
            { find: 'serina.schema', replacement: path.resolve(__dirname, 'src', 'serina.schema') },
            { find: 'utils', replacement: path.resolve(__dirname, 'src', 'utils') },
            { find: 'lib', replacement: path.resolve(__dirname, 'src', 'lib') },
        ],
    },
});
