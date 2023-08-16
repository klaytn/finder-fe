import { FC, useMemo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { Flex, If, Tabs } from '@klaytn/slush'

import { useNft } from '../../api/nft'
import { useTabQuery } from '../../hooks/useTabQuery'
import LabelRow from '../components/common/labelRow'
import TabItemContainer from '../components/common/tabItemContainer'
import TitleRow from '../components/common/titleRow'
import NftHoldersTab from '../components/nft/holders/nftHoldersTab'
import NftInventoriesTab from '../components/nft/inventories/nftInventoriesTab'
import NftOverviewTab from '../components/nft/overview/nftOverviewTab'
import NftTransfersTab from '../components/nft/transfers/nftTransfersTab'

const TABS = [
    { name: 'Overview', value: 'overview' },
    { name: 'NFT transfers', value: 'nftTransfer' },
    { name: 'Holders', value: 'nftHolder' },
    { name: 'Inventory', value: 'nftInventory' },
]

const NftPage: FC = () => {
    const { address = '' } = useParams()

    const {
        info: { symbol, icon },
        type,
        isLightType,
    } = useNft(address)

    const tabs = useMemo(() => {
        if (isLightType) {
            return TABS
        }

        return TABS
    }, [isLightType])

    const { selectedTab, handleTabChange } = useTabQuery(tabs)

    return (
        <>
            <TitleRow title={symbol} marginBottom={12} leftItem={icon ? <IconImg src={icon} /> : null} />

            <LabelRow marginBottom={18} labels={[type]} />

            <TabContainer>
                <Tabs tabs={tabs} selected={selectedTab} size="small" onChange={handleTabChange} />
            </TabContainer>
            <TabItemContainer selectedTab={selectedTab}>
                <If condition={selectedTab === 'overview'}>
                    <NftOverviewTab address={address} />
                </If>
                <If condition={selectedTab === 'nftTransfer'}>
                    <NftTransfersTab address={address} />
                </If>
                <If condition={selectedTab === 'nftHolder'}>
                    <NftHoldersTab address={address} />
                </If>
                <If condition={selectedTab === 'nftInventory'}>
                    <NftInventoriesTab address={address} />
                </If>
            </TabItemContainer>
        </>
    )
}

const IconImg = styled.img`
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    margin-right: 8px;
`

const TabContainer = styled(Flex)``

export default NftPage
