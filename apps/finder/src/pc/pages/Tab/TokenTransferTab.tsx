import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ContextMenuItem } from '@klaytn/slush'

import { AccountTokenFilterItem, getAccountTokenFilters, getAccountTokenTransfers } from '../../../api/account'
import { defaultPage, Paging } from '../../../api/api'
import { getTokenTokenTransfers } from '../../../api/token'
import { getTokenTransfers, TokenTransfer } from '../../../api/transaction'
import Empty from '../../../components/commons/empty'
import { Table, TableHeaders, TableHeader, TableRow } from '../../../components/commons/table/basic'
import {
    TableBlockIdCell,
    TableFromToCell,
    TableFromToHeader,
    TableHashCell,
    TableKlayCell,
    TableNameWithIconCell,
    TableTimesAgoCell,
} from '../../../components/commons/table/variants'
import Filter from '../../../components/Filter'
import Page from '../../../components/Page'
import { useServerConfig } from '../../../context/configProvider'
import useQuery from '../../../hooks/useQuery'

export interface ITokenTransferTabProps {
    tabId: string
    txHash?: string
    address?: string
    tokenAddress?: string
    hideTokenColumn?: boolean
    hideTxHashColumn?: boolean
}

const SELECT_ALL = 'SELECT_ALL'

function accountTokenFilterItemToFilterItem(accountTokenFilterItems: AccountTokenFilterItem[]): ContextMenuItem[] {
    const result = accountTokenFilterItems.map((filterItem) => {
        return {
            label: filterItem.contractName,
            value: filterItem.contractAddress,
        }
    })

    return [{ label: 'Select All', value: SELECT_ALL }, ...result]
}

const TokenTransferTab = ({
    tabId,
    txHash,
    address,
    tokenAddress,
    hideTokenColumn = false,
    hideTxHashColumn = false,
}: ITokenTransferTabProps) => {
    const query = useQuery()
    const navigate = useNavigate()
    const [tokenTransfers, setTokenTransfers] = useState<TokenTransfer[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const [accountTokenFilterItems, setAccountTokenFilterItems] = useState<ContextMenuItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const {
        paging: { limit },
    } = useServerConfig()

    const hideColumnIndexList = useMemo(() => {
        const result: number[] = []

        if (hideTxHashColumn) {
            result.push(0)
        }

        if (hideTokenColumn) {
            result.push(4)
        }

        return result
    }, [hideTxHashColumn, hideTokenColumn])

    const page = query.get('page') || '1'
    const filter = query.get('filter') || ''

    const fetchTokenTransfers = async (txHash: string, page: string) => {
        getTokenTransfers(txHash, page).then((rsp) => {
            setTokenTransfers(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    const fetchAccountTokenTransfers = async (address: string, page: string, contractAddress: string) => {
        getAccountTokenTransfers(address, page, contractAddress || undefined).then((rsp) => {
            setTokenTransfers(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    const fetchTokenTokenTransfers = async (tokenAddress: string, page: string) => {
        getTokenTokenTransfers(tokenAddress, page).then((rsp) => {
            setTokenTransfers(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    const fetchAccountTokenFilters = async (address: string) => {
        const { data } = await getAccountTokenFilters(address)
        setAccountTokenFilterItems(accountTokenFilterItemToFilterItem(data))
    }

    useEffect(() => {
        if (txHash !== undefined) {
            fetchTokenTransfers(txHash, page)
        }
    }, [txHash, page])

    useEffect(() => {
        if (tokenAddress !== undefined) {
            fetchTokenTokenTransfers(tokenAddress, page)
        }
    }, [tokenAddress, page])

    useEffect(() => {
        if (address !== undefined) {
            fetchAccountTokenFilters(address)
        }
    }, [address])

    useEffect(() => {
        if (address !== undefined) {
            fetchAccountTokenTransfers(address, page, filter)
        }
    }, [txHash, address, tokenAddress, page, filter])

    const handleFilterSelect = ({ value }: ContextMenuItem) => {
        if (value === filter) {
            return
        }

        query.delete('page')

        if (value === SELECT_ALL) {
            query.delete('filter')
        } else {
            query.set('filter', value || '')
        }

        navigate('?' + query.toString())
    }

    if (isLoaded && paging.totalCount === 0) {
        return <Empty />
    }

    return (
        <div>
            <Table
                columnSizeList={[140, 120, 92, 395, 256, 157]}
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
                        <Filter
                            title="Token"
                            items={accountTokenFilterItems}
                            onSelect={handleFilterSelect}
                            selectedItem={accountTokenFilterItems.find(({ value }) => value === filter)}
                        />
                    </TableHeader>
                    <TableHeader align="right">Amount</TableHeader>
                </TableHeaders>

                {tokenTransfers.map((tokenTransfer, index) => {
                    return (
                        <TableRow key={index}>
                            <TableHashCell value={tokenTransfer.transactionHash} />
                            <TableBlockIdCell value={tokenTransfer.blockId} />
                            <TableTimesAgoCell value={tokenTransfer.datetime} />
                            <TableFromToCell
                                from={tokenTransfer.from}
                                to={tokenTransfer.to}
                                selectedAddress={address}
                            />
                            <TableNameWithIconCell
                                name={tokenTransfer.token.name}
                                link={`/token/${tokenTransfer.token.contractAddress}`}
                                iconUri={tokenTransfer.token.icon}
                                iconAlt="token image"
                            />
                            <TableKlayCell value={tokenTransfer.amount} align="right" />
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={paging.currentPage} total={paging.totalPage} query={{ tabId, filter }} />
        </div>
    )
}

export default TokenTransferTab
