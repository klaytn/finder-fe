import { Suspense, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button, ChevronRightIcon, colors, Flex, ProgressCircle, Switch, Tabs, Text, typos } from '@klaytn/slush'

import { useSearchAccount } from '../../../api/account'
import { useSearchNft } from '../../../api/nft'
import { useSearchToken } from '../../../api/token'
import Empty from '../../../components/commons/empty'
import AccountSearchResultList from '../../../components/pc/search/accountSearchResultList'
import TokenOfNftShortSearchResult from '../../../components/pc/search/tokenOrNftShortSearchResult'
import TokenOrNftTableSearchResult from '../../../components/pc/search/tokenOrNftTableSearchResult'
import { useFeatures } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { findUniquePositiveNumber, withCommas } from '../../../functions/Functions'
import useQuery from '../../../hooks/useQuery'
import { SearchQueryName, useSearchValue } from '../../../hooks/useSearchBar'
import { useTabQuery } from '../../../hooks/useTabQuery'
import { SortDirection, SortType } from '../../../types/search'

const TAB_LIST = ['account', 'token', 'nft']

const SearchAll = () => {
    const { accountSearch = false } = useFeatures()
    const { keyword, tag, page, accountSearchType } = useSearchValue()
    const navigate = useNavigate()

    const accountSearchResult = useSearchAccount(accountSearch, tag || keyword, page, accountSearchType, 20)
    const tokenSearchResult = useSearchToken(keyword, page, 20)
    const nftSearchResult = useSearchNft(keyword, page, 20)
    const totalCount = accountSearchResult.totalCount + tokenSearchResult.totalCount + nftSearchResult.totalCount
    const indexOfUniqueNonemptyResult = findUniquePositiveNumber(
        accountSearchResult.totalCount,
        tokenSearchResult.totalCount,
        nftSearchResult.totalCount,
    )

    const tabs = useMemo(() => {
        return [
            {
                name: 'All',
                value: 'all',
                disabled: indexOfUniqueNonemptyResult !== -1,
            },
            ...(accountSearch
                ? [
                      {
                          name: `Accounts (${withCommas(accountSearchResult.totalCount)})`,
                          value: 'account',
                          disabled: accountSearchResult.totalCount === 0,
                          description: accountSearchResult.totalCount === 0 ? 'There is no data' : '',
                      },
                  ]
                : []),
            {
                name: `Tokens (${withCommas(tokenSearchResult.totalCount)})`,
                value: 'token',
                disabled: tokenSearchResult.totalCount === 0,
                description: tokenSearchResult.totalCount === 0 ? 'There is no data' : '',
            },
            {
                name: `NFT (${withCommas(nftSearchResult.totalCount)})`,
                value: 'nft',
                disabled: nftSearchResult.totalCount === 0,
                description: nftSearchResult.totalCount === 0 ? 'There is no data' : '',
            },
        ]
    }, [accountSearchResult, tokenSearchResult, nftSearchResult, accountSearch, indexOfUniqueNonemptyResult])

    const { selectedTab, handleTabChange } = useTabQuery(tabs, {
        keepQueryName: [SearchQueryName.Keyword, SearchQueryName.Tag],
        initialTabIndex: indexOfUniqueNonemptyResult === -1 ? 0 : indexOfUniqueNonemptyResult + 1,
    })

    const [handleViewMoreOnAccount, handleViewMoreOnToken, handleViewMoreOnNft] = useMemo(() => {
        const createHandleViewMore = (tabId: string) => () => {
            const nextQueryMap = new URLSearchParams()
            if (keyword) {
                nextQueryMap.set('keyword', keyword)
            }
            if (tag) {
                nextQueryMap.set('tag', tag)
            }

            nextQueryMap.set('tabId', tabId)
            navigate({
                search: nextQueryMap.toString(),
            })
            window.scrollTo({
                top: 0,
            })
        }

        return TAB_LIST.map((tabId) => createHandleViewMore(tabId))
    }, [keyword, tag, navigate])

    const query = useQuery()
    const tabId = query.get('tabId')
    useEffect(() => {
        if (tabId !== 'all') {
            return
        }

        if (indexOfUniqueNonemptyResult === -1) {
            return
        }

        switch (indexOfUniqueNonemptyResult) {
            case 0:
                handleViewMoreOnAccount()
                return

            case 1:
                handleViewMoreOnToken()
                return

            case 2:
                handleViewMoreOnNft()
                return

            case -1:
            default:
                return
        }
    }, [tabId, indexOfUniqueNonemptyResult, handleViewMoreOnAccount, handleViewMoreOnToken, handleViewMoreOnNft])

    return (
        <>
            <Container>
                <SearchResultContainer>
                    <SearchResultNormalText>A total of </SearchResultNormalText>
                    <SearchResultStrongText>{withCommas(totalCount)}</SearchResultStrongText>
                    <SearchResultNormalText>records are found.</SearchResultNormalText>
                </SearchResultContainer>
                <TabContainer>
                    <Tabs
                        selected={selectedTab}
                        tabs={tabs}
                        onChange={handleTabChange}
                        size="large"
                        reversePadding={20}
                    />
                </TabContainer>
                <Switch variable={selectedTab}>
                    <Switch.Case value="all">
                        {totalCount === 0 && <Empty />}

                        {accountSearchResult.totalCount > 0 && (
                            <>
                                <AccountSearchResultList result={accountSearchResult} />
                                <More onClick={handleViewMoreOnAccount} />
                            </>
                        )}

                        {tokenSearchResult.totalCount > 0 && (
                            <>
                                <TokenOfNftShortSearchResult
                                    title="Tokens"
                                    keyword={keyword}
                                    totalCount={tokenSearchResult.totalCount}
                                    tokens={tokenSearchResult.results}
                                    cellProps={{
                                        link: '/token',
                                        alt: 'token image',
                                    }}
                                />
                                <More onClick={handleViewMoreOnToken} />
                            </>
                        )}

                        {nftSearchResult.totalCount > 0 && (
                            <>
                                <TokenOfNftShortSearchResult
                                    title="NFTs"
                                    keyword={keyword}
                                    totalCount={nftSearchResult.totalCount}
                                    tokens={nftSearchResult.results}
                                    cellProps={{
                                        link: '/nft',
                                        alt: 'nft image',
                                    }}
                                />
                                <More onClick={handleViewMoreOnNft} />
                            </>
                        )}
                    </Switch.Case>
                    <Switch.Case value="account">
                        <Suspense fallback={<ProgressCircle show />}>
                            <AccountSearchResultList result={accountSearchResult} showPagination />
                        </Suspense>
                    </Switch.Case>
                    <Switch.Case value="token">
                        <Suspense fallback={<ProgressCircle show />}>
                            <TokenTableSearchResult keyword={keyword} totalCount={tokenSearchResult.totalCount} />
                        </Suspense>
                    </Switch.Case>
                    <Switch.Case value="nft">
                        <Suspense fallback={<ProgressCircle show />}>
                            <NftTableSearchResult keyword={keyword} totalCount={nftSearchResult.totalCount} />
                        </Suspense>
                    </Switch.Case>
                </Switch>
            </Container>
        </>
    )
}

type TableSearchResultProps = {
    keyword: string
    totalCount: number
}

const TokenTableSearchResult = ({ keyword, totalCount }: TableSearchResultProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const sortType = (query.get('sortType') as SortType) || null
    const sortDirection = (query.get('sortDirection') as SortDirection) || null
    const fromDate = query.get('fromDate') || null
    const toDate = query.get('toDate') || null

    const searchResult = useSearchToken(keyword, page, 20, { fromDate, toDate, sortType, sortDirection })

    return (
        <TokenOrNftTableSearchResult
            tabId="token"
            linkTo="/token"
            title="Tokens"
            keyword={keyword}
            totalCount={totalCount}
            searchResult={searchResult}
        />
    )
}

const NftTableSearchResult = ({ keyword, totalCount }: TableSearchResultProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const sortType = query.get('sortType') || null
    const sortDirection = query.get('sortDirection') || null
    const fromDate = query.get('fromDate') || null
    const toDate = query.get('toDate') || null

    const searchResult = useSearchNft(keyword, page, 20, { fromDate, toDate, sortType, sortDirection })

    return (
        <TokenOrNftTableSearchResult
            tabId="nft"
            linkTo="/nft"
            title="NFTs"
            keyword={keyword}
            totalCount={totalCount}
            searchResult={searchResult}
        />
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const SearchResultContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'left',
})`
    align-items: center;
`

const SearchResultNormalText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_400'],
        color: colors.blue[400],
    }),
)`
    margin-bottom: 4px;
    margin-right: 4px;
`
const SearchResultStrongText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_900'],
        color: colors.blue[400],
    }),
)`
    margin-right: 4px;
    margin-bottom: 4px;
`

const TabContainer = styled(Flex)`
    margin-top: 20px;
`

type MoreProps = {
    onClick: () => void
}

const More = ({ onClick }: MoreProps) => {
    return (
        <MoreContainer>
            <MoreButton buttonType="forth" onClick={onClick} rightIcon={ChevronRightIcon}>
                View more
            </MoreButton>
        </MoreContainer>
    )
}

const MoreContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 32px;
    margin-bottom: 48px;
`

const MoreButton = styled(Button)`
    width: 200px;
`

export default SearchAll
