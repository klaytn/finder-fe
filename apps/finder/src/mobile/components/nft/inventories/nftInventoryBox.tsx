import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
    colors,
    CopyIcon,
    Expander,
    ExpanderContents,
    ExpanderDescription,
    ExpanderHeader,
    Flex,
    Text,
    Toast,
    typos,
    useToggle,
} from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { extractProp, copy as doCopy } from '../../../../functions/Functions'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import { NftInventoryVO } from '../../../../vo/nftInventory'
import Hash from '../../common/hash'

type NftInventoryBoxProps = {
    data: NftInventoryVO
    address: string
}

const NftInventoryBox = ({ data, address }: NftInventoryBoxProps) => {
    const { holder, tokenId, tokenUri } = data

    const toastState = useToggle()
    const handleCopy = useCallback(() => {
        doCopy(tokenUri)
        toastState.on()
    }, [tokenUri, toastState])
    const copyIconColor = useFinderThemeColor(colors.blue[500])

    return (
        <>
            <Container>
                <Expander>
                    <ExpanderHeader>
                        <HeaderContainer>
                            <TitleText>Token ID</TitleText>
                            <div>
                                <TokenIdLink to={`/nft/${address}/${tokenId}`}>{tokenId}</TokenIdLink>
                            </div>
                        </HeaderContainer>
                    </ExpanderHeader>

                    <ExpanderDescription>
                        <TitleText marginTop={16}>Holder</TitleText>
                        <Hash hash={holder.address} link={`/account/${holder.address}`} />
                    </ExpanderDescription>

                    <ExpanderContents>
                        <TitleText marginTop={16}>Token URI</TitleText>
                        <TokenUriRow>
                            <ValueText>{tokenUri}</ValueText>
                            <CopyIconContainer onClick={handleCopy}>
                                <CopyIcon size={18} color={copyIconColor} />
                            </CopyIconContainer>
                        </TokenUriRow>
                    </ExpanderContents>
                </Expander>
            </Container>
            <Toast message="Token URI copied." top={60} show={toastState.isShow} onClose={toastState.off} />
        </>
    )
}

const Container = styled(Flex)`
    margin-bottom: 8px;
`

const HeaderContainer = styled(Flex)``

const TokenIdLink = styled(Link)`
    min-width: 40px;
    ${typos.suit['12.16_900']};
    color: ${getThemeColor(colors.white)};
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)<{ marginTop?: number }>`
    margin-top: ${extractProp('marginTop')}px;
    margin-bottom: 8px;
`

const ValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const TokenUriRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})``

const CopyIconContainer = styled(Flex).attrs({
    justifyContent: 'center',
})`
    margin-left: 10px;
    align-items: center;
`

export default NftInventoryBox
