import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ChevronRightIcon, colors, typos, VerticalDivider } from '@klaytn/slush'

import { getAccountTransactions } from '../../../api/account'
import { defaultPage, Paging } from '../../../api/api'
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
import { ROUTES } from '../../../constants/routes'
import { useFeatures, useResources, useServerConfig } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { TransactionListItemVO } from '../../../vo/transaction'

export interface ITransactionTabProps {
    tabId: string
    address: string
}

const TransactionTab = ({ tabId, address }: ITransactionTabProps) => {
    const query = useQuery()
    const path = useLocation()
    const { keyCurrency } = useResources()
    const { showGasPrice = false } = useFeatures()
    const {
        paging: { limit },
    } = useServerConfig()

    const [transactions, setTransactions] = useState<TransactionListItemVO[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const [isLoaded, setIsLoaded] = useState(false)

    const type = query.get('type') || ''
    const page = query.get('page') || '1'

    useEffect(() => {
        const fetchTransactions = async (address: string, type: string, page: string) => {
            getAccountTransactions(address, type, page).then((rsp) => {
                setTransactions(rsp.data.results.map((tx) => new TransactionListItemVO(tx, keyCurrency)))
                setPaging(rsp.data.paging)
                setIsLoaded(true)
            })
        }

        fetchTransactions(address, type, page)
    }, [address, type, page, keyCurrency])

    const hasEmptyResult = isLoaded && paging.totalCount === 0
    const hasEmptyResultWithoutType = isLoaded && paging.totalCount === 0 && type === ''

    const methodColor = useFinderThemeColor(colors.white)

    const hideColumnIndexList = useMemo(() => (showGasPrice ? [] : [7]), [showGasPrice])

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
                limitCount={limit.transaction}
                decorator={<SearchTx address={address} />}
            >
                <TableHeaders>
                    <TableHeader>TX Hash</TableHeader>
                    <TableHeader>Block#</TableHeader>
                    <TableHeader>Time ago</TableHeader>
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
                        <TransactionTypeFilter type={type} path={`${path.pathname}?tabId=${tabId}`} />
                    </TableHeader>
                    <TableHeader align="right">
                        {showGasPrice ? (
                            <>Amount ({keyCurrency.unit})</>
                        ) : (
                            <>
                                TX Fee <NoTXFeeTooltip />
                            </>
                        )}
                    </TableHeader>
                    <TableHeader align="right">TX Fee ({keyCurrency.unit})</TableHeader>
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
                                <TableFromToCell
                                    from={transaction.from}
                                    to={transaction.to}
                                    failed={failed}
                                    selectedAddress={address}
                                />
                                <TableCell color={methodColor} tooltip>
                                    {transaction.method}
                                </TableCell>
                                <TableTxTypeCell type={transaction.type} />
                                <TableKlayCell align="right" value={transaction.amount} />
                                <TableKlayCell align="right" value={transaction.fee} />
                            </TableRow>
                        )
                    })
                )}
            </Table>
            {!hasEmptyResult && (
                <Page current={paging.currentPage} total={paging.totalPage} query={{ tabId: tabId, type: type }} />
            )}
        </div>
    )
}

type SearchTxProps = {
    address: string
}
const SearchTx = ({ address }: SearchTxProps) => {
    const iconColor = useFinderThemeColor(colors.blue[400])
    const fromLinkParams = useMemo(() => {
        const search = new URLSearchParams({
            currentTime: 'true',
            from: address,
        }).toString()

        return {
            pathname: ROUTES.TX.LIST,
            search,
        }
    }, [address])

    const toLinkParams = useMemo(() => {
        const search = new URLSearchParams({
            currentTime: 'true',
            to: address,
        }).toString()

        return {
            pathname: ROUTES.TX.LIST,
            search,
        }
    }, [address])

    return (
        <SearchTxContainer>
            <SearchTxText>Search TXs</SearchTxText>
            <SearchTxLink to={fromLinkParams}>
                From this address <ChevronRightIcon size={14} color={iconColor} />
            </SearchTxLink>
            <SearchTxDivider />
            <SearchTxLink to={toLinkParams}>
                To this address <ChevronRightIcon size={14} color={iconColor} />
            </SearchTxLink>
        </SearchTxContainer>
    )
}

const SearchTxContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 7px;
`

const SearchTxText = styled.div`
    display: flex;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_400']};
`

const SearchTxDivider = styled(VerticalDivider)`
    height: 16px;
    margin-top: 1px;
`

const SearchTxLink = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    color: ${getThemeColor(colors.blue[400])};
    ${typos.suit['14.18_900']};
    margin-bottom: 40px;
`

export default TransactionTab
