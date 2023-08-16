import { FC, useMemo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { Flex, If, Tabs } from '@klaytn/slush'

import { useAccount } from '../../api/account'
import { useFeatures } from '../../context/configProvider'
import { useTabQuery } from '../../hooks/useTabQuery'
import AccountTitle from '../components/account/accountTitle'
import AccountContractTab from '../components/account/contract/accountContractTab'
import AccountEventLogsTab from '../components/account/eventLogs/accountEventLogsTab'
import AccountInternalTransactionsTab from '../components/account/internalTransactions/internalTransactionTab'
import AccountKip17BalanceTab from '../components/account/nftBalance/accountKip17BalanceTab'
import AccountKip37BalanceTab from '../components/account/nftBalance/accountKip37BalanceTab'
import AccountNftTransfersTab from '../components/account/nftTransfers/transactionNftTransfersTab'
import AccountOverviewTab from '../components/account/overview/accountOverviewTab'
import AccountProposedBlocksTab from '../components/account/proposedBlocks/accountProposedBlocksTab'
import AccountTokenBalanceTab from '../components/account/tokenBalance/accountTokenBalanceTab'
import AccountTokenTransfersTab from '../components/account/tokenTransfers/accountTokenTransfersTab'
import AccountFeePaidTab from '../components/account/transactions/accountFeePaidTab'
import AccountTransactionsTab from '../components/account/transactions/accountTransactionsTab'
import TabItemContainer from '../components/common/tabItemContainer'

const overviewTab = {
    name: 'Overview',
    value: 'overview',
} as const

const transactionTabs = [
    { name: 'Transactions', value: 'txList' },
    { name: 'Internal transactions', value: 'internalTx' },
] as const

const consensusNodeTabs = [
    { name: 'Transactions', value: 'txList' },
    { name: 'Proposed Blocks', value: 'proposedBlocks' },
] as const

const eventLogTab = { name: 'Event logs', value: 'eventLog' } as const

const tokenTabs = [
    { name: 'Token transfers', value: 'tokenTransfer' },
    { name: 'Token balance', value: 'tokenBalance' },
] as const

const nftTabs = [
    { name: 'NFT transfers', value: 'nftTransfer' },
    { name: 'KIP17 balance', value: 'kip17Balance' },
    { name: 'KIP37 balance', value: 'kip37Balance' },
] as const

const accountTabs = [
    { name: 'Token transfers', value: 'tokenTransfer' },
    { name: 'NFT transfers', value: 'nftTransfer' },
    { name: 'Token balance', value: 'tokenBalance' },
    { name: 'KIP17 balance', value: 'kip17Balance' },
    { name: 'KIP37 balance', value: 'kip37Balance' },
] as const

const commonTabs = [{ name: 'Fee paid', value: 'feePaid' }] as const

function getTabList(title: string, subType: string | undefined, contractCode: boolean) {
    const contractTab = contractCode ? ([{ name: 'Contract', value: 'contract' }] as const) : []

    if (title === 'Account') {
        return [overviewTab, ...transactionTabs, ...accountTabs, ...commonTabs] as const
    }

    if (title === 'Consensus Node') {
        return [overviewTab, ...consensusNodeTabs, ...tokenTabs, ...commonTabs] as const
    }

    if (subType === 'NFT') {
        return [overviewTab, ...transactionTabs, eventLogTab, ...contractTab, ...nftTabs, ...commonTabs] as const
    }

    return [
        overviewTab,
        ...transactionTabs,
        eventLogTab,
        ...contractTab,
        ...tokenTabs,
        ...nftTabs,
        ...commonTabs,
    ] as const
}

const AccountPage: FC = () => {
    const { contractCode = false } = useFeatures()
    const { address = '' } = useParams()
    const { title, subType, associatedInfos } = useAccount(address)

    const tabs = useMemo(() => {
        const staticTabs = getTabList(title, subType, contractCode)
        return staticTabs.map((tab) => {
            if (associatedInfos[tab.value] === false) {
                return {
                    ...tab,
                    disabled: true,
                }
            }

            return tab
        })
    }, [title, subType, associatedInfos, contractCode])

    const { selectedTab, handleTabChange } = useTabQuery(tabs)

    return (
        <>
            <AccountTitle address={address} />

            <TabContainer>
                <Tabs tabs={tabs} selected={selectedTab} size="small" onChange={handleTabChange} />
            </TabContainer>
            <TabItemContainer selectedTab={selectedTab}>
                <If condition={selectedTab === 'overview'}>
                    <AccountOverviewTab address={address} />
                </If>
                <If condition={selectedTab === 'txList'}>
                    <AccountTransactionsTab address={address} />
                </If>
                <If condition={selectedTab === 'internalTx'}>
                    <AccountInternalTransactionsTab address={address} />
                </If>
                <If condition={selectedTab === 'eventLog'}>
                    <AccountEventLogsTab address={address} />
                </If>
                <If condition={selectedTab === 'contract'}>
                    <AccountContractTab address={address} />
                </If>
                <If condition={selectedTab === 'proposedBlocks'}>
                    <AccountProposedBlocksTab address={address} />
                </If>
                <If condition={selectedTab === 'tokenTransfer'}>
                    <AccountTokenTransfersTab address={address} />
                </If>
                <If condition={selectedTab === 'nftTransfer'}>
                    <AccountNftTransfersTab address={address} />
                </If>
                <If condition={selectedTab === 'tokenBalance'}>
                    <AccountTokenBalanceTab address={address} />
                </If>
                <If condition={selectedTab === 'kip17Balance'}>
                    <AccountKip17BalanceTab address={address} />
                </If>
                <If condition={selectedTab === 'kip37Balance'}>
                    <AccountKip37BalanceTab address={address} />
                </If>
                <If condition={selectedTab === 'feePaid'}>
                    <AccountFeePaidTab address={address} />
                </If>
            </TabItemContainer>
        </>
    )
}

const TabContainer = styled(Flex)``

export default AccountPage
