import { build, BuildOptions } from 'esbuild'

import { cjsBuildOptions } from './buildOptions'

function watchAndPrint(label: string, buildOptions: BuildOptions) {
    build({
        ...buildOptions,
        minify: false,
        define: {
            'process.env.NODE_ENV': '"development"',
        },
        watch: {
            async onRebuild(error) {
                if (error) {
                    console.log(error)
                    return
                }

                console.log(`---[Rebuild ${label}]---`)
            },
        },
    })
    console.log(`watching for ${label}...`)
}

watchAndPrint('cjs', cjsBuildOptions)
