import { FC, useMemo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { Flex, If, Tabs } from '@klaytn/slush'

import { useTransaction } from '../../api/transaction'
import { useTabQuery } from '../../hooks/useTabQuery'
import TabItemContainer from '../components/common/tabItemContainer'
import TransactionEventLogsTab from '../components/transaction/eventLogs/transactionEventLogsTab'
import TransactionInputDataTab from '../components/transaction/inputData/transactionInputDataTab'
import TransactionInternalTransactionTab from '../components/transaction/internalTransactions/transactionInternalTransactionTab'
import TransactionNftTransfersTab from '../components/transaction/nftTransfers/transactionNftTransfersTab'
import TransactionOverviewTab from '../components/transaction/overview/transactionOverviewTab'
import TransactionTokenTransfersTab from '../components/transaction/tokenTransfers/transactionTokenTransfersTab'
import TransactionTitle from '../components/transaction/transactionTitle'

const TransactionPage: FC = () => {
    const { txHash = '' } = useParams()

    const { hasNftTransfer, hasTokenTransfer } = useTransaction(txHash)

    const tabs = useMemo(() => {
        const tokenTransferTabs = hasTokenTransfer ? [{ name: 'Token transfers', value: 'tokenTransfer' }] : []
        const nftTransferTabs = hasNftTransfer ? [{ name: 'NFT transfers', value: 'nftTransfer' }] : []
        return [
            { name: 'Overview', value: 'overview' },
            ...tokenTransferTabs,
            ...nftTransferTabs,
            { name: 'Event logs', value: 'eventLog' },
            { name: 'Internal transactions', value: 'internalTx' },
            { name: 'Input data', value: 'inputData' },
        ]
    }, [hasNftTransfer, hasTokenTransfer])

    const { selectedTab, handleTabChange } = useTabQuery(tabs)

    return (
        <>
            <TransactionTitle hash={txHash} />
            <TabContainer>
                <Tabs tabs={tabs} selected={selectedTab} size="small" onChange={handleTabChange} />
            </TabContainer>
            <TabItemContainer selectedTab={selectedTab}>
                <If condition={selectedTab === 'overview'}>
                    <TransactionOverviewTab hash={txHash} />
                </If>
                <If condition={selectedTab === 'tokenTransfer'}>
                    <TransactionTokenTransfersTab hash={txHash} />
                </If>
                <If condition={selectedTab === 'nftTransfer'}>
                    <TransactionNftTransfersTab hash={txHash} />
                </If>
                <If condition={selectedTab === 'eventLog'}>
                    <TransactionEventLogsTab hash={txHash} />
                </If>
                <If condition={selectedTab === 'internalTx'}>
                    <TransactionInternalTransactionTab hash={txHash} />
                </If>
                <If condition={selectedTab === 'inputData'}>
                    <TransactionInputDataTab hash={txHash} />
                </If>
            </TabItemContainer>
        </>
    )
}

const TabContainer = styled(Flex)``

export default TransactionPage
