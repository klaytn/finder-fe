import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
    ArrowRightIcon,
    colors,
    Expander,
    ExpanderContents,
    ExpanderDescription,
    ExpanderHeader,
    Flex,
    Text,
    typos,
} from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { withCommas } from '../../../../functions/Functions'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'
import { NftTransferVO } from '../../../../vo/nftTransfer'
import Address from '../../common/address'
import Hash from '../../common/hash'
import TimesAgo from '../../common/timesAgo'

type NftTransferProps = {
    nftTransfer: NftTransferVO
}

const NftTransfer = ({ nftTransfer }: NftTransferProps) => {
    const {
        tokenId,
        tokenCount,
        txHash,
        blockId,
        datetime,
        from,
        to,
        nft: { name, icon, contractAddress },
    } = nftTransfer

    const colorSet = useFinderThemeColorSet({
        title: colors.white,
        arrowIcon: colors.blue[200],
        value: colors.white,
    })

    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderContainer direction="row">
                        {icon && <TokenIconImg src={icon} />}
                        <SymbolText typo={typos.suit['12.16_400']} color={colorSet.title}>
                            {name}
                        </SymbolText>
                    </HeaderContainer>
                </ExpanderHeader>

                <ExpanderDescription>
                    <DescriptionContainer direction="row" justifyContent="space-between">
                        <Address address={from} grow={1} />
                        <FromToArrowIconContainer>
                            <ArrowRightIcon size={12} color={colorSet.arrowIcon} />
                        </FromToArrowIconContainer>
                        <Address address={to} grow={1} />
                    </DescriptionContainer>
                </ExpanderDescription>

                <ExpanderContents>
                    <ContentsContainer>
                        <TitleRow title="TX Hash" marginTop={28} />
                        <Hash hash={txHash} link={`/tx/${txHash}`} />

                        <TitleRow title="Block" marginTop={16} />
                        <EllipsisLink to={`/block/${blockId}`}>
                            <LinkText># {blockId}</LinkText>
                        </EllipsisLink>

                        <Flex direction="row">
                            <Column>
                                <TitleRow title="Token ID" marginTop={16} />
                                <EllipsisLink to={`/nft/${contractAddress}/${tokenId}`}>
                                    <LinkText>{tokenId}</LinkText>
                                </EllipsisLink>
                            </Column>

                            <Column>
                                <TitleRow title="Token Count" marginTop={16} />
                                <Text typo={typos.suit['12.16_400']} color={colorSet.value}>
                                    {withCommas(tokenCount)}
                                </Text>
                            </Column>
                        </Flex>

                        <TitleRow title="Time" marginTop={16} />
                        <Text typo={typos.suit['12.16_400']} color={colorSet.value}>
                            <TimesAgo datetime={datetime} />
                        </Text>
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

const TokenIconImg = styled.img`
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
`

const SymbolText = styled(Text)`
    margin-left: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex-grow: 1;
    width: 100%;
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

const ContentsContainer = styled(Flex)`
    white-space: nowrap;
    overflow: hidden;
`

type TitleRowProps = {
    title: string
    marginTop?: number
}
const TitleRow = ({ title, marginTop }: TitleRowProps) => {
    const color = useFinderThemeColor(colors.black[400])
    return (
        <TitleRowContainer direction="row" marginTop={marginTop}>
            <Text typo={typos.suit['12.16_400']} color={color}>
                {title}
            </Text>
        </TitleRowContainer>
    )
}

const TitleRowContainer = styled(Flex)<{ marginTop?: number }>`
    margin-top: ${({ marginTop }) => marginTop}px;
    margin-bottom: 8px;
`

const EllipsisLink = styled(Link)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0;
`

const LinkText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Column = styled(Flex)`
    flex-grow: 1;
    flex-basis: 0;
`

export default NftTransfer
