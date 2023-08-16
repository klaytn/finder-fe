import { useEffect, useState } from 'react'

import { colors } from '@klaytn/slush'

import { getAccountInternalTxs } from '../../../api/account'
import { defaultPage, Paging } from '../../../api/api'
import { Transaction } from '../../../api/transaction'
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
import { getMethodName } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'

export interface IAccountInternalTxTabProps {
    tabId: string
    address: string
}

const AccountInternalTxTab = ({ tabId, address }: IAccountInternalTxTabProps) => {
    const query = useQuery()
    const { keyCurrency } = useResources()
    const { showGasPrice = false } = useFeatures()
    const {
        paging: { limit },
    } = useServerConfig()

    const [internalTxs, setInternalTxs] = useState<Transaction[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const [isLoaded, setIsLoaded] = useState(false)

    const type = query.get('type') || ''
    const page = query.get('page') || '1'

    const fetchInternalTxs = async (address: string, page: string) => {
        getAccountInternalTxs(address, page).then((rsp) => {
            setInternalTxs(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        fetchInternalTxs(address, page)
    }, [address, page])

    const methodColor = useFinderThemeColor(colors.white)

    if (isLoaded && paging.totalCount === 0) {
        return <Empty />
    }

    return (
        <div>
            <Table
                columnSizeList={[200, 160, 142, 358, 100, 200]}
                paddingTop={0}
                totalCount={paging.totalCount}
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

                {internalTxs.map((internalTx, index) => {
                    const failed = !!internalTx.error

                    return (
                        <TableRow key={index} failed={failed} failMessage={internalTx.error}>
                            <TableHashCell value={internalTx.transactionHash} failed={failed} />
                            <TableBlockIdCell value={internalTx.blockId} />
                            <TableTimesAgoCell value={internalTx.datetime} />
                            <TableFromToCell
                                from={internalTx.from}
                                to={internalTx.to}
                                selectedAddress={address}
                                failed={failed}
                            />
                            <TableCell color={methodColor} tooltip>
                                {getMethodName(internalTx.signature, internalTx.methodId)}
                            </TableCell>
                            <TableKlayCell value={internalTx.amount} align="right" />
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={paging.currentPage} total={paging.totalPage} query={{ tabId: tabId, type: type }} />
        </div>
    )
}

export default AccountInternalTxTab
