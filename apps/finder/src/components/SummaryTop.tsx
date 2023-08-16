import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Divider, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../functions/colorMap'
import { extractProp } from '../functions/Functions'

type SummaryTopProps = {
    children: ReactNode
    divider?: boolean
    gap?: number
}

export const SummaryTop = ({ children, gap = 0, divider = false }: SummaryTopProps) => {
    return (
        <>
            <SummaryTopContainer gap={gap}>{children}</SummaryTopContainer>
            {divider && <Divider />}
        </>
    )
}

const SummaryTopContainer = styled(Flex).attrs({
    direction: 'column',
})<{ gap: number }>`
    margin-bottom: 32px;
    gap: ${extractProp('gap')}px;
`

type SummaryTopRowProps = {
    title: ReactNode
    titleWidth: number
    children: ReactNode
    alignItems?: CSSProperties['alignItems']
    marginTop?: number
    justifyContent?: CSSProperties['justifyContent']
    decorator?: ReactNode
}

export const SummaryTopRow = ({
    title,
    titleWidth,
    children,
    alignItems = 'center',
    marginTop = 0,
    justifyContent,
    decorator,
}: SummaryTopRowProps) => {
    return (
        <RowContainer alignItems={alignItems} marginTop={marginTop} justifyContent={justifyContent}>
            <RowTitleText width={titleWidth}>{title}</RowTitleText>
            <RowValueText>{children}</RowValueText>
            {decorator}
        </RowContainer>
    )
}

const RowContainer = styled(Flex).attrs({
    direction: 'row',
})<{ alignItems: CSSProperties['alignItems']; marginTop: number }>`
    align-items: ${extractProp('alignItems')};
    width: 100%;
    margin-top: ${extractProp('marginTop')}px;
`

const RowTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.20_900'],
        color: colors.blue[200],
    }),
)<{ width: number }>`
    width: ${extractProp('width')}px;
    flex-shrink: 0;
`

const RowValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.20_400'],
        color: colors.white,
    }),
)`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`
