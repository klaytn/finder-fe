import styled from 'styled-components'

import { colors, Flex, If, Input, SearchNormalIcon, Text, typos } from '@klaytn/slush'

import { getNftHolders } from '../../../api/nft'
import Empty from '../../../components/commons/empty'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import { TableHashCell, TableNumberCell, TableTokenIdCell } from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { useServerConfig } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { getUseDataWithPagingHook } from '../../../hooks/useDataWithPagingHook'
import { useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import useSearch from '../../../hooks/useSearch'

const useNftHolders = getUseDataWithPagingHook(getNftHolders)

type NftHolderTabProps = {
    nftAddress: string
    type: string
    tokenId?: string
}

const NftHolderTab = ({ nftAddress, type, tokenId }: NftHolderTabProps) => {
    const query = useQuery()
    const tabId = query.get('tabId')
    const search = tokenId || query.get('search') || ''
    const {
        paging: { limit },
    } = useServerConfig()

    const {
        results,
        paging: { currentPage, totalPage, totalCount },
        startIndex,
        isLoaded,
    } = useNftHolders(nftAddress, search)

    const { searchRef, handleClear, handleSearch, searchState } = useSearch({
        keepQueries: ['tabId'],
    })

    const isKip37 = type === 'KIP37'
    const hasPercentage = !isKip37 || (isKip37 && tokenId !== undefined)

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
                columnSizeList={hasPercentage ? [100, 460, 0, 360, 296] : [200, 496, 220, 300, 0]}
                paddingTop={0}
                totalCount={totalCount}
                limitCount={isKip37 ? limit.nft37Holder : limit.nft17Holder}
                hideTotalCount={!!search}
                decorator={
                    <If condition={tokenId === undefined && isKip37}>
                        <SearchBar direction="row" justifyContent="space-between">
                            <SearchResultContainer direction="row">
                                <If condition={!!search}>
                                    <SearchCountText color={colorSet.searchDesc} typo={typos.suit['14.18_400']}>
                                        A Total of <SearchHighlight>{totalCount}</SearchHighlight> records are found.
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
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>Address</TableHeader>
                    <TableHeader align="right">Token ID</TableHeader>
                    <TableHeader align="right">Amount</TableHeader>
                    <TableHeader align="right">Percentage</TableHeader>
                </TableHeaders>

                {results.map(({ holder, tokenCount, percentage, tokenId }, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell color={colorSet.white} bold>
                                {startIndex + index}
                            </TableCell>
                            <TableHashCell value={holder} icon />
                            <TableTokenIdCell
                                contractAddress={nftAddress}
                                tokenId={tokenId || ''}
                                copyButtonPosition="right"
                            />
                            <TableNumberCell align="right" color={colors.white} value={tokenCount} />
                            <TableCell align="right" color={colorSet.white}>
                                {percentage}%
                            </TableCell>
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId }} />
        </>
    )
}

const SearchBar = styled(Flex)`
    align-items: center;
    margin-bottom: 40px;
    flex-grow: 1;
`

const SearchHighlight = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_900'],
        color: colors.blue[400],
    }),
)``

const SearchResultContainer = styled(Flex)`
    align-items: center;
`

const SearchCountText = styled(Text)`
    margin-left: 2px;
`

const SearchContainer = styled(Flex)`
    width: 500px;
`

export default NftHolderTab
