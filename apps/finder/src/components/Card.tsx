import { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

import { colors, If, typos, withAlpha } from '@klaytn/slush'

import { getThemeColor } from '../functions/colorMap'

type ChildrenProps = {
    children: ReactNode
}

const Card = ({
    children,
    condition,
    margin,
}: ChildrenProps & { condition: boolean; margin?: CSSProperties['margin'] }) => {
    return (
        <If condition={condition}>
            <CardContainer margin={margin}>{children}</CardContainer>
        </If>
    )
}

const CardTitle = ({ children }: ChildrenProps) => {
    return <Title>{children}</Title>
}

const CardContent = ({ children, height = 'auto' }: ChildrenProps & { height?: number | string }) => {
    return <Content height={height}>{children}</Content>
}

const Content = styled.div<{ height: number | string }>`
    ${typos.code['12.16_400']}
    color: ${getThemeColor(colors.black[400])};
    height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
    overflow-y: auto;
    word-break: break-all;
`

const Title = styled.div`
    ${typos.suit['14.18_900']}
    color: ${getThemeColor(colors.blue[300])};
    margin-bottom: 20px;
`

const CardContainer = styled.div<{
    margin?: CSSProperties['margin']
}>`
    padding: 24px 36px 24px 36px;
    margin: ${({ margin }) => (typeof margin !== 'undefined' ? margin : '32px 0 0 0')};
    background: ${getThemeColor(withAlpha(colors.white, 5))};
    border-radius: 30px;
`

Card.Title = CardTitle
Card.Content = CardContent

export default Card
