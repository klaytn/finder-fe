import { css } from 'styled-components'

const createRound = (radius: number) => css`
    border-radius: ${radius}px;
`

export const rounds = {
    20: createRound(20),
    18: createRound(18),
    16: createRound(16),
    14: createRound(14),
    12: createRound(12),
    11: createRound(11),
    10: createRound(10),
    8: createRound(8),
} as const

export type Round = keyof typeof rounds
