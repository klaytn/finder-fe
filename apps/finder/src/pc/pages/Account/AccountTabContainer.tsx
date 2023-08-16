import { useMemo } from 'react'

import { If } from '@klaytn/slush'

import TabContainer from '../../../components/commons/TabContainer'
import { useFeatures } from '../../../context/configProvider'
import { useTabQuery } from '../../../hooks/useTabQuery'
import { AccountVO } from '../../../vo/account'
import AccountInternalTxTab from '../Tab/AccountInternalTxTab'
import { AccountKeyTab } from '../Tab/AccountKeyTab'
import BlockTab from '../Tab/BlockTab'
import ContractTab from '../Tab/ContractTab'
import EventLogTab from '../Tab/EventLogTab'
import FeePaidTab from '../Tab/FeePaidTab'
import NftBalanceTab from '../Tab/NftBalanceTab'
import NftTransferTab from '../Tab/NftTransferTab'
import TokenBalanceTab from '../Tab/TokenBalanceTab'
import TokenTransferTab from '../Tab/TokenTransferTab'
import TransactionTab from '../Tab/TransactionTab'

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

const accountKeyTabs = [{ name: 'Key', value: 'accountKey' }] as const

const accountTabs = [
    { name: 'Token transfers', value: 'tokenTransfer' },
    { name: 'NFT transfers', value: 'nftTransfer' },
    { name: 'Token balance', value: 'tokenBalance' },
    { name: 'KIP17 balance', value: 'kip17Balance' },
    { name: 'KIP37 balance', value: 'kip37Balance' },
] as const

const commonTabs = [{ name: 'Fee paid TX', value: 'feePaid' }] as const

export interface IAccountTabContainerProps {
    account: AccountVO
    type: string
    subType?: string
}

const getStaticTabs = (
    type: string,
    subType: string,
    contractCode: boolean,
    accountKey: boolean,
    // shouldShowKeyDetails: boolean,
) => {
    const contractTab = contractCode ? ([{ name: 'Contract', value: 'contract' }] as const) : []

    // const showAccountKey = accountKey && shouldShowKeyDetails

    if (type === 'Account') {
        return [...transactionTabs, ...(accountKey ? accountKeyTabs : []), ...accountTabs, ...commonTabs] as const
    }

    if (type === 'Consensus Node') {
        return [...consensusNodeTabs, ...tokenTabs] as const
    }

    if (subType === 'NFT') {
        return [...transactionTabs, eventLogTab, ...contractTab, ...tokenTabs, ...nftTabs, ...commonTabs] as const
    }

    return [...transactionTabs, eventLogTab, ...contractTab, ...tokenTabs, ...nftTabs, ...commonTabs] as const
}

const AccountTabContainer = ({ account, type, subType = '' }: IAccountTabContainerProps) => {
    const { contractCode = false, accountKey = false } = useFeatures()

    const tabs = useMemo(() => {
        const staticTabs = getStaticTabs(type, subType, contractCode, accountKey)
        return staticTabs.map((tab) => {
            // accountKey는 항상 활성화
            if (tab.value === 'accountKey') {
                if (account.shouldShowKeyDetails) {
                    return tab
                } else {
                    return {
                        ...tab,
                        disabled: true,
                        description: 'There is no data',
                    }
                }
            }

            if (account.associatedInfos[tab.value] === false) {
                return {
                    ...tab,
                    disabled: true,
                    description: 'There is no data',
                }
            }

            return tab
        })
    }, [type, subType, account, contractCode, accountKey])

    const { selectedTab } = useTabQuery(tabs, { tabEnabledInfos: account.associatedInfos })

    return (
        <TabContainer tabs={tabs} reversePadding={40} tabEnabledInfos={account.associatedInfos}>
            <If condition={selectedTab === 'txList'}>
                <TransactionTab tabId={selectedTab} address={account.address} />
            </If>
            <If condition={selectedTab === 'proposedBlocks'}>
                <BlockTab tabId={selectedTab} address={account.address} />
            </If>
            <If condition={selectedTab === 'internalTx'}>
                <AccountInternalTxTab tabId={selectedTab} address={account.address} />
            </If>
            <If condition={selectedTab === 'eventLog'}>
                <EventLogTab tabId={selectedTab} address={account.address} showTx />
            </If>
            <If condition={selectedTab === 'contract'}>
                <ContractTab address={account.address} />
            </If>
            <If condition={selectedTab === 'tokenTransfer'}>
                <TokenTransferTab tabId={selectedTab} address={account.address} />
            </If>
            <If condition={selectedTab === 'nftTransfer'}>
                <NftTransferTab tabId={selectedTab} address={account.address} parentPage="account" />
            </If>
            <If condition={selectedTab === 'tokenBalance'}>
                <TokenBalanceTab tabId={selectedTab} address={account.address} />
            </If>
            <If condition={selectedTab === 'kip17Balance'}>
                <NftBalanceTab tabId={selectedTab} address={account.address} type="KIP17" />
            </If>
            <If condition={selectedTab === 'kip37Balance'}>
                <NftBalanceTab tabId={selectedTab} address={account.address} type="KIP37" />
            </If>
            <If condition={selectedTab === 'feePaid'}>
                <FeePaidTab tabId={selectedTab} address={account.address} />
            </If>
            <If condition={accountKey && selectedTab === 'accountKey'}>
                <AccountKeyTab tabId={selectedTab} address={account.address} />
            </If>
        </TabContainer>
    )
}

export default AccountTabContainer
