import styled from 'styled-components'

import { colors, If, Text, typos } from '@klaytn/slush'

import { useTransactions } from '../../api/transaction'
import ListCount from '../../components/commons/listCount'
import Page from '../../components/Page'
import { useServerConfig } from '../../context/configProvider'
import { getThemeColorOnAttrs } from '../../functions/colorMap'
import useQuery from '../../hooks/useQuery'
import TitleRow from '../components/common/titleRow'
import TransactionItemBox from '../components/common/transactionItemBox'

const TransactionsPage = () => {
    const query = useQuery()
    const page = query.get('page') || '1'

    const {
        result: { currentPage, totalPage, results, totalCount },
        refresh,
    } = useTransactions(true, '', page)
    const {
        paging: { limit },
    } = useServerConfig()

    return (
        <>
            <TitleRow title="Transactions" onRefresh={refresh} marginBottom={12} />
            <ListCount limitCount={limit.transaction} totalCount={totalCount} marginBottom={20} />

            {results.map((transaction) => (
                <TransactionItemBox key={transaction.txHash} noDateTime data={transaction} />
            ))}

            <If condition={currentPage === totalPage}>
                <LastPageText>
                    Because of length issue,
                    <br />
                    we show only the newest 40,000 data. <br />
                    You can check the previous data by search.
                </LastPageText>
            </If>

            <Page current={currentPage} total={totalPage} marginTop={12} size="small" />
        </>
    )
}

const LastPageText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    margin: 60px 20px;
    text-align: center;
`

export default TransactionsPage
