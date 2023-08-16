import styled from 'styled-components'

import { colors, Flex, If, Input, SearchNormalIcon, Text, typos } from '@klaytn/slush'

import { useTokenHolders } from '../../../api/token'
import Empty from '../../../components/commons/empty'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import { TableHashCell, TableKlayCell } from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { useServerConfig } from '../../../context/configProvider'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import useSearch from '../../../hooks/useSearch'

type TokenHolderTabProps = {
    tokenAddress: string
}

const TokenHolderTab = ({ tokenAddress }: TokenHolderTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const search = query.get('search') || undefined
    const {
        paging: { limit },
    } = useServerConfig()

    const { currentPage, totalPage, startIndex, results, totalCount } = useTokenHolders(tokenAddress, page, 20, search)

    const whiteColor = useFinderThemeColor(colors.white)

    const colorSet = useFinderThemeColorSet({
        searchDesc: colors.black[400],
        white: colors.white,
        highlight: colors.blue[400],
    })

    const { searchRef, handleClear, handleSearch, searchState } = useSearch({
        keepQueries: ['tabId'],
    })

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <>
            <Table
                columnSizeList={[100, 460, 360, 296]}
                paddingTop={0}
                totalCount={totalCount}
                limitCount={limit.tokenHolder}
                hideTotalCount={!!search}
                decorator={
                    <SearchBar direction="row" justifyContent="space-between">
                        <SearchResultContainer direction="row">
                            <If condition={!!search}>
                                <SearchCountText color={colorSet.searchDesc} typo={typos.suit['14.18_400']}>
                                    A Total of{' '}
                                    <SearchHighlight color={colorSet.highlight}>{totalCount}</SearchHighlight> records
                                    are found.
                                </SearchCountText>
                            </If>
                        </SearchResultContainer>
                        <SearchContainer>
                            <Input
                                ref={searchRef}
                                value={searchState.value}
                                onInput={searchState.handleChange}
                                onClear={handleClear}
                                placeholder="Search by Holder address"
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
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>Address</TableHeader>
                    <TableHeader align="right">Amount</TableHeader>
                    <TableHeader align="right">Percentage</TableHeader>
                </TableHeaders>

                {results.map(({ holder, amount, percentage }, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell color={whiteColor} bold>
                                {startIndex + index}
                            </TableCell>
                            <TableHashCell value={holder} icon />
                            <TableKlayCell align="right" value={amount} />
                            <TableCell align="right" color={whiteColor}>
                                {percentage}%
                            </TableCell>
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId: 'tokenHolder' }} />
        </>
    )
}
const SearchHighlight = styled(Text).attrs({
    typo: typos.suit['14.18_900'],
})``

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

export default TokenHolderTab
