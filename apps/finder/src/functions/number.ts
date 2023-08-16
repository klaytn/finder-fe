const CHAR_WIDTH = 8.44
const DOT_WIDTH = 3
const ELLIPSIS_CHAR = '⋯'

type getEllipsisStringOptions = {
    charWidth?: number
    dotWidth?: number
    ellipsisChar?: string
    noEllipsis?: boolean
}

export const getEllipsisString = (
    numberString: string,
    containerWidth: number,
    {
        charWidth = CHAR_WIDTH,
        dotWidth = DOT_WIDTH,
        ellipsisChar = ELLIPSIS_CHAR,
        noEllipsis = false,
    }: getEllipsisStringOptions = {},
) => {
    let resultWidth = 0
    let result = ''
    let isEllipsis = false

    for (const char of numberString) {
        if (noEllipsis) {
            result += char
            continue
        }

        if (char === '.') {
            resultWidth += dotWidth
        } else {
            resultWidth += charWidth
        }

        if (resultWidth <= containerWidth - dotWidth) {
            result += char
        } else {
            isEllipsis = true
            result = result.slice(0, result.length - 1) + ellipsisChar
            break
        }
    }

    const [integer, fraction] = result.split('.')
    const hasFraction = fraction !== undefined
    const isZero = integer === '0'
    const isZeroFraction = hasFraction && +fraction.replace(ellipsisChar, '') === 0

    return {
        result,
        integer,
        fraction: fraction as string | undefined,
        hasFraction,
        isZero,
        isZeroFraction,
        isEllipsis,
        ellipsisChar,
    }
}

export type StringEllipsisResult = ReturnType<typeof getEllipsisString>

export const DEFAULT_STRING_ELLIPSIS_RESULT: StringEllipsisResult = {
    integer: '0',
    fraction: undefined,
    ellipsisChar: ELLIPSIS_CHAR,
    hasFraction: false,
    isEllipsis: false,
    isZero: true,
    isZeroFraction: true,
    result: '0',
}
