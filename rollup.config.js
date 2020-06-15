import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import json from 'rollup-plugin-json'

const dontWarn = [
    'THIS_IS_UNDEFINED',
    'CIRCULAR_DEPENDENCY',
    'MISSING_EXPORT',
    'UNRESOLVED_IMPORT',
    'EVAL',
]
const onWarn = (msg, warn) => {
    if (~dontWarn.indexOf(msg.code)) {
        return
    }

    warn(msg)
}

export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'mele',
            file: pkg.browser,
            format: 'umd',
            sourcemap: true,
            globals: {
                bip32: 'bip32',
                bip39: 'bip39',
            },
        },
        external: ['bip32', 'bip39'],
        onwarn: onWarn,
        plugins: [
            builtins(),
            globals(),
            json(),
            commonjs({
                namedExports: {
                    'node_modules/elliptic/lib/elliptic.js': ['ec'],
                },
            }),
            resolve({
                browser: true,
            }),
            typescript({
                tsconfig: 'tsconfig.json',
            }),
        ],
    },
    {
        input: 'src/index.ts',
        external: Object.keys(pkg.dependencies),
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            },
        ],
        onwarn: onWarn,
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                tsconfig: 'tsconfig.json',
            }),
        ],
    },
]