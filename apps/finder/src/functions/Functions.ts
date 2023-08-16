import BigNumber from 'bignumber.js'

import { colors } from '@klaytn/slush'

export const withCommas = (value: number | string | BigNumber) => {
    const strValue = value.toString()
    const [integer, decimal] = strValue.split('.')
    return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (decimal ? `.${decimal}` : '')
}

const FLOAT_LENGTH = 9
export const getFixedLengthNumber = (value: string | number, fractionLength = FLOAT_LENGTH) => {
    const bigNumber = new BigNumber(value)
    if (bigNumber.isNaN()) {
        return (0).toFixed(fractionLength)
    }

    return bigNumber.toFixed(fractionLength)
}

export const getFixedLengthWithCommasNumber = (value: string, fractionLength: number) => {
    const fixedValue = getFixedLengthNumber(value, fractionLength)
    const [integer, fraction] = fixedValue.split('.')
    return withCommas(integer) + (fraction !== undefined ? `.${fraction}` : '')
}

export const klay = (value: number | string | BigNumber = 0, length?: number, fractionLength?: number) => {
    const fixedLengthValue = getFixedLengthNumber(value.toString(), fractionLength)

    const [integer, fraction] = fixedLengthValue.split('.')

    const integerWithComas = withCommas(integer)

    if (length === undefined) {
        return `${integerWithComas}.${fraction}`
    } else {
        const integerLength = integerWithComas.length
        if (integerLength >= length - 1) {
            return integerWithComas
        }

        const remainLength = length - integerLength - 1 // need to subtract the number of dots, so -1
        const alignedFraction = fraction.padEnd(remainLength, '0').slice(0, remainLength)
        return `${integerWithComas}.${alignedFraction}`
    }
}

export const toKlay = (value: number | string | BigNumber, length?: number) => {
    const klayStr = klay(value, length)

    const [integer, fraction] = klayStr.split('.')
    return {
        integer,
        fraction: fraction as string | undefined,
        isZero: new BigNumber(`${integer}.${fraction || 0}`).isZero(),
    }
}

export const dollar = (value: string) => getFixedLengthWithCommasNumber(value, 2)

export const toKMG = (value: number) => {
    const k = Math.trunc(value / 1000)
    const m = Math.trunc(k / 1000)

    if (m > 0) {
        return withCommas(m) + ' M'
    }

    return withCommas(k) + ' K'
}

export const timesAgo = (datetime: string | Date, current: number, style: 'abbr' | 'full' | 'short' = 'abbr') => {
    const date = typeof datetime === 'string' ? Date.parse(datetime) : +datetime
    const timeInSec = Math.trunc((current - date) / 1000)
    const timeInMin = Math.trunc(timeInSec / 60)
    const timeInHour = Math.trunc(timeInMin / 60)
    const timeInDay = Math.trunc(timeInHour / 24)
    const timeInYear = Math.trunc(timeInDay / 365)

    let result = ''

    if (timeInYear > 0) {
        result = `${timeInYear} year${timeInYear === 1 ? '' : 's'} ago`
    } else if (timeInDay > 0) {
        result = timeInDay + ' day' + (timeInDay === 1 ? '' : 's') + ' ago'
    } else if (timeInHour > 0) {
        result = timeInHour + ' hour' + (timeInHour === 1 ? '' : 's') + ' ago'
    } else if (timeInMin > 0) {
        result =
            timeInMin +
            (style === 'abbr'
                ? ' min' + (timeInMin === 1 ? '' : 's') + ' ago'
                : ' minute' + (timeInMin === 1 ? '' : 's') + ' ago')
    } else if (timeInSec > 0) {
        result =
            timeInSec +
            (style === 'abbr'
                ? ' sec' + (timeInSec === 1 ? '' : 's') + ' ago'
                : ' second' + (timeInSec === 1 ? '' : 's') + ' ago')
    }

    if (result) {
        return style !== 'short' ? result : /([0-9]+ [a-z])/.exec(result)?.[0] || result
    } else {
        return 'now'
    }
}

export const formatDatetime = (datetime: string | Date) => {
    const date = datetime instanceof Date ? datetime : new Date(Date.parse(datetime))
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Jan 26, 2022 22:14:12 / UTC+9
    return date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short',
        timeZone: timezone,
    })
}

const TRANSACTION_TYPE_MAP = new Map<string, string>([
    ['Fee Delegated Account Update', 'Fee...Account Update'],
    ['Fee Delegated Account Update With Ratio', 'Fee...Account Update w/ratio'],
    ['Fee Delegated Cancel With Ratio', 'Fee...Cancel With Ratio'],
    ['Fee Delegated Smart Contract Deploy', 'Fee...Smart Contract Deploy'],
    ['Fee Delegated Smart Contract Deploy With Ratio', 'Fee...Contract Deploy...w/ratio'],
    ['Fee Delegated Smart Contract Execution', 'Fee...Smart Contract Execu...'],
    ['Fee Delegated Smart Contract Execution With Ratio', 'Fee...Contract Execu...w/ratio'],
    ['Fee Delegated Chain Data Anchoring', 'Fee...Chain Data Anchoring'],
    ['Fee Delegated Chain Data Anchoring With Ratio', 'Fee...Chain Data...w/ratio'],
    ['Fee Delegated Value Transfer', 'Fee...Value Transfer'],
    ['Fee Delegated Value Transfer With Ratio', 'Fee...Value Transfer w/ratio'],
    ['Fee Delegated Value Transfer Memo', 'Fee...Value Transfer Memo'],
    ['Fee Delegated Value Transfer Memo With Ratio', 'Fee...Transfer Memo w/ratio'],
])
export const transactionType = (type: string) => {
    return TRANSACTION_TYPE_MAP.get(type) || type
}

export const dispChainDiff = (diff: number) => {
    if (isNaN(diff)) {
        return 'Server error'
    }

    if (diff > 1000 * 60 * 60) {
        const hour = Math.trunc(diff / (1000 * 60 * 60))
        return hour + ' h ' + Math.trunc((diff - hour * 1000 * 60 * 60) / (1000 * 60)) + ' m'
    }

    if (diff > 1000 * 60) {
        const minute = Math.trunc(diff / (1000 * 60))
        return minute + ' m ' + Math.trunc((diff - minute * 1000 * 60) / 1000) + ' s'
    }

    return diff / 1000 + ' s'
}

export const calculateChainStatus = (diff: number) => {
    if (diff >= 10000 || isNaN(diff)) {
        return { status: 'Not Healthy', color: colors.red[500], icon: '🥀' }
    }

    if (diff >= 5000) {
        return { status: 'Not Good', color: colors.yellow[500], icon: '🍂' }
    }

    return { status: 'Healthy', color: colors.green[500], icon: '🌱' }
}

const EMPTY_VALUES: unknown[] = [null, undefined, '']
export function filterEmptyValue<T extends object>(obj: T) {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => {
            if (EMPTY_VALUES.includes(value)) {
                return false
            }

            if (Array.isArray(value) && value.length === 0) {
                return false
            }

            return true
        }),
    )
}

export function assetExist<T>(target?: T | null): asserts target is T {
    if (target === undefined || target === null) {
        throw new Error('not exist')
    }
}

export function isAddress(target: string) {
    return /0x[0-9a-zA-Z]+/.test(target)
}

export const copy = (value: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.style.top = '0'
    textarea.style.left = '0'
    textarea.style.position = 'fixed'

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
}

export const extractProp =
    <Props, Key extends keyof Props>(key: Key) =>
    (props: Props) =>
        props[key]

export const getMethodName = (signature?: string, methodId?: string) => {
    if (signature) {
        const [, methodName] = /^([^(]+)/.exec(signature) || []
        return methodName || ''
    }

    return methodId || ''
}

export function filterExist<T>(item: T | undefined | null): boolean {
    return !!item
}

export function createVoIfExist<RawData, VO, ExtraParams extends unknown[] = []>(
    rawData: RawData,
    VOClass: { new (rawData: RawData, ...extraParams: ExtraParams): VO },
    ...extraParams: ExtraParams
): VO
export function createVoIfExist<RawData, VO, ExtraParams extends unknown[] = []>(
    rawData: RawData | undefined,
    VOClass: { new (rawData: RawData, ...extraParams: ExtraParams): VO },
    ...extraParams: ExtraParams
): VO | undefined
export function createVoIfExist<RawData, VO, ExtraParams extends unknown[] = []>(
    rawData: RawData | undefined,
    VOClass: { new (rawData: RawData, ...extraParams: ExtraParams): VO },
    ...extraParams: ExtraParams
) {
    if (rawData !== undefined) {
        return new VOClass(rawData, ...extraParams)
    }
}

/**
 * Return the index of a number when only one of the input numeric values is greater than 0.
 * Returns -1 if there is at least one value greater than 0 or none
 */
export const findUniquePositiveNumber = (...arrayOfNumber: number[]) => {
    const sumOfNumber = arrayOfNumber.reduce((prevResult, n) => prevResult + n, 0)
    if (sumOfNumber === 0) {
        return -1
    }

    return arrayOfNumber.findIndex((n) => n === sumOfNumber)
}
