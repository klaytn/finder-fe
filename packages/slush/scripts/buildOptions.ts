import { BuildOptions } from 'esbuild'
import { dtsPlugin } from 'esbuild-plugin-d.ts'

// eslint-disable-next-line import-alias/import-alias
import { peerDependencies } from '../package.json'
import { excludeVendorFromSourceMapPlugin } from './plugins/excludeVendorFromSourceMapPlugin'

const sharedOptions: BuildOptions = {
    bundle: true,
    entryPoints: ['src/index.ts'],
    external: Object.keys(peerDependencies),
    minify: true,
    sourcemap: false,
    metafile: true,
    color: true,
    target: ['esnext'],
    inject: ['./src/react-shim.ts'],
    treeShaking: true,
    plugins: [excludeVendorFromSourceMapPlugin],
}

export const emsBuildOptions: BuildOptions = {
    ...sharedOptions,
    format: 'esm',
    splitting: true,
    outdir: './dist/esm',
}

export const cjsBuildOptions: BuildOptions = {
    ...sharedOptions,
    format: 'cjs',
    outfile: './dist/cjs/index.js',
    plugins: [
        excludeVendorFromSourceMapPlugin,
        dtsPlugin({
            outDir: './dist/type',
        }),
    ],
}
