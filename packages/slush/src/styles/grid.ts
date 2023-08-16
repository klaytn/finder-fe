import { css } from 'styled-components'

export const gridLayout = (piecesInRow: number) => css`
    display: grid;
    grid-template-columns: ${Array.from({ length: piecesInRow }).fill('auto').join(' ')};
`
