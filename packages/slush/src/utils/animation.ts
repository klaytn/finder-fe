import { css } from 'styled-components'

const setAnimations = (...cssProperties: string[]) =>
    cssProperties.map((cssProperty) => `${cssProperty} 200ms ease`).join(', ')

export const setTransition = (...cssProperties: string[]) => css`
    transition: ${setAnimations(...cssProperties)};
`
