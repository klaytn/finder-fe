import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useBlockTransactions } from '../../../../api/block'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import TransactionItemBox from '../../common/transactionItemBox'

type BlockTransactionsTabProps = {
    id: string
}

const BlockTransactionsTab = ({ id }: BlockTransactionsTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, results, totalCount } = useBlockTransactions(id, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            <ListCount limitCount={limit.transaction} totalCount={totalCount} marginBottom={20} />

            {results.map((blockTransaction) => (
                <TransactionItemBox key={blockTransaction.txHash} noDateTime data={blockTransaction} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default BlockTransactionsTab
