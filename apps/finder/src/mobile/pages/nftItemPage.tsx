import { FC, useMemo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { Flex, If, Tabs } from '@klaytn/slush'

import { useNft } from '../../api/nft'
import { useTabQuery } from '../../hooks/useTabQuery'
import LabelRow from '../components/common/labelRow'
import TabItemContainer from '../components/common/tabItemContainer'
import TitleRow from '../components/common/titleRow'
import NftItemHoldersTab from '../components/nftItem/holders/nftItemHoldersTab'
import NftItemOverviewTab from '../components/nftItem/overview/nftItemOverviewTab'
import NftItemTransfersTab from '../components/nftItem/transfers/nftItemTransfersTab'

const TABS = [
    { name: 'Overview', value: 'overview' },
    { name: 'NFT transfers', value: 'nftTransfer' },
]

const NftItemPage: FC = () => {
    const { address = '', tokenId = '' } = useParams()

    const {
        info: { symbol, icon },
        type,
        isLightType,
    } = useNft(address)

    const tabs = useMemo(() => {
        const extraTabs = isLightType ? [{ name: 'Holders', value: 'nftHolder' }] : []

        return [...TABS, ...extraTabs]
    }, [isLightType])

    const { selectedTab, handleTabChange } = useTabQuery(tabs)

    return (
        <>
            <TitleRow
                title={symbol}
                marginBottom={12}
                leftItem={icon ? <IconImg src={icon} /> : null}
                description={`#${tokenId}`}
            />

            <LabelRow marginBottom={18} labels={[type]} />

            <TabContainer>
                <Tabs tabs={tabs} selected={selectedTab} size="small" onChange={handleTabChange} />
            </TabContainer>
            <TabItemContainer selectedTab={selectedTab}>
                <If condition={selectedTab === 'overview'}>
                    <NftItemOverviewTab address={address} tokenId={tokenId} />
                </If>
                <If condition={selectedTab === 'nftTransfer'}>
                    <NftItemTransfersTab address={address} tokenId={tokenId} />
                </If>
                <If condition={selectedTab === 'nftHolder'}>
                    <NftItemHoldersTab address={address} tokenId={tokenId} />
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

export default NftItemPage
