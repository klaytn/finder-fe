import styled from 'styled-components'

import { colors, Flex, If, Input, SearchNormalIcon, Text, typos } from '@klaytn/slush'

import { getNftInventories } from '../../../api/nft'
import Empty from '../../../components/commons/empty'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import { TableCopyCell, TableHashCell, TableTokenIdCell } from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { useServerConfig } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { isAddress, withCommas } from '../../../functions/Functions'
import { getUseDataWithPagingHook } from '../../../hooks/useDataWithPagingHook'
import { useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import useSearch from '../../../hooks/useSearch'

const useNftInventories = getUseDataWithPagingHook(getNftInventories)

type NftInventoryTab = {
    nftAddress: string
}

const NftInventoryTab = ({ nftAddress }: NftInventoryTab) => {
    const query = useQuery()
    const tabId = query.get('tabId')
    const search = query.get('search') || undefined
    const {
        paging: { limit },
    } = useServerConfig()

    const {
        isLoaded,
        results,
        paging: { currentPage, totalPage, totalCount },
    } = useNftInventories(nftAddress, search)

    const { searchRef, handleClear, handleSearch, searchState } = useSearch({
        keepQueries: ['tabId'],
    })

    const isAddressSearched = isAddress(search || '')
    const isTokenSearched = !!search && !isAddressSearched

    const colorSet = useFinderThemeColorSet({
        searchDesc: colors.black[400],
        white: colors.white,
        highlight: colors.blue[400],
    })

    if (isLoaded && totalCount === 0) {
        return <Empty />
    }

    return (
        <>
            <Table
                paddingTop={0}
                columnSizeList={[326, 132, 330, 428]}
                totalCount={totalCount}
                limitCount={limit.nftInventory}
                hideTotalCount={!!search}
                decorator={
                    <SearchBar direction="row" justifyContent="space-between">
                        <SearchResultContainer direction="row">
                            <If condition={isAddressSearched || isTokenSearched}>
                                <SearchCountText color={colorSet.searchDesc} typo={typos.suit['14.18_400']}>
                                    A Total of <SearchHighlight>{totalCount}</SearchHighlight> records are found.
                                </SearchCountText>
                            </If>
                        </SearchResultContainer>
                        <SearchContainer>
                            <Input
                                ref={searchRef}
                                value={searchState.value}
                                onInput={searchState.handleChange}
                                onClear={handleClear}
                                placeholder="Search by Token ID / Holder Address..."
                                hasClearButton
                                rightIcon={SearchNormalIcon}
                                onRightIconClick={handleSearch}
                                onEnter={handleSearch}
                            />
                        </SearchContainer>
                    </SearchBar>
                }
            >
                <TableHeaders>
                    <TableHeader>Token ID</TableHeader>
                    <TableHeader>Token Count</TableHeader>
                    <TableHeader>Holder</TableHeader>
                    <TableHeader>Token URI</TableHeader>
                </TableHeaders>

                {results.map(({ holder, tokenId, tokenUri, tokenCount }, index) => {
                    return (
                        <TableRow key={index}>
                            <TableTokenIdCell
                                contractAddress={nftAddress}
                                tokenId={tokenId}
                                copyButtonPosition="left"
                                align="left"
                            />
                            <TableCell color={colorSet.white}>{withCommas(tokenCount)}</TableCell>
                            <TableHashCell value={holder} />
                            <TableCopyCell
                                align="left"
                                value={tokenUri || '-'}
                                message="Token URI copied."
                                justifyContent="flex-start"
                            />
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId, search }} />
        </>
    )
}

const SearchHighlight = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_900'],
        color: colors.blue[400],
    }),
)``

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

export default NftInventoryTab
