import { useMemo } from 'react'

import { If } from '@klaytn/slush'

import { useTransaction } from '../../../api/transaction'
import TabContainer from '../../../components/commons/TabContainer'
import { useFeatures } from '../../../context/configProvider'
import { useTabQuery } from '../../../hooks/useTabQuery'
import EventLogTab from '../Tab/EventLogTab'
import InputDataTab from '../Tab/InputDataTab'
import InternalTxTab from '../Tab/InternalTxTab'
import NftTransferTab from '../Tab/NftTransferTab'
import TokenTransferTab from '../Tab/TokenTransferTab'
import { TransactionAccountKeyTab } from '../Tab/TransactionAccountKeyTab'

export interface ITransactionTabContainerProps {
    txHash: string
    tokenTransfer?: boolean
    nftTransfer?: boolean
}

const TransactionTabContainer = ({ txHash, tokenTransfer, nftTransfer }: ITransactionTabContainerProps) => {
    const { key, accountKey } = useTransaction(txHash)
    const { accountKey: accountKeyFeature = false } = useFeatures()

    const tabs = useMemo(() => {
        const tokenTransferTabs = tokenTransfer ? [{ name: 'Token transfers', value: 'tokenTransfer' }] : []
        const nftTransferTabs = nftTransfer ? [{ name: 'NFT transfers', value: 'nftTransfer' }] : []
        const accountKeyTab =
            accountKeyFeature && key && accountKey ? [{ name: 'Account Key', value: 'accountKey' }] : []
        return [
            ...accountKeyTab,
            ...tokenTransferTabs,
            ...nftTransferTabs,
            { name: 'Event logs', value: 'eventLog' },
            { name: 'Internal transactions', value: 'internalTx' },
            { name: 'Input data', value: 'inputData' },
        ]
    }, [tokenTransfer, nftTransfer, key, accountKey, accountKeyFeature])

    const { selectedTab } = useTabQuery(tabs)

    return (
        <TabContainer tabs={tabs} reversePadding={40}>
            <If condition={selectedTab === 'tokenTransfer'}>
                <TokenTransferTab tabId={selectedTab} txHash={txHash} hideTxHashColumn />
            </If>
            <If condition={selectedTab === 'nftTransfer'}>
                <NftTransferTab tabId={selectedTab} txHash={txHash} parentPage="tx" />
            </If>
            <If condition={selectedTab === 'eventLog'}>
                <EventLogTab tabId={selectedTab} txHash={txHash} />
            </If>
            <If condition={selectedTab === 'internalTx'}>
                <InternalTxTab tabId={selectedTab} txHash={txHash} />
            </If>
            <If condition={selectedTab === 'inputData'}>
                <InputDataTab tabId={selectedTab} txHash={txHash} />
            </If>
            <If condition={accountKeyFeature && selectedTab === 'accountKey'}>
                <TransactionAccountKeyTab txHash={txHash} />
            </If>
        </TabContainer>
    )
}

export default TransactionTabContainer
