import { Flex } from '@klaytn/slush'

import { useInternalTransactions } from '../../../../api/transaction'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import InternalTransaction from './internalTransaction'

type TransactionInternalTransactionTabProps = {
    hash: string
}

const TransactionInternalTransactionTab = ({ hash }: TransactionInternalTransactionTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { results, currentPage, totalPage, totalCount } = useInternalTransactions(hash, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Flex>
            <ListCount limitCount={limit.internalTransaction} totalCount={totalCount} marginBottom={20} />

            {results.map((internalTransaction) => (
                <InternalTransaction key={internalTransaction.callId} internalTransaction={internalTransaction} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Flex>
    )
}

export default TransactionInternalTransactionTab
