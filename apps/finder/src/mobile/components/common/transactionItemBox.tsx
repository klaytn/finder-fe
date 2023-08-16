import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
    ArrowRightIcon,
    CircleiconWarningOnIcon,
    colors,
    Expander,
    ExpanderContents,
    ExpanderDescription,
    ExpanderHeader,
    ExpanderHeaderDecorator,
    Flex,
    If,
    Text,
    typos,
} from '@klaytn/slush'

import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import { useResources } from '../../../context/configProvider'
import { klay } from '../../../functions/Functions'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import { TransactionItem } from '../../../types/transactionItem'
import Address from './address'
import Hash from './hash'
import TimesAgo from './timesAgo'

type TransactionItemProps = {
    data: TransactionItem
    noDateTime?: boolean
}

const TransactionItemBox = ({ data, noDateTime = false }: TransactionItemProps) => {
    const {
        keyCurrency: { icon: KeyCurrencyIcon },
    } = useResources()
    const {
        amount,
        txHash,
        blockId,
        datetime,
        from,
        to,
        token: { symbol, icon, isKeyCurrency },
        type,
        isSuccess,
    } = data

    const colorSet = useFinderThemeColorSet({
        white: colors.white,
        symbol: colors.black[400],
        errorIcon: colors.red[600],
        arrowIcon: colors.blue[200],
    })

    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderContainer>
                        <HeaderLeftColumn>
                            {icon && <TokenIconImg src={icon} />}
                            {isKeyCurrency && <KeyCurrencyIcon size={16} />}
                            <EllipsisNumber
                                noEllipsis
                                value={klay(amount.toString())}
                                additionalCss={typos.suit['12.16_400']}
                                marginLeft={4}
                                marginRight={4}
                            />
                            <Text typo={typos.suit['12.16_400']} color={colorSet.symbol}>
                                {symbol}
                            </Text>
                        </HeaderLeftColumn>
                    </HeaderContainer>
                </ExpanderHeader>

                <ExpanderHeaderDecorator>
                    <If condition={!isSuccess}>
                        <HeaderRightColumn>
                            <CircleiconWarningOnIcon size={16} color={colorSet.errorIcon} />
                        </HeaderRightColumn>
                    </If>
                </ExpanderHeaderDecorator>

                <ExpanderDescription>
                    <DescriptionContainer direction="row" justifyContent="space-between">
                        <Address address={from} grow={1} isSuccess={isSuccess} />
                        <If condition={!!to}>
                            <FromToArrowIconContainer>
                                <ArrowRightIcon size={12} color={colorSet.arrowIcon} />
                            </FromToArrowIconContainer>
                        </If>
                        <Address address={to} grow={1} isSuccess={isSuccess} />
                    </DescriptionContainer>
                </ExpanderDescription>

                <ExpanderContents>
                    <TitleRow title="TX Hash" marginTop={28} />
                    <Flex direction="row">
                        <Hash hash={txHash} link={`/tx/${txHash}`} isSuccess={isSuccess} />
                    </Flex>

                    <TitleRow title="Block" marginTop={16} />
                    <Flex direction="row">
                        <Link to={`/block/${blockId}`}>
                            <Text typo={typos.suit['12.16_900']} color={colorSet.white}>
                                # {blockId}
                            </Text>
                        </Link>
                    </Flex>

                    {!noDateTime && (
                        <>
                            <TitleRow title="Time" marginTop={16} />
                            <Flex direction="row">
                                <Text typo={typos.suit['12.16_400']} color={colorSet.white}>
                                    <TimesAgo datetime={datetime} />
                                </Text>
                            </Flex>
                        </>
                    )}

                    {type && (
                        <>
                            <TitleRow title="TX Type" marginTop={16} />
                            <Flex direction="row">
                                <Text typo={typos.suit['12.16_400']} color={colorSet.white}>
                                    {type}
                                </Text>
                            </Flex>
                        </>
                    )}
                </ExpanderContents>
            </Expander>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 8px;
`

const HeaderContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    align-items: center;
`

const HeaderLeftColumn = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const HeaderRightColumn = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const TokenIconImg = styled.img`
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
`

const FromToArrowIconContainer = styled(Flex)`
    margin: 0px 7px;
`

const DescriptionContainer = styled(Flex)`
    margin-top: 12px;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
`

type TitleRowProps = {
    title: string
    marginTop?: number
}
const TitleRow = ({ title, marginTop }: TitleRowProps) => {
    const whiteColor = useFinderThemeColor(colors.white)
    return (
        <TitleRowContainer direction="row" marginTop={marginTop}>
            <Text typo={typos.suit['12.16_400']} color={whiteColor}>
                {title}
            </Text>
        </TitleRowContainer>
    )
}

const TitleRowContainer = styled(Flex)<{ marginTop?: number }>`
    margin-top: ${({ marginTop }) => marginTop}px;
    margin-bottom: 8px;
`

export default TransactionItemBox
