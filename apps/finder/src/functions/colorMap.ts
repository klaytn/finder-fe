import { DefaultTheme } from 'styled-components'

import { withAlpha, colors, Theme } from '@klaytn/slush'

const withAlphaColorMap = {
    [withAlpha(colors.white, 5)]: withAlpha(colors.black[900], 3),
    [withAlpha(colors.white, 10)]: withAlpha(colors.black[900], 5),
    [withAlpha(colors.white, 20)]: withAlpha(colors.black[900], 10),
    [withAlpha(colors.white, 35)]: withAlpha(colors.black[900], 20),
    [withAlpha(colors.white, 50)]: withAlpha(colors.black[900], 35),
    [withAlpha(colors.white, 75)]: withAlpha(colors.black[900], 65),
    [withAlpha(colors.white, 90)]: withAlpha(colors.black[900], 85),
}

function getInvertColorMap<ColorMap extends Record<string, string>>(colorMap: ColorMap): ColorMap {
    const sortedEntries = Object.entries(colorMap).sort(([key1], [key2]) => (parseInt(key1) <= parseInt(key2) ? -1 : 1))
    const invertedEntries = [...sortedEntries].reverse().map(([, value], index) => [sortedEntries[index][1], value])

    return Object.fromEntries(invertedEntries)
}

const DARK_TO_LIGHT_COLOR_MAP: Record<string, string | undefined> = {
    ...getInvertColorMap(colors.black),
    ...getInvertColorMap(colors.blue),
    ...getInvertColorMap(colors.red),
    ...getInvertColorMap(colors.green),
    ...getInvertColorMap(colors.yellow),
    ...getInvertColorMap(colors.orange),
    ...withAlphaColorMap,
}

type GetThemeColorArgs = {
    theme: DefaultTheme
}

export const getThemeColor =
    <Props extends GetThemeColorArgs>(colorOrGetColor: string | ((props: Props) => string)) =>
    (props: Props) => {
        const color = typeof colorOrGetColor === 'function' ? colorOrGetColor(props) : colorOrGetColor

        if (props.theme.slush === Theme.dark) {
            return color
        }

        return DARK_TO_LIGHT_COLOR_MAP[color] || color
    }

export const getThemeColorOnAttrs =
    <Attrs extends Record<string, unknown>>(
        attrs: Attrs,
        defaultName: keyof Attrs = 'color',
        ...propNames: (keyof Attrs)[]
    ) =>
    <Props extends GetThemeColorArgs>(props: Props) => {
        const themedAttrs = Object.entries(attrs).map(([key, value]) => {
            if ([defaultName, ...propNames].includes(key as keyof Attrs) && typeof value === 'string') {
                return [key, getThemeColor(value)(props)]
            }

            return [key, value]
        })

        return Object.fromEntries(themedAttrs)
    }

export const extractThemeProp =
    <Props extends GetThemeColorArgs, Key extends keyof Props>(key: Key) =>
    (props: Props) =>
        getThemeColor(`${props[key]}`)(props)
