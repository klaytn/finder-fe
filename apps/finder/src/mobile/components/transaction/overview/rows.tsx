import BigNumber from 'bignumber.js'
import { CSSProperties, FC, ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { useResources } from '../../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { extractProp, klay } from '../../../../functions/Functions'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'

type NonTitleRowProps = {
    marginBottom?: number
    children: ReactNode
}

export const NonTitleRow = ({ children, marginBottom = 16 }: NonTitleRowProps) => {
    return (
        <Container direction="row" justifyContent="space-between" marginBottom={marginBottom}>
            {children}
        </Container>
    )
}

type BasicRowProps = {
    title: string
    contentAlign?: CSSProperties['alignItems']
    marginBottom?: number
    gap?: number
    isSub?: boolean
}

export const BasicRow: FC<BasicRowProps> = ({
    title,
    children,
    contentAlign = 'normal',
    marginBottom = 16,
    gap = 0,
    isSub = false,
}) => {
    return (
        <Container direction="row" justifyContent="space-between" marginBottom={marginBottom}>
            <BasicRowTitleText isSub={isSub}>{title}</BasicRowTitleText>
            <ContentsContainer direction="row" justifyContent={contentAlign} gap={gap}>
                {children}
            </ContentsContainer>
        </Container>
    )
}

const BasicRowTitleText = styled(Text).attrs<{ isSub: boolean }>((props) =>
    getThemeColorOnAttrs({
        typo: props.isSub ? typos.suit['12.16_400'] : typos.suit['12.16_900'],
        color: colors.blue[200],
    })(props),
)<{ isSub: boolean }>`
    min-width: 114px;
    opacity: ${({ isSub }) => (isSub ? 0.6 : 1)};
`

type TextRowProps = {
    title: string
    text: string | number | ReactNode
    marginBottom?: number
}

export const TextRow = ({ title, text, marginBottom }: TextRowProps) => {
    const color = useFinderThemeColor(colors.white)

    return (
        <BasicRow title={title} marginBottom={marginBottom}>
            <EllipsisText typo={typos.suit['12.16_400']} color={color}>
                {text}
            </EllipsisText>
        </BasicRow>
    )
}

type KlayRowProps = {
    title: string
    klay?: BigNumber
    isSub?: boolean
    marginBottom?: number
    isGasFee?: boolean
}

export const KlayRow = ({
    title,
    klay: klayValue = new BigNumber(0),
    isSub,
    marginBottom,
    isGasFee = false,
}: KlayRowProps) => {
    const { keyCurrency } = useResources()
    const colorSet = useFinderThemeColorSet({
        klay: colors.white,
        unit: colors.black[500],
    })
    return (
        <BasicRow title={title} isSub={isSub} marginBottom={marginBottom}>
            <EllipsisText typo={typos.suit['12.16_400']} color={colorSet.klay}>
                <EllipsisNumber value={klay(klayValue.toString())} noEllipsis />
            </EllipsisText>
            <KlayLabelText typo={typos.suit['12.16_400']} color={colorSet.unit}>
                {isGasFee ? keyCurrency.gasUnit : keyCurrency.unit}
            </KlayLabelText>
        </BasicRow>
    )
}

const Container = styled(Flex)<{ marginBottom: number }>`
    margin-bottom: ${extractProp('marginBottom')}px;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
`

const ContentsContainer = styled(Flex)<{ gap: number }>`
    margin-left: 10px;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    gap: ${extractProp('gap')}px;
`

const EllipsisText = styled(Text)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const KlayLabelText = styled(Text)`
    margin-left: 4px;
`
