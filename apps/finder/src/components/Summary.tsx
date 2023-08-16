import { Children, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { colors, filterChildComponent, findChildComponent, neumorphism, Text, Theme, typos } from '@klaytn/slush'

import { Layout } from '../constants/layout'
import { useResources } from '../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../functions/colorMap'
import { extractProp } from '../functions/Functions'
import { SummaryTop } from './SummaryTop'

type SummaryProps = {
    width: number
    children: ReactNode
}

const Summary = ({ width, children }: SummaryProps) => {
    return <SummaryWrapper width={width}>{children}</SummaryWrapper>
}

const SummaryWrapper = styled.div<{ width: number }>`
    display: flex;
    flex-direction: column;
    width: ${extractProp('width')}px;
    gap: 16px;
`

export default Summary

type SummaryContainerProps = {
    children: ReactNode
}
export const SummaryContainer = ({ children }: SummaryContainerProps) => {
    const childList = Children.toArray(children)
    const summaryTop = childList.find(findChildComponent(SummaryTop))
    const restChildren = childList.filter(filterChildComponent(SummaryTop))

    return (
        <SummaryContainerWrapper>
            {summaryTop}
            <SummaryInnerContainer>{restChildren}</SummaryInnerContainer>
        </SummaryContainerWrapper>
    )
}

export const SummaryContainerWrapper = styled.div`
    width: ${Layout.innerWidth}px;
    transform: translateX(-40px);
    margin-top: 32px;
    background: ${getThemeColor(colors.black[850])};
    border-radius: 30px;
    ${({ theme }) => (theme.slush === Theme.dark ? neumorphism.black1 : neumorphism.white1)};
    padding: 22px 40px;
`

type SummaryInnerContainerProps = {
    marginTop?: number
}
export const SummaryInnerContainer = styled.div<SummaryInnerContainerProps>`
    display: flex;
    justify-content: space-between;
    ${({ marginTop }) =>
        marginTop
            ? css`
                  margin-top: ${marginTop}px;
              `
            : undefined}
`

type SummaryUnitProps = {
    unit?: string
    sub?: boolean
}
export const SummaryUnit = ({ unit, sub = false }: SummaryUnitProps) => {
    const { keyCurrency } = useResources()
    const targetUnit = unit === undefined ? keyCurrency.unit : unit
    const typo = sub ? typos.suit['12.16_400'] : typos.suit['14.18_400']
    return <SummaryUnitText typo={typo}>{targetUnit}</SummaryUnitText>
}

const SummaryUnitText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.black[500],
    }),
)`
    margin-left: 4px;
    align-self: flex-end;
`
