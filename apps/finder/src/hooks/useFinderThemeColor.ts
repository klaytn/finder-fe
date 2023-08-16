import { useFinderTheme } from '../context/finderThemeProvider'
import { getThemeColor } from '../functions/colorMap'
import { DeepStringOnly } from '../functions/type'

export const useFinderThemeColor = (color: string) => {
    const theme = useFinderTheme()
    return getThemeColor(color)(theme)
}

function deepTransform<Input extends Record<string, unknown>, Transformed>(
    target: Input,
    transform: (item: string) => Transformed,
): Input {
    const transformed = Object.entries(target).map(([key, value]) => {
        if (value === null) {
            return [key, value]
        }

        if (typeof value !== 'string' && typeof value !== 'object') {
            return [key, value]
        }

        if (typeof value === 'string') {
            return [key, transform(value)]
        }

        return [key, deepTransform(value as Record<string, unknown>, transform)]
    })

    return Object.fromEntries(transformed) as Input
}

export const useFinderThemeColorSet = <ColorSet>(colorSet: DeepStringOnly<ColorSet>) => {
    const theme = useFinderTheme()

    return deepTransform(colorSet, (color) => getThemeColor(color)(theme))
}
