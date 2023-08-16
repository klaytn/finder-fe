import { group, split } from './group'

describe('group', () => {
    it('should create arrays without empty arrays when divisible', () => {
        const INPUT = [1, 2, 3, 4]
        const SIZE = 2

        const result = group(INPUT, SIZE)

        expect(result.length).toBe(INPUT.length / SIZE)
    })
})

describe('split', () => {
    it('should evenly split all arrays when divisible', () => {
        const INPUT = [1, 2, 3, 4, 5, 6]
        const COUNT = 3
        const EXPECTED = [
            [1, 2],
            [3, 4],
            [5, 6],
        ]

        const result = split(INPUT, COUNT)

        expect(result).toEqual(EXPECTED)
    })

    it('should fill from the beginning when not evenly divisible', () => {
        const INPUT = [1, 2, 3, 4, 5, 6, 7]
        const COUNT = 3
        const EXPECTED = [
            [1, 2, 3],
            [4, 5],
            [6, 7],
        ]

        const result = split(INPUT, COUNT)

        expect(result).toEqual(EXPECTED)
    })

    it('should fill from the beginning when not evenly divisible #2', () => {
        const INPUT = [1, 2, 3, 4, 5, 6, 7, 8]
        const COUNT = 3
        const EXPECTED = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8],
        ]

        const result = split(INPUT, COUNT)

        expect(result).toEqual(EXPECTED)
    })
})
