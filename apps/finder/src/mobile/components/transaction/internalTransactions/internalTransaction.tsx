import styled from 'styled-components'

import {
    ArrowRightIcon,
    colors,
    ErrorIcon,
    Expander,
    ExpanderContents,
    ExpanderHeader,
    Flex,
    If,
    Text,
    typos,
} from '@klaytn/slush'

import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { useResources } from '../../../../context/configProvider'
import { klay } from '../../../../functions/Functions'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'
import { InternalTransactionVO } from '../../../../vo/internalTransaction'
import Address from '../../common/address'
import DataBox from './dataBox'

type InternalTransactionProps = {
    internalTransaction: InternalTransactionVO
}

const InternalTransaction = ({
    internalTransaction: { level, type, from, to, amount, input, output, hasError },
}: InternalTransactionProps) => {
    const { keyCurrency } = useResources()
    const colorSet = useFinderThemeColorSet({
        type: colors.white,
        errorIcon: colors.red[500],
        arrowIcon: colors.blue[200],
        label: colors.black[400],
        value: colors.white,
    })

    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderContainer direction="row">
                        <If condition={level > 0}>
                            <LevelIndicatorContainer level={level}>
                                <LevelIndicator />
                            </LevelIndicatorContainer>
                        </If>
                        <Text typo={typos.suit['12.16_400']} color={colorSet.type}>
                            {type}
                        </Text>
                        <If condition={hasError}>
                            <ErrorIconContainer direction="row" justifyContent="end">
                                <ErrorIcon size={13} color={colorSet.errorIcon} />
                            </ErrorIconContainer>
                        </If>
                    </HeaderContainer>
                </ExpanderHeader>

                <ExpanderContents>
                    <ContentsContainer direction="column">
                        <DescriptionContainer direction="row" justifyContent="space-between">
                            <Address address={from} grow={1} />
                            <FromToArrowIconContainer>
                                <ArrowRightIcon size={12} color={colorSet.arrowIcon} />
                            </FromToArrowIconContainer>
                            <Address address={to} grow={1} />
                        </DescriptionContainer>

                        <AmountTitleText typo={typos.suit['12.16_400']} color={colorSet.label}>
                            Amount ({keyCurrency.unit})
                        </AmountTitleText>
                        <AmountText typo={typos.suit['12.16_400']}>
                            <EllipsisNumber value={klay(amount.toString())} noEllipsis />
                        </AmountText>

                        <DataBox title="Input" data={input} marginTop={28} />
                        <DataBox title="Output" data={output} marginTop={12} />
                    </ContentsContainer>
                </ExpanderContents>
            </Expander>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 8px;
`

const HeaderContainer = styled(Flex)`
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const LevelIndicatorContainer = styled(Flex)<{ level: number }>`
    margin-left: ${({ level }) => level * 16}px;
    margin-right: 6px;
`

const LevelIndicator = () => {
    const color = useFinderThemeColor(colors.white)

    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 3C3.20711 3 3.375 3.16789 3.375 3.375V8.25H9.75C9.95711 8.25 10.125 8.41789 10.125 8.625C10.125 8.83211 9.95711 9 9.75 9H3C2.79289 9 2.625 8.83211 2.625 8.625V3.375C2.625 3.16789 2.79289 3 3 3Z"
                fill={color}
            />
        </svg>
    )
}

const ErrorIconContainer = styled(Flex)`
    flex-grow: 1;
`

const ContentsContainer = styled(Flex)``

const DescriptionContainer = styled(Flex)`
    margin-top: 12px;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
`

const FromToArrowIconContainer = styled(Flex)`
    margin: 0px 7px;
`

const AmountTitleText = styled(Text)`
    margin-top: 28px;
`

const AmountText = styled(Text)`
    margin-top: 8px;
`

export default InternalTransaction
