/* eslint-disable @typescript-eslint/no-explicit-any */

function defaultResolver<Args extends any[]>(...args: Args) {
    return args[0]
}

export const singletonResolver = () => 'SINGLETON_KEY'

export function memoize<Args extends any[], Result>(
    target: (...args: Args) => Result,
    resolver: (...args: Args) => any = defaultResolver,
) {
    const cache = new Map<any, Result>()

    const memoized = (...args: Args) => {
        const key = resolver(...args)
        const cachedResult = cache.get(key)

        if (cachedResult) {
            return cachedResult
        }

        const result = target(...args)
        cache.set(key, result)

        return result
    }

    return memoized
}
