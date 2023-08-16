import { colors } from '@klaytn/slush'

import { useBlockInternalTx } from '../../../api/block'
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
} from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import NoTXFeeTooltip from '../../../components/pc/noTXFeeTooltip'
import { METHOD_TOOLTIP } from '../../../constants/message'
import { useFeatures, useResources, useServerConfig } from '../../../context/configProvider'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'

export interface BlockInternalTxTabProps {
    tabId: string
    blockId: number | string
}

const BlockInternalTxTab = ({ tabId, blockId }: BlockInternalTxTabProps) => {
    const { keyCurrency } = useResources()
    const { showGasPrice = false } = useFeatures()
    const {
        paging: { limit },
    } = useServerConfig()
    const query = useQuery()

    const page = query.get('page') || '1'
    const { results, totalCount, currentPage, totalPage } = useBlockInternalTx(blockId, page, 20)

    const methodColor = useFinderThemeColor(colors.white)

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <div>
            <Table
                columnSizeList={[200, 160, 142, 358, 100, 200]}
                paddingTop={0}
                totalCount={totalCount}
                limitCount={limit.internalTransaction}
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
                    <TableHeader align="right">
                        {showGasPrice ? (
                            <>Amount ({keyCurrency.unit})</>
                        ) : (
                            <>
                                TX Fee <NoTXFeeTooltip />
                            </>
                        )}
                    </TableHeader>
                </TableHeaders>

                {results.map((internalTx, index) => {
                    return (
                        <TableRow key={index} failed={!internalTx.isSuccess} failMessage={internalTx.failMessage}>
                            <TableHashCell value={internalTx.txHash} failed={!internalTx.isSuccess} />
                            <TableBlockIdCell value={internalTx.blockId} />
                            <TableTimesAgoCell value={internalTx.datetime} />
                            <TableFromToCell from={internalTx.from} to={internalTx.to} failed={!internalTx.isSuccess} />
                            <TableCell color={methodColor} tooltip>
                                {internalTx.method}
                            </TableCell>
                            <TableKlayCell value={internalTx.amount} align="right" />
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId }} />
        </div>
    )
}

export default BlockInternalTxTab
