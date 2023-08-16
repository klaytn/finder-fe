import { colors } from '@klaytn/slush'

import { getAccountNftKip17Balance, getAccountNftKip37Balance } from '../../../api/account'
import Empty from '../../../components/commons/empty'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import { TableLinkCell, TableNameWithIconCell, TableTimesAgoCell } from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { withCommas } from '../../../functions/Functions'
import { getUseDataWithPagingHook } from '../../../hooks/useDataWithPagingHook'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

export interface INftBalanceTabProps {
    tabId: string
    address: string
    type: 'KIP17' | 'KIP37'
}

const NftBalanceTab = ({ address, type, tabId }: INftBalanceTabProps) => {
    const api = type === 'KIP17' ? getAccountNftKip17Balance : getAccountNftKip37Balance
    const useNftBalance = getUseDataWithPagingHook(api)

    const {
        paging: { currentPage, totalPage, totalCount },
        results,
        isLoaded,
    } = useNftBalance(address)

    const whiteColor = useFinderThemeColor(colors.white)

    if (isLoaded && totalCount === 0) {
        return <Empty />
    }

    return (
        <>
            <Table columnSizeList={[480, 160, 200, 140, 200]} paddingTop={0} totalCount={totalCount}>
                <TableHeaders>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Symbol</TableHeader>
                    <TableHeader>Token ID</TableHeader>
                    <TableHeader>Token Count</TableHeader>
                    <TableHeader align="right">Latest transaction</TableHeader>
                </TableHeaders>

                {results.map(
                    (
                        { info: { icon, name, symbol, contractAddress }, tokenCount, tokenId, latestTransaction },
                        index,
                    ) => {
                        return (
                            <TableRow key={index}>
                                <TableNameWithIconCell name={name} link={`/nft/${contractAddress}`} iconUri={icon} />
                                <TableCell color={whiteColor} bold>
                                    {symbol}
                                </TableCell>
                                <TableCell color={whiteColor}>{tokenId || '-'}</TableCell>
                                <TableLinkCell
                                    link={`/nft/${contractAddress}?tabId=nftInventory&search=${address}`}
                                    value={withCommas(tokenCount)}
                                />
                                <TableTimesAgoCell align="right" value={latestTransaction} />
                            </TableRow>
                        )
                    },
                )}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId }} />
        </>
    )
}

export default NftBalanceTab
