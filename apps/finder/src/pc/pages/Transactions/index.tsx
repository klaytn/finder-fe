import addDays from 'date-fns/esm/addDays'
import { useMemo } from 'react'

import { colors } from '@klaytn/slush'

import Empty from '../../../components/commons/empty'
import InfoTooltip from '../../../components/commons/infoTooltip'
import { Table, TableHeaders, TableHeader, TableRow, TableCell } from '../../../components/commons/table/basic'
import {
    TableBlockIdCell,
    TableFromToCell,
    TableFromToHeader,
    TableHashCell,
    TableKlayCell,
    TableTimesAgoCell,
    TableTxTypeCell,
} from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import NoTXFeeTooltip from '../../../components/pc/noTXFeeTooltip'
import ToggleSortDirection from '../../../components/pc/toggleSortDirection'
import TxFilterPanel from '../../../components/pc/txFilterPanel'
import { ListTitle } from '../../../components/Title'
import TransactionTypeFilter from '../../../components/TransactionTypeFilter'
import { METHOD_TOOLTIP } from '../../../constants/message'
import { useFeatures, useResources, useServerConfig } from '../../../context/configProvider'
import { filterEmptyValue } from '../../../functions/Functions'
import useFetchTransactions from '../../../hooks/useFetchTransactions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'

const FILTER_LIMIT = 10000 // used as a constant because the server doesn't take it down

const Transactions = () => {
    const query = useQuery()
    const { keyCurrency } = useResources()
    const { transactionFilter = false, showGasPrice = false } = useFeatures()
    const {
        paging: { limit },
    } = useServerConfig()

    const type = query.get('type') || ''
    const searchQuery = {
        sortDirection: query.get('sortDirection'),
        fromAt: query.get('fromAt'),
        toAt: query.get('toAt'),
        types: query.getAll('types'),
        status: query.get('status'),
        from: query.get('from'),
        to: query.get('to'),
        feePayer: query.get('feePayer'),
        currentTime: query.get('currentTime'),
    }

    const isFiltered = Object.keys(filterEmptyValue(searchQuery)).length > 0

    const { defaultFrom, defaultTo } = useMemo(() => {
        const now = new Date()
        return {
            defaultFrom: addDays(now, -1),
            defaultTo: now,
        }
    }, [])

    const { refresh, result } = useFetchTransactions(defaultFrom, defaultTo)
    const { results: transactions, currentPage, totalPage, totalCount } = result

    const methodColor = useFinderThemeColor(colors.white)

    const hideColumnIndexList = useMemo(() => (showGasPrice ? [] : [6]), [showGasPrice])

    return (
        <>
            {transactionFilter && <TxFilterPanel defaultFrom={defaultFrom} defaultTo={defaultTo} />}
            <div className="flex_space_between">
                <ListTitle title="Transactions" onRefresh={refresh} types={[]} />
            </div>

            <Table
                columnSizeList={[110, 92, 54, 366, 100, 182, 108, 92]}
                hideColumnIndexList={hideColumnIndexList}
                totalCount={totalCount}
                limitCount={isFiltered ? FILTER_LIMIT : limit.transaction}
                gapWithCount={33}
            >
                <TableHeaders>
                    <TableHeader>TX Hash</TableHeader>
                    <TableHeader>Block#</TableHeader>
                    <TableHeader>
                        {isFiltered ? <ToggleSortDirection>Time ago</ToggleSortDirection> : 'Time ago'}
                    </TableHeader>
                    <TableFromToHeader />
                    <TableHeader>
                        Method
                        <InfoTooltip
                            marginLeft={4}
                            marginTop={1}
                            size={16}
                            color={methodColor}
                            message={METHOD_TOOLTIP}
                        />
                    </TableHeader>
                    <TableHeader>
                        {isFiltered ? 'TX Type' : <TransactionTypeFilter type={type} path="/txs" />}
                    </TableHeader>
                    <TableHeader align="right">Amount ({keyCurrency.unit})</TableHeader>
                    <TableHeader align="right">
                        TX Fee {showGasPrice ? keyCurrency.unit : <NoTXFeeTooltip />}
                    </TableHeader>
                </TableHeaders>

                {transactions.length === 0 && <Empty />}

                {transactions.map((transaction, index) => {
                    const failed = !transaction.isSuccess

                    return (
                        <TableRow key={index} failed={failed} failMessage={transaction.failMessage}>
                            <TableHashCell value={transaction.txHash} failed={failed} />
                            <TableBlockIdCell value={transaction.blockId} />
                            <TableTimesAgoCell value={transaction.datetime} />
                            <TableFromToCell from={transaction.from} to={transaction.to} failed={failed} />
                            <TableCell color={methodColor} tooltip>
                                {transaction.method}
                            </TableCell>
                            <TableTxTypeCell type={transaction.type} />
                            <TableKlayCell value={transaction.amount} align="right" />
                            <TableKlayCell value={transaction.fee} align="right" />
                        </TableRow>
                    )
                })}
            </Table>

            <Page current={currentPage} total={totalPage} query={{ type, ...searchQuery }} />
        </>
    )
}

export default Transactions
