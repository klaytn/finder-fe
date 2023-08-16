import reactStringReplace from 'react-string-replace'
import styled from 'styled-components'

import { colors, Flex } from '@klaytn/slush'

import { useFeatures } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'
import { withCommas } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { TokenItem } from '../../../types/tokenItem'
import { PagingVO } from '../../../vo/paging'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../commons/table/basic'
import { TableHashCell, TableKlayCell, TableNameWithIconCell } from '../../commons/table/variants'
import Page from '../../Page'
import { PageTitle } from '../pages'
import SearchFilterGroup from './searchFilterGroup'

type TokenOrNftTableSearchResultProps = {
    tabId: 'nft' | 'token'
    title: string
    keyword: string
    searchResult: PagingVO<unknown, TokenItem>
    linkTo: string
    totalCount: number
}

const TokenOrNftTableSearchResult = ({
    tabId,
    title,
    keyword,
    searchResult,
    linkTo,
    totalCount,
}: TokenOrNftTableSearchResultProps) => {
    const { tokenSearchFilter } = useFeatures()
    const queryMap = useQuery()

    const fromDate = queryMap.get('fromDate') || null
    const toDate = queryMap.get('toDate') || null
    const sortType = queryMap.get('sortType') || null
    const sortDirection = queryMap.get('sortDirection') || null

    const whiteColor = useFinderThemeColor(colors.white)

    const formatKeyword = (name: string, keyword: string) => {
        return keyword === ''
            ? name
            : reactStringReplace(name, keyword, (match, index) => <MatchedSpan key={index}>{match}</MatchedSpan>)
    }

    const { results, totalCount: filteredCount, totalPage, currentPage } = searchResult

    const isTotalNumber = filteredCount === totalCount

    return (
        <>
            <div>
                <Container>
                    <PageTitle>
                        {title} (
                        {isTotalNumber ? (
                            withCommas(filteredCount)
                        ) : (
                            <>
                                <HighLight>{withCommas(filteredCount)}</HighLight> of {withCommas(totalCount)}
                            </>
                        )}
                        )
                    </PageTitle>
                    {tokenSearchFilter && <SearchFilterGroup />}
                </Container>
            </div>
            <Table columnSizeList={[396, 120, 400, 300]} totalCount={totalCount}>
                <TableHeaders>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Symbol</TableHeader>
                    <TableHeader>Contract address</TableHeader>
                    <TableHeader align="right">Total supply</TableHeader>
                </TableHeaders>
                {results.map((token, index) => {
                    return (
                        <TableRow key={index}>
                            <TableNameWithIconCell
                                name={formatKeyword(token.info.name, keyword)}
                                link={`${linkTo}/${token.info.contractAddress}`}
                                iconUri={token.info.icon}
                                iconAlt={`${tabId} image`}
                            />
                            <TableCell color={whiteColor} bold>
                                {token.info.symbol}
                            </TableCell>
                            <TableHashCell value={token.info.contractAddress} />
                            <TableKlayCell value={token.totalSupply} length={14} align="right" />
                        </TableRow>
                    )
                })}
            </Table>
            <Page
                current={currentPage}
                total={totalPage}
                query={{ tabId, keyword, fromDate, toDate, sortType, sortDirection }}
            />
        </>
    )
}

const HighLight = styled.span`
    color: ${getThemeColor(colors.blue[400])};
`

const Container = styled(Flex).attrs({
    justifyContent: 'space-between',
    direction: 'row',
})`
    position: relative;
`

const MatchedSpan = styled.span`
    font-weight: bold;
    color: ${getThemeColor(colors.blue[400])};
`

export default TokenOrNftTableSearchResult
