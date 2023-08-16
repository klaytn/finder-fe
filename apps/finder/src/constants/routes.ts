export const ROUTES = {
    HOME: '/',
    MY: '/my',
    BLOCK: {
        LIST: '/blocks',
        GENESIS: '/block/0',
        DETAIL: '/block/:blockId',
    },
    TX: {
        LIST: '/txs',
        DETAIL: '/tx/:txHash',
        SIMPLE: '/tx/:txHash/simple',
    },
    TOKEN: {
        LIST: '/tokens',
        DETAIL: '/token/:address',
    },
    NFT: {
        LIST: '/nfts',
        DETAIL: '/nft/:address',
        DETAIL_TOKEN: '/nft/:address/:tokenId',
    },
    ACCOUNT: {
        REDIRECT: '/address/:address',
        DETAIL: '/account/:address',
    },
    SEARCH: '/search',
    CONTRACT: {
        INPUT: '/contracts',
        DONE: '/contract/done/:result',
    },
    ERROR: {
        UNKNOWN: '/error',
        NOT_FOUND: '/notfound',
        MAINTENANCE: '/maintenance',
    },
} as const

const PATH_TO_TITLE_MAP = (() => {
    const result = new Map<string, string>()
    for (const [title, path] of Object.entries(ROUTES)) {
        if (typeof path === 'string') {
            result.set(path, title)
            continue
        }

        for (const [subtitle, subpath] of Object.entries(path)) {
            result.set(subpath, `${title}.${subtitle}`)
        }
    }

    return result
})()

const getRegFromPath = (path: string) => {
    return new RegExp(path.replace(/\/:[a-zA-Z0-9-_]+/g, '/[^/]+') + '$')
}

const REG_TO_PATH_LIST = (() => {
    const result: [RegExp, string][] = []

    for (const [title, path] of Object.entries(ROUTES)) {
        if (typeof path === 'string') {
            result.push([getRegFromPath(path), title])
            continue
        }

        for (const [subtitle, subpath] of Object.entries(path)) {
            result.push([getRegFromPath(subpath), `${title}.${subtitle}`])
        }
    }

    return result.sort(([, path1], [, path2]) => path2.length - path1.length)
})()

export function getRouteFromPath(path: string) {
    const simpleRoute = PATH_TO_TITLE_MAP.get(path)
    if (simpleRoute) {
        return simpleRoute
    }

    for (const [reg, route] of REG_TO_PATH_LIST) {
        if (reg.test(path)) {
            return route
        }
    }

    return path
}
