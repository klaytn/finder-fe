import { useMemo } from 'react'

import { If } from '@klaytn/slush'

import TabContainer from '../../../components/commons/TabContainer'
import { useTabQuery } from '../../../hooks/useTabQuery'
import NftHolderTab from '../Tab/NftHolderTab'
import NftTransferTab from '../Tab/NftTransferTab'

export interface INftTabContainerProps {
    tokenId: string | undefined
    contractAddress: string
    type: string
    isLightType: boolean
    hasHolders: boolean
}

const NftItemTabContainer = ({ tokenId, contractAddress, type, isLightType, hasHolders }: INftTabContainerProps) => {
    const tabs = useMemo(() => {
        const extraTabs = hasHolders ? [{ name: 'Holders', value: 'nftHolder' }] : []
        return [{ name: 'NFT transfers', value: 'nftTransfer' }, ...extraTabs]
    }, [hasHolders])

    const { selectedTab } = useTabQuery(tabs)

    return (
        <TabContainer tabs={tabs} reversePadding={40}>
            <If condition={selectedTab === 'nftTransfer'}>
                <NftTransferTab
                    tabId={selectedTab}
                    nftAddress={contractAddress}
                    tokenId={tokenId}
                    parentPage="nftItem"
                    isLightType={isLightType}
                    hasHolders={hasHolders}
                />
            </If>
            <If condition={selectedTab === 'nftHolder'}>
                <NftHolderTab nftAddress={contractAddress} type={type} tokenId={tokenId} />
            </If>
        </TabContainer>
    )
}

export default NftItemTabContainer
