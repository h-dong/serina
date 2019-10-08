import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const defaults = { compilerOptions: { declaration: true } };

export default [
    {
        input: 'src/serina.ts',
        external: ['luxon'],
        plugins: [
            typescript({
                tsconfigDefaults: defaults,
                tsconfig: "tsconfig.json",
                tsconfigOverride: { compilerOptions: { declaration: false } }
            }),
            terser()
        ],
        output: {
            globals: { 'luxon': 'luxon' },
            file: 'dist/umd/serina.min.js',
            format: 'umd',
            name: 'serina',
            sourcemap: true,
            esModule: false
        }
    },
    {
        input: 'src/serina.ts',
        external: ['luxon'],
        plugins: [
            typescript({
                tsconfigDefaults: defaults,
                tsconfig: "tsconfig.json",
                tsconfigOverride: {}
            })
        ],
        output: [
            { dir: 'dist/esm', format: 'esm' },
            { dir: 'dist/cjs', format: 'cjs' }
        ]
    }
];
