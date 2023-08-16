import { getKeys } from '../utils/common'

export type Color = string

export const colors = {
    white: '#FFFFFF',
    black: {
        0: '#FFFFFF',
        30: '#FAFAFA',
        50: '#F5F4F6',
        70: '#EDECEF',
        100: '#E5E3E8',
        200: '#DAD8DE',
        300: '#CBC8D0',
        400: '#B8B5C0',
        500: '#948E9F',
        600: '#706A7C',
        700: '#4A4554',
        800: '#3E3946',
        830: '#312E38',
        850: '#2A2730',
        870: '#232027',
        900: '#19171C',
    },
    blue: {
        100: '#F5F5FF',
        200: '#E6E5FF',
        300: '#CDCCFF',
        400: '#A5A3FF',
        500: '#7A70FF',
        600: '#5E47F5',
        700: '#511ED2',
        800: '#30167E',
        850: '#2A146B',
        900: '#2A1259',
    },
    red: {
        100: '#FFF4F5',
        200: '#FFE5E7',
        300: '#FFBDC0',
        400: '#FF8289',
        500: '#EB4C4C',
        600: '#D21414',
        700: '#A40912',
        800: '#690C12',
        850: '#540D11',
        900: '#380A0D',
    },
    green: {
        100: '#F0FAF4',
        200: '#DFF7E8',
        300: '#B5EDCA',
        400: '#72D99B',
        500: '#1AC679',
        600: '#04A062',
        700: '#067348',
        800: '#08482E',
        850: '#0A3826',
        900: '#062317',
    },
    yellow: {
        100: '#FFF7EA',
        200: '#FFECCC',
        300: '#FFDB9D',
        400: '#FFC45F',
        500: '#FFB12D',
        600: '#CE9415',
        700: '#916D08',
        800: '#4E3909',
        850: '#382C0A',
        900: '#2B2208',
    },
    orange: {
        100: '#FFF3EA',
        200: '#FFE1CC',
        300: '#FFC69D',
        400: '#FFA25F',
        500: '#FF852D',
        600: '#CE6215',
        700: '#914108',
        800: '#4E2609',
        850: '#381D0A',
        900: '#2B1708',
    },
} as const

export type ColorName = keyof typeof colors

export type ColorNameWithoutWhite = keyof Omit<typeof colors, 'white'>

function createColorMap() {
    const colorMap = new Map<Color, ColorName>()
    for (const colorName of getKeys(colors)) {
        if (colorName === 'white') {
            colorMap.set(colors.white, 'white')
            continue
        }

        const colorSet = colors[colorName]
        for (const colorGrade of getKeys(colorSet)) {
            const color = colorSet[colorGrade]
            colorMap.set(color, colorName)
        }
    }

    return colorMap
}

const colorMap = createColorMap()

export const getColorName = (color: Color) => {
    return colorMap.get(color)
}

const normalizeToHex = (normalizedNumber: number) => Math.round(normalizedNumber * 255)

export const percentageToHex = (percentage: number) =>
    normalizeToHex(percentage / 100)
        .toString(16)
        .padStart(2, '0')

export const withAlpha = (color: Color, alphaPercentage: number) => {
    const hexAlpha = percentageToHex(alphaPercentage)
    return `${color}${hexAlpha}`
}

export const hexToRgb = (color: Color, alpha?: number) => {
    const red = parseInt(color.slice(1, 3), 16)
    const green = parseInt(color.slice(3, 5), 16)
    const blue = parseInt(color.slice(5, 7), 16)

    return alpha !== undefined ? `rgba(${red}, ${green}, ${blue}, ${alpha})` : `rgb(${red}, ${green}, ${blue})`
}

type GradientColor = [Color, number]

export const linearGradient = (deg: number, colors: GradientColor[]): string => {
    return `linear-gradient(${deg}deg, ${colors.map(([color, point]) => `${color} ${point}%`).join(', ')})`
}
