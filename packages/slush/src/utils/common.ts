/**
 * Empty function that do nothing
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (..._unusedArgs: unknown[]) => {
    // do nothing
}

export function getKeys<T>(obj: T): (keyof T)[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(obj) as any
}

/**
 * Wait a given number of milliseconds
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const randomString = (length: number) => {
    let result = ''
    const charactersLength = CHARACTERS.length

    for (let i = 0; i < length; i++) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}

const UNIQUE_ID_MAP: Record<string, boolean> = {}
const MAX_GENERATE_COUNT = 1000
type GetUniqueIdArgs = {
    prefix?: string
    length?: number
}
export const getUniqueId = ({ prefix = '', length = 10 }: GetUniqueIdArgs = {}) => {
    if (length <= prefix.length) {
        throw new Error('length is equal to or shorter than prefix.length.')
    }

    let result = ''
    let count = 0
    do {
        if (count > MAX_GENERATE_COUNT) {
            throw new Error('Unable to generate a unique ID, please try increasing the length.')
        }
        result = prefix + randomString(length - prefix.length)
        count++
    } while (UNIQUE_ID_MAP[result])

    UNIQUE_ID_MAP[result] = true

    const release = () => {
        delete UNIQUE_ID_MAP[result]
    }
    return {
        id: result,
        release,
    }
}

type WithRetryParams<Args extends unknown[]> = {
    targetFn(...args: Args): void
    checkNeedRetry(): boolean
    retryCount: number
    retryIntervalMs: number
}

export const withRetry = <Args extends unknown[]>({
    targetFn,
    checkNeedRetry,
    retryCount,
    retryIntervalMs,
}: WithRetryParams<Args>) => {
    let currentRetryCount = 0

    const resultFn = (...args: Args) => {
        if (checkNeedRetry() && currentRetryCount < retryCount) {
            currentRetryCount++
            setTimeout(() => resultFn(...args), retryIntervalMs)
            return
        }

        targetFn(...args)
    }

    return resultFn
}
