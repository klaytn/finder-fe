import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import {
    Flex,
    Expander,
    ExpanderHeader,
    ExpanderDescription,
    ExpanderContents,
    Text,
    typos,
    colors,
} from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { klay } from '../../../../functions/Functions'
import { TokenBalanceVO } from '../../../../vo/tokenBalance'
import TimesAgo from '../../common/timesAgo'

type TokenBalanceItemBoxProps = {
    data: TokenBalanceVO
}

const TokenBalanceItemBox = ({
    data: {
        info: { name, icon, contractAddress, symbol },
        balance,
        latestTransactionDateTime,
    },
}: TokenBalanceItemBoxProps) => {
    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderRow>
                        {icon ? <IconImg src={icon} /> : <DummyIcon />}
                        <NoneStyleLink to={`/account/${contractAddress}`}>
                            <TitleText>{name}</TitleText>
                        </NoneStyleLink>
                    </HeaderRow>
                </ExpanderHeader>

                <ExpanderDescription>
                    <DescriptionContainer>
                        <LabelText>Balance</LabelText>
                        <Row marginBottom={0}>
                            <TitleText>{klay(balance)}</TitleText>
                            <BalanceSymbolText>{symbol}</BalanceSymbolText>
                        </Row>
                    </DescriptionContainer>
                </ExpanderDescription>

                <ExpanderContents>
                    <ContentsContainer>
                        <LabelText>Symbol</LabelText>
                        <Row marginBottom={16}>
                            <SymbolText>{symbol}</SymbolText>
                        </Row>

                        <LabelText>Latest Transaction</LabelText>
                        <Row marginBottom={0}>
                            <TitleText>
                                <TimesAgo datetime={latestTransactionDateTime} />
                            </TitleText>
                        </Row>
                    </ContentsContainer>
                </ExpanderContents>
            </Expander>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 8px;
`

const HeaderRow = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const NoneStyleLink = styled(Link)`
    font-size: 0;
`

const iconStyle = css`
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    margin-right: 4px;
`

const IconImg = styled.img`
    ${iconStyle}
`

const DummyIcon = styled(Flex)`
    ${iconStyle}
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const DescriptionContainer = styled(Flex)`
    margin-top: 12px;
`

const LabelText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)`
    margin-bottom: 8px;
`

const Row = styled(Flex).attrs({
    direction: 'row',
})<{ marginBottom: number }>`
    align-items: center;
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
`

const ContentsContainer = styled(Flex)`
    margin-top: 20px;
`

const SymbolText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)``

const BalanceSymbolText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)`
    margin-left: 4px;
`

export default TokenBalanceItemBox
