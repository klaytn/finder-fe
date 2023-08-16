import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import ButtonGroup, { ButtonGroupItem } from '../../../../components/buttonGroup'
import { useSubTab } from '../../../../hooks/useSubTab'
import NftSubTab from './nftSubTab'
import NftTokenIdSubTab from './nftTokenIdSubTab'
import TokenSubTab from './tokenSubTab'

const SUB_TABS: ButtonGroupItem[] = [
    {
        title: 'Token',
        value: 'token',
    },
    {
        title: 'NFT',
        value: 'nft',
    },
    {
        title: 'NFT(TokenID)',
        value: 'nft-token-id',
    },
]

const RevokeTokenApprovalTab = () => {
    const { subTab, handleSubTabChange } = useSubTab(SUB_TABS[0].value)

    return (
        <div>
            <ButtonGroupContainer>
                <ButtonGroup buttons={SUB_TABS} selectedValue={subTab} onChange={handleSubTabChange} />
            </ButtonGroupContainer>
            {subTab === 'token' && <TokenSubTab />}
            {subTab === 'nft' && <NftSubTab />}
            {subTab === 'nft-token-id' && <NftTokenIdSubTab />}
        </div>
    )
}

const ButtonGroupContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    margin-bottom: 32px;
`

export default RevokeTokenApprovalTab
