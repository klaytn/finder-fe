import { FC, ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { extractProp } from '../../../functions/Functions'

type RowProps = {
    title?: string
    marginBottom?: number
    marginTop?: number
}

export const OverviewRow: FC<RowProps> = ({ title = '', marginBottom = 0, marginTop = 0, children }) => {
    return (
        <Container marginBottom={marginBottom} marginTop={marginTop}>
            <TitleText>{title}</TitleText>
            {children}
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})<{ marginBottom: number; marginTop: number }>`
    align-items: center;
    margin-top: ${extractProp('marginTop')}px;
    margin-bottom: ${extractProp('marginBottom')}px;
    overflow: hidden;
    white-space: nowrap;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.blue[200],
    }),
)`
    white-space: nowrap;
    margin-right: 20px;
`

export const OverviewValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)<{ marginRight?: number }>`
    margin-right: ${({ marginRight = 0 }) => marginRight}px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export const OverviewDescText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[500],
    }),
)``

type OverviewFullRowProps = {
    children: ReactNode
    gap?: number
    marginBottom?: number
}

export const OverviewFullRow = ({ children, gap = 0, marginBottom = 0 }: OverviewFullRowProps) => {
    return (
        <OverviewFullRowContainer gap={gap} marginBottom={marginBottom}>
            {children}
        </OverviewFullRowContainer>
    )
}

const OverviewFullRowContainer = styled(Flex).attrs({
    direction: 'row',
})<{ gap: number; marginBottom: number }>`
    overflow: hidden;
    white-space: nowrap;
    gap: ${extractProp('gap')}px;
    margin-bottom: ${extractProp('marginBottom')}px;
`
