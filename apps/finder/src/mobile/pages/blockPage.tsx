import { FC } from 'react'
import { useParams, useLocation } from 'react-router'
import styled from 'styled-components'

import { Flex, If, Tabs } from '@klaytn/slush'

import { useTabQuery } from '../../hooks/useTabQuery'
import BlockInternalTransactionsTab from '../components/block/internalTransactions/internalTransactionTab'
import BlockOverviewTab from '../components/block/overview/blockOverviewTab'
import BlockTransactionsTab from '../components/block/transactions/blockTransactionsTab'
import TabErrorBoundary from '../components/common/tabErrorBoundary'
import TabItemContainer from '../components/common/tabItemContainer'
import TitleRow from '../components/common/titleRow'

const TABS = [
    { name: 'Overview', value: 'overview' },
    { name: 'Transactions', value: 'transactions' },
    { name: 'Internal transactions', value: 'internalTxs' },
]

const BlockPage: FC = () => {
    const { blockId = '' } = useParams()

    const { selectedTab, handleTabChange } = useTabQuery(TABS)

    const { pathname, search } = useLocation()

    return (
        <>
            <TitleRow title="Block" description={`#${blockId}`} marginBottom={0} />
            <TabErrorBoundary marginTop={28} pathname={`${pathname}${search}`}>
                <TabContainer>
                    <Tabs tabs={TABS} selected={selectedTab} size="small" onChange={handleTabChange} />
                </TabContainer>
                <TabItemContainer selectedTab={selectedTab}>
                    <If condition={selectedTab === 'overview'}>
                        <BlockOverviewTab id={blockId} />
                    </If>
                    <If condition={selectedTab === 'transactions'}>
                        <BlockTransactionsTab id={blockId} />
                    </If>
                    <If condition={selectedTab === 'internalTxs'}>
                        <BlockInternalTransactionsTab id={blockId} />
                    </If>
                </TabItemContainer>
            </TabErrorBoundary>
        </>
    )
}

const TabContainer = styled(Flex)`
    margin-top: 16px;
`

export default BlockPage
