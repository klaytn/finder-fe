import { getFixedLengthNumber, klay, withCommas } from './Functions'

describe('functions', () => {
    test.each([
        { input: 10_000, expected: '10,000' },
        { input: 5_000_000_000, expected: '5,000,000,000' },
    ])('withCommas - $expected', ({ input, expected }) => {
        const result = withCommas(input)
        expect(result).toBe(expected)
    })

    test.each([
        { input: '10000', expected: '10,000.000000000' },
        { input: '10000', length: 9, expected: '10,000.00' },
        { input: '5000000000', length: 14, expected: '5,000,000,000' },
        { input: '500000000', length: 14, expected: '500,000,000.00' },
        { input: '-1.9342', length: 6, expected: '-1.934' },
        { input: '-102411414.9342', length: 15, expected: '-102,411,414.93' },
    ])('klay - $expected', ({ input, length, expected }) => {
        const result = klay(input, length)
        expect(result).toBe(expected)
    })

    test.each([
        {
            input: '10000',
            expected: '10000.000000000',
        },
        {
            input: '10000',
            fractionLength: 4,
            expected: '10000.0000',
        },
        {
            input: '10000000000000000000000',
            expected: '10000000000000000000000.000000000',
        },
    ])('getFixedLengthNumber - $expected', ({ input, fractionLength, expected }) => {
        const result = getFixedLengthNumber(input, fractionLength)
        expect(result).toBe(expected)
    })
})
