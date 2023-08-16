import { useMemo } from 'react'

import { If } from '@klaytn/slush'

import TabContainer from '../../../components/commons/TabContainer'
import { useFeatures } from '../../../context/configProvider'
import { useTabQuery } from '../../../hooks/useTabQuery'
import BlockInternalTxTab from '../Tab/BlockInternalTxTab'
import BlockRewardDetailsTab from './BlockRewardDetailsTab'
import BlockTransactionTab from './BlockTransactionTab'

const TABS = [
    { name: 'Transactions', value: 'transactions' },
    { name: 'Internal transactions', value: 'internalTxs' },
]

type BlockTabContainerProps = {
    blockId: number | string
}

const BlockTabContainer = ({ blockId }: BlockTabContainerProps) => {
    const { blockRewardDetail = false } = useFeatures()

    const tabs = useMemo(() => {
        if (blockRewardDetail) {
            return [...TABS, { name: 'Reward details', value: 'rewardDetails' }]
        }

        return TABS
    }, [blockRewardDetail])

    const { selectedTab } = useTabQuery(tabs)

    return (
        <TabContainer tabs={tabs} reversePadding={40}>
            <If condition={selectedTab === 'transactions'}>
                <BlockTransactionTab blockId={parseInt(`${blockId}`)} />
            </If>
            <If condition={selectedTab === 'internalTxs'}>
                <BlockInternalTxTab blockId={blockId} tabId={selectedTab} />
            </If>
            <If condition={blockRewardDetail && selectedTab === 'rewardDetails'}>
                <BlockRewardDetailsTab blockId={blockId} />
            </If>
        </TabContainer>
    )
}

export default BlockTabContainer
