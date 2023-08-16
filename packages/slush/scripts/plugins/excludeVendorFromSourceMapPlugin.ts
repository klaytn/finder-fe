import fs from 'fs'

import { Plugin } from 'esbuild'

export const excludeVendorFromSourceMapPlugin: Plugin = {
    name: 'excludeVendorFromSourceMap',
    setup(build) {
        build.onLoad({ filter: /node_modules/ }, (args) => {
            return {
                contents:
                    fs.readFileSync(args.path, 'utf8') +
                    '\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==',
                loader: 'default',
            }
        })
    },
}
