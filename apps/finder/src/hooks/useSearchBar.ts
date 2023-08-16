import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { ROUTES } from '../constants/routes'
import useQuery from './useQuery'

export enum SearchQueryName {
    Tag = 'tag',
    Keyword = 'keyword',
}

enum SearchQueryType {
    TAG,
    BLOCK,
    TRANSACTION,
    ACCOUNT,
    UNKNOWN,
}

const KNS_POSTFIX = '.klay'

const checkQueryType = (value: string) => {
    if (/^#\S+$/.test(value)) {
        return SearchQueryType.TAG
    }

    if (value.endsWith(KNS_POSTFIX)) {
        return SearchQueryType.ACCOUNT
    }

    if (value.startsWith('0x')) {
        if (value.length === 66) {
            return SearchQueryType.TRANSACTION
        }

        if (value.length === 42) {
            return SearchQueryType.ACCOUNT
        }
    }

    const intValue = parseInt(value)
    if (!isNaN(intValue) && `${intValue}`.length === value.length) {
        return SearchQueryType.BLOCK
    }

    return SearchQueryType.UNKNOWN
}

export function getSearchResultPageUri(value: string) {
    const trimValue = value.trim()
    if (!trimValue) {
        return ''
    }

    const queryType = checkQueryType(trimValue)
    switch (queryType) {
        case SearchQueryType.BLOCK:
            return ROUTES.BLOCK.DETAIL.replace(':blockId', trimValue)

        case SearchQueryType.TRANSACTION:
            return ROUTES.TX.DETAIL.replace(':txHash', trimValue)

        case SearchQueryType.ACCOUNT:
            return ROUTES.ACCOUNT.DETAIL.replace(':address', trimValue)

        case SearchQueryType.TAG:
            return `${ROUTES.SEARCH}?${SearchQueryName.Tag}=${trimValue.replace('#', '')}`

        case SearchQueryType.UNKNOWN:
        default:
            return `${ROUTES.SEARCH}?${SearchQueryName.Keyword}=${trimValue}`
    }
}

export function useGoToSearch(params: { keyword: string }): void
export function useGoToSearch(params: { tag: string }): void
export function useGoToSearch({ keyword, tag }: { keyword?: string; tag?: string }) {
    const navigate = useNavigate()
    const tagWithHash = tag ? `#${tag}` : ''
    const value = keyword || tagWithHash

    const goToSearch = useCallback(() => {
        const uri = getSearchResultPageUri(value)
        if (uri) {
            navigate(uri)
        }
    }, [value, navigate])

    return goToSearch
}

export function useSearchBar() {
    const location = useLocation()
    const query = useQuery()

    const [value, setValue] = useState('')

    useEffect(() => {
        if (location.pathname === ROUTES.SEARCH) {
            const keyword = query.get('keyword') || ''
            const tag = query.get('tag') ? `#${query.get('tag')}` : ''
            setValue(keyword || tag)
        } else {
            setValue('')
        }
    }, [location, query])

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ currentTarget: { value } }) => {
        if (value !== '#' && value.startsWith('#')) {
            if (/^#[a-zA-Z0-9ㄱ-힣-_]+ $/.test(value)) {
                setValue(value.replace(' ', '_'))
                return
            }

            if (!/^#[a-zA-Z0-9ㄱ-힣-_]+$/.test(value)) {
                return
            }
        }

        setValue(value)
    }, [])

    const navigate = useNavigate()
    const handleSearch = useCallback(() => {
        const uri = getSearchResultPageUri(value)
        if (!uri) {
            return
        }

        navigate(uri)
        setValue('')
    }, [navigate, value])

    return {
        value,
        handleChange,
        handleSearch,
    }
}

export function useSearchValue() {
    const query = useQuery()

    const keyword = query.get(SearchQueryName.Keyword) || ''
    const tag = query.get(SearchQueryName.Tag) || ''
    const page = query.get('page') || '1'

    const accountSearchType = tag ? 'TAG' : 'ALL'

    return {
        keyword,
        tag,
        page,
        accountSearchType,
    } as const
}
