import { css } from 'styled-components'

import { colors, withAlpha } from './colors'

const createShadow = (color: string) => css`
    box-shadow: 0px 8px 20px ${color};
`

export const shadows = {
    'black.900.40%': createShadow(withAlpha(colors.black[900], 40)),
    'black.900.10%': createShadow(withAlpha(colors.black[900], 10)),
    'blue.600.15%': createShadow(withAlpha(colors.blue[600], 15)),
    'red.600.15%': createShadow(withAlpha(colors.red[600], 15)),
    'green.600.15%': createShadow(withAlpha(colors.green[600], 15)),
    'yellow.600.15%': createShadow(withAlpha(colors.yellow[600], 15)),
} as const

export type Shadow = keyof typeof shadows

export const neumorphism = {
    black1: css`
        box-shadow: 6px 6px 28px 4px rgba(25, 23, 28, 0.45), -6px -6px 20px rgba(62, 57, 70, 0.65),
            inset -2px -2px 8px rgba(25, 23, 28, 0.58), inset 2px 2px 8px rgba(62, 57, 70, 0.5);
    `,

    black2: css`
        box-shadow: 6px 6px 12px 4px #19171c, -3px -3px 8px rgba(49, 46, 56, 0.35),
            inset 2px 2px 2px rgba(49, 46, 56, 0.35);
    `,

    white1: css`
        box-shadow: -6px -6px 20px 4px rgba(255, 255, 255, 0.65), 6px 6px 20px rgba(25, 23, 28, 0.06),
            inset -2px -2px 8px rgba(49, 46, 56, 0.05), inset 2px 2px 6px rgba(255, 255, 255, 0.75);
    `,
}
