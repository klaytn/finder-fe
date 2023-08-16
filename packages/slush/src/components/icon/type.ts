import { CSSProperties } from 'react'
import styled from 'styled-components'

export type IconProps = {
    size: CSSProperties['fontSize']
    color?: CSSProperties['color']
    useOuterColor?: boolean
}

export const IconSvg = styled.svg<{
    fill?: CSSProperties['color']
    stroke?: CSSProperties['color']
    useOuterColor?: boolean
}>`
    fill: ${({ useOuterColor, fill }) => (useOuterColor ? 'inherit' : fill)} !important;
    stroke: ${({ useOuterColor, stroke }) => (useOuterColor ? 'inherit' : stroke)} !important;
`
