import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useFeePaidTransactions } from '../../../../api/account'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import TransactionItemBox from '../../common/transactionItemBox'

type AccountFeePaidTabProps = {
    address: string
}

const AccountFeePaidTab = ({ address }: AccountFeePaidTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const {
        result: { currentPage, totalPage, results, totalCount },
    } = useFeePaidTransactions(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            <ListCount limitCount={limit.transaction} totalCount={totalCount} marginBottom={20} />

            {results.map((transaction, index) => (
                <TransactionItemBox key={`${transaction.txHash}-${index}`} data={transaction} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default AccountFeePaidTab
