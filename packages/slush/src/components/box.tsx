import styled, { css, CSSProperties } from 'styled-components'

import { Color } from '../styles/colors'
import { Round, rounds } from '../styles/rounds'
import { shadows, Shadow } from '../styles/shadows'

type BoxProps = {
    shadow?: Shadow
    round?: Round
    backgroundColor?: Color
    width?: number | string
    height?: number | string
    padding?: CSSProperties['padding']
}

export const Box = styled.div<BoxProps>`
    ${({ shadow, round, backgroundColor, width, height, padding }) => css`
        ${shadow ? shadows[shadow] : ''}
        ${round ? rounds[round] : ''}
        background-color: ${backgroundColor};
        width: ${width !== undefined ? width + 'px' : undefined};
        height: ${height !== undefined ? height + 'px' : undefined};
        padding: ${padding};
    `}
`

type FlexProps = {
    direction?: CSSProperties['flexDirection']
    justifyContent?: CSSProperties['justifyContent']
}

export const Flex = styled(Box)<FlexProps>`
    display: flex;
    flex-direction: ${({ direction = 'column' }) => direction};
    justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
`
