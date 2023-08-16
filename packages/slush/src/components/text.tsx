import styled from 'styled-components'

import { colors } from '../styles/colors'
import { Typo, typos } from '../styles/typos'

type TextProps = {
    color?: string
    typo?: Typo
}

export const Text = styled.span<TextProps>`
    ${({ typo }) => typo || typos.suit['12.16_400']}
    color: ${({ color }) => color || colors.black[900]};
`
