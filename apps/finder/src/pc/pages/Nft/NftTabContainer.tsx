import { useMemo } from 'react'

import { If } from '@klaytn/slush'

import TabContainer from '../../../components/commons/TabContainer'
import { useTabQuery } from '../../../hooks/useTabQuery'
import NftHolderTab from '../Tab/NftHolderTab'
import NftInventoryTab from '../Tab/NftInventoryTab'
import NftTransferTab from '../Tab/NftTransferTab'

const DEFAULT_TABS = [
    { name: 'NFT transfers', value: 'nftTransfer' },
    { name: 'Holders', value: 'nftHolder' },
    { name: 'Inventory', value: 'nftInventory' },
]

export interface INftTabContainerProps {
    tokenId: string | undefined
    contractAddress: string
    type: string
    isLightType: boolean
}

const NftTabContainer = ({ tokenId, contractAddress, type, isLightType }: INftTabContainerProps) => {
    const tabs = useMemo(() => {
        if (isLightType) {
            return DEFAULT_TABS
        }

        return DEFAULT_TABS
    }, [isLightType])

    const { selectedTab } = useTabQuery(tabs)

    return (
        <TabContainer tabs={tabs} reversePadding={40}>
            <If condition={selectedTab === 'nftTransfer'}>
                <NftTransferTab
                    tabId={selectedTab}
                    nftAddress={contractAddress}
                    tokenId={tokenId}
                    parentPage="nft"
                    isLightType={isLightType}
                />
            </If>
            <If condition={selectedTab === 'nftHolder'}>
                <NftHolderTab nftAddress={contractAddress} type={type} />
            </If>
            <If condition={selectedTab === 'nftInventory'}>
                <NftInventoryTab nftAddress={contractAddress} />
            </If>
        </TabContainer>
    )
}

export default NftTabContainer
