import { css, FlattenSimpleInterpolation } from 'styled-components'

const suitBase = css`
    font-family: 'SUIT';
    font-style: normal;
    letter-spacing: -0.0075em;
    font-feature-settings: 'tnum' on, 'lnum' on;
`

const volteBase = css`
    font-family: 'Volte';
    font-style: normal;
    letter-spacing: -0.0075em;
`

const codeBase = css`
    font-family: 'IBM Plex Mono';
    font-style: normal;
    letter-spacing: -0.0075em;
`

export type Typo = FlattenSimpleInterpolation

export type KeyofTypos = keyof typeof typos

const createTypo = (base: Typo, size: number, lineHeight: number, weight: number) => css`
    ${base}
    font-weight: ${weight};
    font-size: ${size}px;
    line-height: ${lineHeight}px;
`

export const typos = {
    suit: {
        '40.56_900': createTypo(suitBase, 40, 56, 700),
        '32.44_900': createTypo(suitBase, 32, 44, 700),
        '24.32_900': createTypo(suitBase, 24, 32, 700),
        '20.28_900': createTypo(suitBase, 20, 28, 700),
        '18.24_900': createTypo(suitBase, 18, 24, 700),
        '16.24_900': createTypo(suitBase, 16, 24, 700),
        '16.20_900': createTypo(suitBase, 16, 20, 700),
        '14.18_900': createTypo(suitBase, 14, 18, 700),
        '12.16_900': createTypo(suitBase, 12, 16, 700),
        '10.14_900': createTypo(suitBase, 10, 14, 700),
        '8.12_900': createTypo(suitBase, 8, 12, 700),
        '6.10_900': createTypo(suitBase, 6, 10, 700),

        '14.18_700': createTypo(suitBase, 14, 18, 700),

        '40.56_400': createTypo(suitBase, 40, 56, 400),
        '32.44_400': createTypo(suitBase, 32, 44, 400),
        '24.32_400': createTypo(suitBase, 24, 32, 400),
        '20.28_400': createTypo(suitBase, 20, 28, 400),
        '18.24_400': createTypo(suitBase, 18, 24, 400),
        '16.24_400': createTypo(suitBase, 16, 24, 400),
        '16.20_400': createTypo(suitBase, 16, 20, 400),
        '14.18_400': createTypo(suitBase, 14, 18, 400),
        '12.16_400': createTypo(suitBase, 12, 16, 400),
        '10.14_400': createTypo(suitBase, 10, 14, 400),
        '8.12_400': createTypo(suitBase, 8, 12, 400),
        '6.10_400': createTypo(suitBase, 6, 10, 400),
    },

    volte: {
        '40.56_900': createTypo(volteBase, 40, 56, 700),
        '32.44_900': createTypo(volteBase, 32, 44, 700),
        '24.32_900': createTypo(volteBase, 24, 32, 700),
        '20.28_900': createTypo(volteBase, 20, 28, 700),
        '18.24_900': createTypo(volteBase, 18, 24, 700),
        '16.20_900': createTypo(volteBase, 16, 20, 700),

        '40.56_400': createTypo(volteBase, 40, 56, 400),
        '32.44_400': createTypo(volteBase, 32, 44, 400),
        '24.32_400': createTypo(volteBase, 24, 32, 400),
        '20.28_400': createTypo(volteBase, 20, 28, 400),
        '18.24_400': createTypo(volteBase, 18, 24, 400),
        '16.20_400': createTypo(volteBase, 16, 20, 400),
    },

    code: {
        '16.20_400': createTypo(codeBase, 16, 20, 400),
        '14.18_400': createTypo(codeBase, 14, 18, 400),
        '12.16_400': createTypo(codeBase, 12, 16, 400),
        '10.14_400': createTypo(codeBase, 10, 14, 400),
    },
} as const
