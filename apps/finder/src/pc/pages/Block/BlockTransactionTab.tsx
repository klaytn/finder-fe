import { useCallback, useEffect, useMemo, useState } from 'react'

import { colors } from '@klaytn/slush'

import { defaultPage, Paging } from '../../../api/api'
import { getBlockTransactions } from '../../../api/block'
import Empty from '../../../components/commons/empty'
import InfoTooltip from '../../../components/commons/infoTooltip'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
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
import TransactionTypeFilter from '../../../components/TransactionTypeFilter'
import { METHOD_TOOLTIP } from '../../../constants/message'
import { useFeatures, useResources, useServerConfig } from '../../../context/configProvider'
import useAsyncError from '../../../hooks/useAsyncError'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { BlockTransactionVO } from '../../../vo/blockTransaction'

interface IBlockTransactionProps {
    blockId: number
}

const BlockTransactionTab = ({ blockId }: IBlockTransactionProps) => {
    const query = useQuery()
    const { keyCurrency } = useResources()
    const { showGasPrice = false } = useFeatures()
    const [transactions, setTransactions] = useState<BlockTransactionVO[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const [isLoaded, setIsLoaded] = useState(false)
    const {
        paging: { limit },
    } = useServerConfig()

    const type = query.get('type') || ''
    const page = query.get('page') || '1'

    const throwError = useAsyncError()

    const fetchBlockTransactions = useCallback(
        async (page: string, type: string) => {
            try {
                const {
                    data: { results, paging },
                } = await getBlockTransactions(blockId, page, type)

                setTransactions(results.map((tx) => new BlockTransactionVO(tx, keyCurrency)))
                setPaging(paging)
                setIsLoaded(true)
            } catch (e) {
                throwError(e)
            }
        },
        [blockId, throwError, keyCurrency],
    )

    useEffect(() => {
        fetchBlockTransactions(page, type)
    }, [blockId, page, fetchBlockTransactions, type])

    const hasEmptyResult = isLoaded && paging.totalCount === 0
    const hasEmptyResultWithoutType = isLoaded && paging.totalCount === 0 && type === ''

    const methodColor = useFinderThemeColor(colors.white)

    const hideColumnIndexList = useMemo(() => (showGasPrice ? [] : [6]), [showGasPrice])

    if (hasEmptyResultWithoutType) {
        return <Empty />
    }

    return (
        <div>
            <Table
                columnSizeList={[110, 92, 54, 366, 100, 182, 108, 92]}
                hideColumnIndexList={hideColumnIndexList}
                paddingTop={0}
                totalCount={paging.totalCount}
                limitCount={limit.default}
            >
                <TableHeaders>
                    <TableHeader>TX Hash</TableHeader>
                    <TableHeader>Block#</TableHeader>
                    <TableHeader>Time ago</TableHeader>
                    <TableFromToHeader />
                    <TableHeader>
                        Method
                        <InfoTooltip
                            marginLeft={5.5}
                            marginTop={1}
                            size={16}
                            color={methodColor}
                            message={METHOD_TOOLTIP}
                        />
                    </TableHeader>
                    <TableHeader>
                        <TransactionTypeFilter type={type} path={`/block/${blockId}`} />
                    </TableHeader>
                    <TableHeader align="right">Amount ({keyCurrency.unit})</TableHeader>
                    <TableHeader align="right">
                        TX Fee {showGasPrice ? keyCurrency.unit : <NoTXFeeTooltip />}
                    </TableHeader>
                </TableHeaders>

                {hasEmptyResult ? (
                    <Empty />
                ) : (
                    transactions.map((transaction, index) => {
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
                    })
                )}
            </Table>
            {!hasEmptyResult && (
                <Page
                    current={paging.currentPage}
                    total={paging.totalPage}
                    query={{ type }}
                    marginTop={20}
                    paddingBottom={40}
                />
            )}
        </div>
    )
}

export default BlockTransactionTab
