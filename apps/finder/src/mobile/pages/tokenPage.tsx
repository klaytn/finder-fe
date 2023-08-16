import { FC } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { Flex, If, Tabs } from '@klaytn/slush'

import { useToken } from '../../api/token'
import { useTabQuery } from '../../hooks/useTabQuery'
import LabelRow from '../components/common/labelRow'
import TabItemContainer from '../components/common/tabItemContainer'
import TitleRow from '../components/common/titleRow'
import TokenBurntsTab from '../components/token/burnts/tokenBurntsTab'
import TokenHoldersTab from '../components/token/holders/tokenHoldersTab'
import TokenOverviewTab from '../components/token/overview/tokenOverviewTab'
import TokenTransfersTab from '../components/token/transfers/tokenTransfersTab'

const TABS = [
    { name: 'Overview', value: 'overview' },
    { name: 'Token transfers', value: 'tokenTransfer' },
    { name: 'Holders', value: 'tokenHolder' },
    { name: 'Burnt list', value: 'burntList' },
]

const TokenPage: FC = () => {
    const { address = '' } = useParams()

    const {
        info: { symbol, icon },
        type,
    } = useToken(address)

    const { selectedTab, handleTabChange } = useTabQuery(TABS)

    return (
        <>
            <TitleRow title={symbol} marginBottom={12} leftItem={icon ? <IconImg src={icon} /> : null} />

            <LabelRow marginBottom={18} labels={[type]} />

            <TabContainer>
                <Tabs tabs={TABS} selected={selectedTab} size="small" onChange={handleTabChange} />
            </TabContainer>
            <TabItemContainer selectedTab={selectedTab}>
                <If condition={selectedTab === 'overview'}>
                    <TokenOverviewTab address={address} />
                </If>
                <If condition={selectedTab === 'tokenTransfer'}>
                    <TokenTransfersTab address={address} />
                </If>
                <If condition={selectedTab === 'tokenHolder'}>
                    <TokenHoldersTab address={address} />
                </If>
                <If condition={selectedTab === 'burntList'}>
                    <TokenBurntsTab address={address} />
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

export default TokenPage
