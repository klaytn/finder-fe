import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { colors, ContextMenuItem, Flex, If, Input, SearchNormalIcon, Text, typos } from '@klaytn/slush'

import { AccountNftFilterItem, getAccountNftFilterItem, getAccountNftTransfers } from '../../../api/account'
import { defaultPage, Paging } from '../../../api/api'
import { getNftNftTransfers } from '../../../api/nft'
import { getNftTransfers, NftTransfer } from '../../../api/transaction'
import Empty from '../../../components/commons/empty'
import { Table, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import {
    TableBlockIdCell,
    TableFromToCell,
    TableFromToHeader,
    TableHashCell,
    TableNameWithIconCell,
    TableNumberCell,
    TableTimesAgoCell,
    TableTokenIdCell,
} from '../../../components/commons/table/variants'
import Filter from '../../../components/Filter'
import Page from '../../../components/Page'
import { useServerConfig } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import useSearch from '../../../hooks/useSearch'

export interface INftTransferTabProps {
    tabId: string
    txHash?: string
    address?: string
    nftAddress?: string
    tokenId?: string
    parentPage: 'account' | 'nft' | 'nftItem' | 'tx'
    isLightType?: boolean
    hasHolders?: boolean
}

const SELECT_ALL = 'SELECT_ALL'

function accountNftFilterItemToFilterItem(accountNftFilterItem: AccountNftFilterItem[]): ContextMenuItem[] {
    const result = accountNftFilterItem.map((filterItem) => {
        return {
            label: filterItem.contractName,
            value: filterItem.contractAddress,
        }
    })

    return [{ label: 'Select All', value: SELECT_ALL }, ...result]
}

const NftTransferTab = ({
    tabId,
    txHash,
    address,
    nftAddress,
    tokenId,
    parentPage,
    isLightType,
    hasHolders,
}: INftTransferTabProps) => {
    const query = useQuery()
    const navigate = useNavigate()
    const [nftTransfers, setNftTransfers] = useState<NftTransfer[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const [accountNftFilterItems, setAccountNftFilterItems] = useState<ContextMenuItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const {
        paging: { limit },
    } = useServerConfig()

    const page = query.get('page') || '1'
    const filter = query.get('filter') || ''
    const search = tokenId || query.get('search') || ''

    const hideColumnIndexList = useMemo(() => {
        switch (parentPage) {
            case 'account':
                return []

            case 'nft':
                return isLightType ? [4] : [4, 5]

            case 'nftItem':
                return hasHolders ? [4, 6] : [4, 5, 6]

            case 'tx':
            default:
                return [0, 5]
        }
    }, [parentPage, isLightType, hasHolders])

    const fetchNftTransfers = async (txHash: string, page: string) => {
        getNftTransfers(txHash, page).then((rsp) => {
            setNftTransfers(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    const fetchNftNftTransfers = async (nftAddress: string, page: string, tokenId?: string) => {
        getNftNftTransfers(nftAddress, page, tokenId).then((rsp) => {
            setNftTransfers(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    const fetchAccountNftTransfers = async (address: string, page: string, filter?: string) => {
        getAccountNftTransfers(address, page, filter).then((rsp) => {
            setNftTransfers(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    const fetchAccountNftFilters = async (address: string) => {
        const { data } = await getAccountNftFilterItem(address)
        setAccountNftFilterItems(accountNftFilterItemToFilterItem(data))
    }

    useEffect(() => {
        if (txHash !== undefined) {
            fetchNftTransfers(txHash, page)
        }
    }, [txHash, page])

    useEffect(() => {
        if (nftAddress !== undefined) {
            fetchNftNftTransfers(nftAddress, page, search)
        }
    }, [page, nftAddress, search])

    useEffect(() => {
        if (address !== undefined) {
            fetchAccountNftTransfers(address, page, filter)
        }
    }, [address, page, filter])

    useEffect(() => {
        if (address !== undefined) {
            fetchAccountNftFilters(address)
        }
    }, [address])

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

    const { searchRef, handleClear, handleSearch, searchState } = useSearch({
        keepQueries: ['tabId'],
    })

    const colorSet = useFinderThemeColorSet({
        searchDesc: colors.black[400],
        white: colors.white,
        highlight: colors.blue[400],
    })

    if (isLoaded && paging.totalCount === 0) {
        return <Empty />
    }

    return (
        <div>
            <Table
                columnSizeList={[113, 100, 64, 376, 224, 111, 144]}
                hideColumnIndexList={hideColumnIndexList}
                paddingTop={0}
                totalCount={paging.totalCount}
                limitCount={limit.default}
                hideTotalCount={!!query.get('search')}
                decorator={
                    <If condition={tokenId === undefined && nftAddress !== undefined}>
                        <SearchBar direction="row" justifyContent="space-between">
                            <SearchResultContainer direction="row">
                                <If condition={!!search}>
                                    <SearchCountText color={colorSet.searchDesc} typo={typos.suit['14.18_400']}>
                                        A Total of <SearchHighlight>{paging.totalCount}</SearchHighlight> records are
                                        found.
                                    </SearchCountText>
                                </If>
                            </SearchResultContainer>
                            <SearchContainer>
                                <Input
                                    ref={searchRef}
                                    value={searchState.value}
                                    onChange={searchState.handleChange}
                                    onClear={handleClear}
                                    placeholder="Search by Token ID..."
                                    hasClearButton
                                    rightIcon={SearchNormalIcon}
                                    onRightIconClick={handleSearch}
                                    onEnter={handleSearch}
                                    type="number"
                                />
                            </SearchContainer>
                        </SearchBar>
                    </If>
                }
            >
                <TableHeaders>
                    <TableHeader>TX Hash</TableHeader>
                    <TableHeader>Block #</TableHeader>
                    <TableHeader>Time ago</TableHeader>
                    <TableFromToHeader />
                    <TableHeader>
                        <Filter
                            title="NFT"
                            items={accountNftFilterItems}
                            onSelect={handleFilterSelect}
                            selectedItem={accountNftFilterItems.find(({ value }) => value === filter)}
                        />
                    </TableHeader>
                    <TableHeader align="right">Token Count</TableHeader>
                    <TableHeader align="right">Token ID</TableHeader>
                </TableHeaders>

                {nftTransfers.map((nftTransfer, index) => {
                    return (
                        <TableRow key={index}>
                            <TableHashCell value={nftTransfer.transactionHash} icon={false} />
                            <TableBlockIdCell value={nftTransfer.blockId} />
                            <TableTimesAgoCell value={nftTransfer.datetime} />
                            <TableFromToCell from={nftTransfer.from} to={nftTransfer.to} selectedAddress={address} />
                            <TableNameWithIconCell
                                name={nftTransfer.nft.name}
                                link={`/nft/${nftTransfer.nft.contractAddress}`}
                                iconUri={nftTransfer.nft.icon}
                                iconAlt="token image"
                            />
                            <TableNumberCell align="right" value={nftTransfer.tokenCount} />
                            <TableTokenIdCell
                                contractAddress={nftTransfer.nft.contractAddress}
                                tokenId={nftTransfer.tokenId}
                                copyButtonPosition="right"
                            />
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={paging.currentPage} total={paging.totalPage} query={{ tabId, search }} />
        </div>
    )
}

const SearchHighlight = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_900'],
        color: colors.blue[400],
    }),
)`
    max-width: 334px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const SearchBar = styled(Flex)`
    align-items: center;
    margin-bottom: 40px;
    flex-grow: 1;
`

const SearchResultContainer = styled(Flex)`
    align-items: center;
`

const SearchCountText = styled(Text)`
    margin-left: 2px;
`

const SearchContainer = styled(Flex)`
    width: 500px;
`

export default NftTransferTab
