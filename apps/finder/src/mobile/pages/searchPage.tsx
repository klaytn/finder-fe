import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { Flex, If, Tabs } from '@klaytn/slush'

import { useSearchAccount } from '../../api/account'
import { useSearchNft } from '../../api/nft'
import { useSearchToken } from '../../api/token'
import Empty from '../../components/commons/empty'
import { useFeatures } from '../../context/configProvider'
import { findUniquePositiveNumber, withCommas } from '../../functions/Functions'
import useQuery from '../../hooks/useQuery'
import { SearchQueryName, useSearchValue } from '../../hooks/useSearchBar'
import { useTabQuery } from '../../hooks/useTabQuery'
import AccountItemBox from '../components/search/accountItemBox'
import LongSearchResult from '../components/search/longSearchResult'
import ShortSearchResult from '../components/search/shortSearchResult'
import TokenItemBox from '../components/token/list/tokenItemBox'

const SearchPage = () => {
    const { accountSearch = false } = useFeatures()
    const { keyword, tag, page, accountSearchType } = useSearchValue()

    const accountSearchResult = useSearchAccount(accountSearch, tag || keyword, page, accountSearchType)
    const tokenSearchResult = useSearchToken(keyword, page)
    const nftSearchResult = useSearchNft(keyword, page)

    const indexOfUniqueNonemptyResult = findUniquePositiveNumber(
        accountSearchResult.totalCount,
        tokenSearchResult.totalCount,
        nftSearchResult.totalCount,
    )

    const tabs = useMemo(
        () => [
            { name: 'All', value: 'all', disabled: indexOfUniqueNonemptyResult !== -1 },
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
            },
            {
                name: `NFT (${withCommas(nftSearchResult.totalCount)})`,
                value: 'nft',
                disabled: nftSearchResult.totalCount === 0,
            },
        ],
        [
            accountSearchResult.totalCount,
            tokenSearchResult.totalCount,
            nftSearchResult.totalCount,
            accountSearch,
            indexOfUniqueNonemptyResult,
        ],
    )

    const { selectedTab, handleTabChange } = useTabQuery(tabs, {
        keepQueryName: [SearchQueryName.Keyword, SearchQueryName.Tag],
        initialTabIndex: indexOfUniqueNonemptyResult === -1 ? 0 : indexOfUniqueNonemptyResult + 1,
    })

    const navigate = useNavigate()

    const [handleAccountViewMore, handleTokenViewMore, handleNftViewMore] = useMemo(() => {
        const createHandleViewMore = (type: string) => () => {
            const nextQueryMap = new URLSearchParams()
            if (keyword) {
                nextQueryMap.set('keyword', keyword)
            }
            if (tag) {
                nextQueryMap.set('tag', tag)
            }
            nextQueryMap.set('tabId', type)
            navigate({
                search: nextQueryMap.toString(),
            })
            window.scrollTo({
                top: 0,
            })
        }
        return [createHandleViewMore('account'), createHandleViewMore('token'), createHandleViewMore('nft')]
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
                handleAccountViewMore()
                return

            case 1:
                handleTokenViewMore()
                return

            case 2:
                handleNftViewMore()
                return

            case -1:
            default:
                return
        }
    }, [tabId, indexOfUniqueNonemptyResult, handleAccountViewMore, handleTokenViewMore, handleNftViewMore])

    const totalCount = accountSearchResult.totalCount + tokenSearchResult.totalCount + nftSearchResult.totalCount

    return (
        <>
            <TabContainer>
                <Tabs selected={selectedTab} tabs={tabs} onChange={handleTabChange} size="small" reversePadding={20} />
            </TabContainer>

            <If condition={selectedTab === 'all'}>
                {totalCount === 0 && <Empty />}

                <ShortSearchResult
                    title="Accounts"
                    searchResult={accountSearchResult}
                    renderItem={(account) => <AccountItemBox key={account.address} account={account} />}
                    onViewMore={handleAccountViewMore}
                />

                <ShortSearchResult
                    title="Tokens"
                    searchResult={tokenSearchResult}
                    renderItem={(token) => (
                        <TokenItemBox key={token.info.contractAddress} token={token} linkPrefix="token" />
                    )}
                    onViewMore={handleTokenViewMore}
                />

                <ShortSearchResult
                    title="NFT"
                    searchResult={nftSearchResult}
                    renderItem={(token) => (
                        <TokenItemBox key={token.info.contractAddress} token={token} linkPrefix="nft" />
                    )}
                    onViewMore={handleNftViewMore}
                />
            </If>

            <If condition={selectedTab === 'account'}>
                <LongSearchResult
                    title="Accounts"
                    searchResult={accountSearchResult}
                    renderItem={(account) => <AccountItemBox key={account.address} account={account} />}
                />
            </If>

            <If condition={selectedTab === 'token'}>
                <LongSearchResult
                    title="Tokens"
                    searchResult={tokenSearchResult}
                    renderItem={(token) => (
                        <TokenItemBox key={token.info.contractAddress} token={token} linkPrefix="token" />
                    )}
                />
            </If>

            <If condition={selectedTab === 'nft'}>
                <LongSearchResult
                    title="NFT"
                    searchResult={nftSearchResult}
                    renderItem={(token) => (
                        <TokenItemBox key={token.info.contractAddress} token={token} linkPrefix="nft" />
                    )}
                />
            </If>
        </>
    )
}

const TabContainer = styled(Flex)``

export default SearchPage
