import { CSSProperties, FC, forwardRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../functions/colorMap'
import { extractProp } from '../functions/Functions'

interface ISummaryItem2Props {
    width: number
    center?: boolean
    ellipsis?: boolean
    sub?: ReactNode
}

const KeyComponent: FC<ISummaryItem2Props> = ({ width, center = false, children, sub }) => {
    return (
        <SummaryKeyContainer center={center} width={width}>
            <KeyText>{children}</KeyText>
            {sub && <SubKeyText>{sub}</SubKeyText>}
        </SummaryKeyContainer>
    )
}

const SummaryKeyContainer = styled.div<{
    center: boolean
    width: number
}>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    ${({ center }) =>
        center
            ? css`
                  align-items: center;
              `
            : ''};
    width: ${extractProp('width')}px;
`

const KeyText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.20_900'],
        color: colors.blue[200],
    }),
)`
    display: inline-flex;
`

const SubKeyText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_400'],
        color: colors.blue[200],
    }),
)`
    opacity: 0.7;
`

const ValueComponent = forwardRef<HTMLDivElement, ISummaryItem2Props & { children: ReactNode }>(
    ({ width, children, ellipsis = false, sub }, ref) => {
        return (
            <SummaryValueOuterContainer ref={ref}>
                <SummaryValueContainer width={width} ellipsis={ellipsis}>
                    {children}
                </SummaryValueContainer>
                {sub && <SummaryValueSubText>{sub}</SummaryValueSubText>}
            </SummaryValueOuterContainer>
        )
    },
)

ValueComponent.displayName = 'ValueComponent'

const SummaryValueOuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const SummaryValueContainer = styled.div<{ ellipsis: boolean; width: number }>`
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: -0.0075em;
    color: ${getThemeColor(colors.white)};
    display: flex;
    flex-direction: row;
    align-items: center;
    width: ${extractProp('width')}px;

    ${({ ellipsis }) =>
        ellipsis
            ? css`
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
              `
            : ''};
`

const SummaryValueSubText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_400'],
        color: colors.black[500],
    }),
)``

type SummaryItemProps = {
    alignItems?: CSSProperties['alignItems']
    children: ReactNode
    hasSub?: boolean
    freeHeight?: boolean
}

const SummaryItem: FC<SummaryItemProps> & {
    Key: typeof KeyComponent
    Value: typeof ValueComponent
} = ({ alignItems = 'center', children, hasSub = false, freeHeight = false }: SummaryItemProps) => {
    return (
        <SummaryContainer alignItems={alignItems} hasSub={hasSub} freeHeight={freeHeight}>
            {children}
        </SummaryContainer>
    )
}

const SummaryContainer = styled(Flex).attrs({
    justifyContent: 'space-between',
    direction: 'row',
})<{ alignItems: CSSProperties['alignItems']; hasSub: boolean; freeHeight: boolean }>`
    align-items: ${({ alignItems }) => alignItems};
    ${({ freeHeight, hasSub }) =>
        freeHeight
            ? ''
            : css`
                  height: ${hasSub ? 48 : 28}px;
              `}
`

SummaryItem.Key = KeyComponent
SummaryItem.Value = ValueComponent

export default SummaryItem
