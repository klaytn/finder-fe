import { css } from 'styled-components'

export const gap = (input: number | string, direction: 'row' | 'column' = 'row') => {
    const fixedInput = typeof input === 'number' ? `${input}px` : input

    if (direction === 'row') {
        return css`
            gap: ${fixedInput};
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
                & > :not(:last-child) {
                    margin-right: ${fixedInput};
                }
            }
        `
    } else {
        return css`
            gap: ${fixedInput};
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
                & > :not(:last-child) {
                    margin-bottom: ${fixedInput};
                }
            }
        `
    }
}
