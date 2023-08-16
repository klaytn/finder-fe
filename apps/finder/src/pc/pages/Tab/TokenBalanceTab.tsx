import { FC } from 'react'

import { colors } from '@klaytn/slush'

import { getAccountTokenBalance } from '../../../api/account'
import Empty from '../../../components/commons/empty'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import { TableKlayCell, TableNameWithIconCell, TableTimesAgoCell } from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { getUseDataWithPagingHook } from '../../../hooks/useDataWithPagingHook'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

const useTokenBalance = getUseDataWithPagingHook(getAccountTokenBalance)

export interface ITokenBalanceTabProps {
    tabId: string
    address: string
}

const TokenBalanceTab: FC<ITokenBalanceTabProps> = ({ address }) => {
    const {
        isLoaded,
        paging: { currentPage, totalPage, totalCount },
        results,
    } = useTokenBalance(address)

    const whiteColor = useFinderThemeColor(colors.white)

    if (isLoaded && totalCount === 0) {
        return <Empty />
    }

    return (
        <>
            <Table columnSizeList={[516, 180, 300, 220]} paddingTop={0} totalCount={totalCount}>
                <TableHeaders>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Symbol</TableHeader>
                    <TableHeader>Balance</TableHeader>
                    <TableHeader align="right">Latest transaction</TableHeader>
                </TableHeaders>

                {results.map(
                    ({ info: { contractAddress, name, symbol, icon }, balance, latestTransactionDateTime }, index) => {
                        return (
                            <TableRow key={index}>
                                <TableNameWithIconCell name={name} link={`/token/${contractAddress}`} iconUri={icon} />
                                <TableCell color={whiteColor} bold>
                                    {symbol}
                                </TableCell>
                                <TableKlayCell value={balance} symbol={symbol} />
                                <TableTimesAgoCell align="right" value={latestTransactionDateTime} />
                            </TableRow>
                        )
                    },
                )}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId: 'tokenBalance' }} />
        </>
    )
}

export default TokenBalanceTab
