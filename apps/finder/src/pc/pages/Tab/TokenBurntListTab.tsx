import { useTokenBurntList } from '../../../api/token'
import Empty from '../../../components/commons/empty'
import { Table, TableHeaders, TableHeader, TableRow } from '../../../components/commons/table/basic'
import {
    TableBlockIdCell,
    TableFromToCell,
    TableFromToHeader,
    TableHashCell,
    TableKlayCell,
    TableTimesAgoCell,
} from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { useServerConfig } from '../../../context/configProvider'
import useQuery from '../../../hooks/useQuery'

export interface ITokenBurntListTabProps {
    tabId: string
    tokenAddress: string
}

const TokenBurntListTab = ({ tabId, tokenAddress }: ITokenBurntListTabProps) => {
    const query = useQuery()
    const {
        paging: { limit },
    } = useServerConfig()

    const page = query.get('page') || '1'

    const { results, currentPage, totalCount, totalPage } = useTokenBurntList(tokenAddress, page, 20)

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <div>
            <Table
                columnSizeList={[200, 160, 142, 486, 200]}
                paddingTop={0}
                totalCount={totalCount}
                limitCount={limit.default}
            >
                <TableHeaders>
                    <TableHeader>TX Hash</TableHeader>
                    <TableHeader>Block#</TableHeader>
                    <TableHeader>Time ago</TableHeader>
                    <TableFromToHeader />
                    <TableHeader align="right">Amount</TableHeader>
                </TableHeaders>

                {results.map((tokenBurnt, index) => {
                    return (
                        <TableRow key={index}>
                            <TableHashCell value={tokenBurnt.txHash} />
                            <TableBlockIdCell value={tokenBurnt.blockId} />
                            <TableTimesAgoCell value={tokenBurnt.datetime} />
                            <TableFromToCell from={tokenBurnt.from} to={tokenBurnt.to} />
                            <TableKlayCell value={tokenBurnt.amount} align="right" />
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId }} />
        </div>
    )
}

export default TokenBurntListTab
