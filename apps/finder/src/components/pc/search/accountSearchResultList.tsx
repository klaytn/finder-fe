import reactStringReplace from 'react-string-replace'
import styled from 'styled-components'

import { colors, Flex } from '@klaytn/slush'

import { AccountSearchResult } from '../../../api/account'
import { getThemeColor } from '../../../functions/colorMap'
import { withCommas } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { useSearchValue } from '../../../hooks/useSearchBar'
import { AddressVO } from '../../../vo/address'
import { PagingVO } from '../../../vo/paging'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../commons/table/basic'
import { TableHashCell, TableScrollCell } from '../../commons/table/variants'
import Page from '../../Page'
import { PageTitle } from '../pages'
import { Tags } from '../tags'

const formatKeyword = (name: string, keyword: string) => {
    return keyword === ''
        ? name
        : reactStringReplace(name, keyword, (match, index) => (
              <SearchMatchedSpan key={index}>{match}</SearchMatchedSpan>
          ))
}

const ALL_LIST_COUNT_LIMIT = 7
const ACCOUNT_SEARCH_LIMIT = 10000

type AccountSearchResultListProps = {
    showPagination?: boolean
    result: PagingVO<AccountSearchResult, AddressVO>
}

const AccountSearchResultList = ({
    showPagination = false,
    result: { results, currentPage, totalPage, totalCount },
}: AccountSearchResultListProps) => {
    const whiteColor = useFinderThemeColor(colors.white)

    const { keyword, tag } = useSearchValue()

    const accountList = showPagination ? results : results.slice(0, ALL_LIST_COUNT_LIMIT)

    return (
        <>
            <div>
                <Container>
                    <PageTitle>Accounts ({withCommas(totalCount)})</PageTitle>
                </Container>
            </div>
            <Table
                columnSizeList={[300, 416, 200, 300]}
                totalCount={totalCount}
                limitCount={ACCOUNT_SEARCH_LIMIT}
                hideTotalCount
            >
                <TableHeaders>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Address</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Tags</TableHeader>
                </TableHeaders>
                {accountList.map((account, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell color={whiteColor}>
                                {formatKeyword(account.displayName || '', keyword)}
                            </TableCell>
                            <TableHashCell value={account.address} />
                            <TableCell color={whiteColor}>{account.accountType}</TableCell>
                            <TableScrollCell height={22} paddingTop={5}>
                                <Tags tags={account.tags} size="medium" />
                            </TableScrollCell>
                        </TableRow>
                    )
                })}
            </Table>
            {showPagination && (
                <Page current={currentPage} total={totalPage} query={{ tabId: 'account', keyword, tag }} />
            )}
        </>
    )
}

const Container = styled(Flex).attrs({
    justifyContent: 'space-between',
    direction: 'row',
})`
    position: relative;
`

const SearchMatchedSpan = styled.span`
    font-weight: bold;
    color: ${getThemeColor(colors.blue[400])};
`

export default AccountSearchResultList
