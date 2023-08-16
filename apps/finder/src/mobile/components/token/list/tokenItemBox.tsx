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

import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { klay, withCommas } from '../../../../functions/Functions'
import { TokenItem } from '../../../../types/tokenItem'
import Hash from '../../common/hash'

type TokenItemBoxProps = {
    token: TokenItem
    linkPrefix: string
}

const TokenItemBox = ({
    token: {
        info: { name, icon, contractAddress, symbol },
        totalSupply,
        totalTransfers,
    },
    linkPrefix,
}: TokenItemBoxProps) => {
    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderRow>
                        {icon ? <IconImg src={icon} /> : <DummyIcon />}
                        <NoneStyleLink to={`/${linkPrefix}/${contractAddress}`}>
                            <TitleText>{name}</TitleText>
                        </NoneStyleLink>
                    </HeaderRow>
                </ExpanderHeader>

                <ExpanderDescription>
                    <DescriptionContainer>
                        <LabelText>Contract address</LabelText>
                        <Row marginBottom={0}>
                            <Hash hash={contractAddress} link={`/account/${contractAddress}`} />
                        </Row>
                    </DescriptionContainer>
                </ExpanderDescription>

                <ExpanderContents>
                    <ContentsContainer>
                        <LabelText>Symbol</LabelText>
                        <Row marginBottom={16}>
                            <SymbolText>{symbol}</SymbolText>
                        </Row>

                        <LabelText>Total Supply</LabelText>
                        <Row marginBottom={16}>
                            {icon ? <IconImg src={icon} /> : <DummyIcon />}
                            <TotalSupplyAmountText>
                                <EllipsisNumber value={klay(totalSupply)} noEllipsis />
                            </TotalSupplyAmountText>
                            <TotalSupplySymbolText>{symbol}</TotalSupplySymbolText>
                        </Row>

                        <LabelText>Total Transfers</LabelText>
                        <Row marginBottom={0}>
                            <TotalTransfersText>{withCommas(totalTransfers)}</TotalTransfersText>
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
`

const NoneStyleLink = styled(Link)`
    font-size: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const iconStyle = css`
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    margin-right: 4px;
    flex-shrink: 0;
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
    display: block;
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
    margin-top: 28px;
`

const SymbolText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)``

const TotalSupplyAmountText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    margin-right: 4px;
`

const TotalSupplySymbolText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)``

const TotalTransfersText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)``

export default TokenItemBox
