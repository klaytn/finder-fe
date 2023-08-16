import { analyzeMetafile, build, BuildOptions } from 'esbuild'

import { cjsBuildOptions } from './buildOptions'

async function buildAndPrint(label: string, buildOptions: BuildOptions) {
    const { metafile } = await build({
        ...buildOptions,
        define: {
            'process.env.NODE_ENV': '"production"',
        },
    })
    if (metafile) {
        const analyzeResult = await analyzeMetafile(metafile)
        console.log(`---[Build ${label}]---`)
        console.log(analyzeResult)
    }
}

buildAndPrint('cjs', cjsBuildOptions)
