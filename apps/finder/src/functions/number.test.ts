import { getEllipsisString } from './number'

describe('number functions', () => {
    it.each([
        ['445.995000000', 10, '⋯'],
        ['445.995000000', 20, '4⋯'],
        ['445.995000000', 31, '44⋯'],
        ['445.995000000', 33, '445⋯'],
        ['445.995000000', 40, '445.⋯'],
        ['445.995000000', 50, '445.9⋯'],
        ['445.995000000', 60, '445.99⋯'],
        ['445.995000000', 100, '445.9950000⋯'],
        ['445.995000000', 108, '445.995000000'],
    ])('getEllipsisString - %s, %s', (str, width, expects) => {
        const { result } = getEllipsisString(str, width)
        expect(result).toBe(expects)
    })
})
