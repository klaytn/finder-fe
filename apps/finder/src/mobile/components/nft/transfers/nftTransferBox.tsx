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

import { useFinderThemeColor, useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'
import { NftTransferVO } from '../../../../vo/nftTransfer'
import Address from '../../common/address'
import Hash from '../../common/hash'
import TimesAgo from '../../common/timesAgo'

type NftTransferBoxProps = {
    data: NftTransferVO
}

const NftTransferBox = ({ data }: NftTransferBoxProps) => {
    const {
        txHash,
        blockId,
        datetime,
        from,
        to,
        tokenId,
        nft: { contractAddress },
    } = data

    const colorSet = useFinderThemeColorSet({
        tokenId: colors.white,
        arrowIcon: colors.blue[200],
        blockId: colors.white,
        timesAgo: colors.white,
    })

    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderContainer direction="row">
                        <Link to={`/nft/${contractAddress}/${tokenId}`}>
                            <TokenIdText typo={typos.suit['12.16_900']} color={colorSet.tokenId}>
                                {tokenId}
                            </TokenIdText>
                        </Link>
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
                    <TitleRow title="TX Hash" marginTop={28} />
                    <Flex direction="row">
                        <Hash hash={txHash} link={`/tx/${txHash}`} />
                    </Flex>

                    <TitleRow title="Block" marginTop={16} />
                    <Flex direction="row">
                        <Link to={`/block/${blockId}`}>
                            <Text typo={typos.suit['12.16_900']} color={colorSet.blockId}>
                                # {blockId}
                            </Text>
                        </Link>
                    </Flex>

                    <TitleRow title="Time" marginTop={16} />
                    <Flex direction="row">
                        <Text typo={typos.suit['12.16_400']} color={colorSet.timesAgo}>
                            <TimesAgo datetime={datetime} />
                        </Text>
                    </Flex>
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
`

const TokenIdText = styled(Text)`
    margin: 0px 4px;
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

export default NftTransferBox
