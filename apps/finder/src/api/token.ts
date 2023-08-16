import { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { NetworkError } from '../errors/networkErrors'
import { filterEmptyValue } from '../functions/Functions'
import { SortDirection, SortType } from '../types/search'
import { PagingVO } from '../vo/paging'
import { TokenDetailVO, TokenListItemVO } from '../vo/token'
import { TokenBurntVO } from '../vo/tokenBurnt'
import { TokenHolderVO } from '../vo/tokenHolder'
import { TokenTransferVO } from '../vo/tokenTransfer'
import { request, IPaging, WithPaging } from './api'
import { TokenBurntsResponse, TokenTransferResponse } from './transaction'

// tokens
export const getTokens = async (page: string) => {
    const params = { page: page }
    return await request<TokensResponse>('/tokens', params)
}

export const useTokens = (page: string, size = 10) => {
    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<TokensResponse>>(
        [`/tokens`, { page, size }],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    const result = new PagingVO(data, size, (token) => new TokenListItemVO(token))
    const refresh = () => mutate()

    return {
        result,
        refresh,
    }
}

type UseVerifiedTokensParams = {
    page?: string
    size?: number
    fromDate?: string
    toDate?: string
    sortType?: SortType
    sortDirection?: SortDirection
}
export const useVerifiedTokens = (params: UseVerifiedTokensParams, tokenSearchFilter: boolean) => {
    const filteredParams = filterEmptyValue(params)

    const api = tokenSearchFilter ? '/searches/verified-tokens' : '/tokens'

    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<TokensResponse>>([api, filteredParams], request, {
        suspense: true,
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    if (!data) {
        throw new NetworkError()
    }

    return {
        refresh: () => mutate(),
        data: new PagingVO(data, params.size || 20, (token) => new TokenListItemVO(token)),
    }
}

export const searchTokens = async (keyword: string, page: string, size = '20') => {
    const params = { keyword: keyword, page: page, size: size }
    return await request<TokensResponse>('/searches/tokens', params)
}

export const useSearchToken = (
    keyword: string,
    page: string,
    size = 10,
    filter: Record<string, string | null> = { fromDate: null, toDate: null, sortType: null, sortDirection: null },
) => {
    const params = filterEmptyValue({ keyword, page, size, ...filter })

    const { data: { data } = {} } = useSWR<AxiosResponse<TokensResponse>>(
        keyword ? ['/searches/tokens', params] : null,
        request,
        {
            suspense: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: false,
        },
    )

    if (keyword && !data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (token) => new TokenListItemVO(token))
}

export interface TokensResponse extends IPaging {
    results: Token[]
}

export interface Token {
    info: TokenInfo
    totalSupply: string
    totalTransfers: number
}

export const defaultToken: Token = {
    info: {
        symbol: '',
        name: '',
        contractAddress: '',
        decimal: 0,
    },
    totalSupply: '',
    totalTransfers: 0,
}

export interface TokenInfo {
    symbol: string
    name: string
    icon?: string
    contractAddress: string
    decimal: number
    implementationAddress?: string
}

// token
export const getToken = async (contractAddress: string) => {
    return await request<TokenResponse>(`/tokens/${contractAddress}`)
}

export const useToken = (contractAddress: string) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<TokenResponse>>([`/tokens/${contractAddress}`], request, {
        suspense: true,
    })

    if (!data) {
        throw new NetworkError()
    }

    return new TokenDetailVO(data)
}

export interface TokenResponse {
    info: TokenInfo
    type: string
    totalSupply: string
    burnAmount: string
    totalTransfers: number
    totalBurns: number
    officialSite?: string
}

export const defaultTokenResponse: TokenResponse = {
    info: {
        symbol: '',
        name: '',
        contractAddress: '',
        decimal: 0,
    },
    type: '',
    totalSupply: '0',
    burnAmount: '0',
    totalTransfers: 0,
    totalBurns: 0,
    officialSite: '',
}

// tokenTransfers
export const getTokenTokenTransfers = async (tokenAddress: string, page: string) => {
    const params = { page: page }
    return await request<TokenTransferResponse>(`/tokens/${tokenAddress}/transfers`, params)
}

export const useTokenTransfersByToken = (tokenAddress: string, page: string, size = 10) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<TokenTransferResponse>>(
        [`/tokens/${tokenAddress}/transfers`, { page, size }],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (tokenTransfer) => new TokenTransferVO(tokenTransfer))
}

export type TokenHolder = {
    amount: number
    holder: {
        account_type: 'EOA' | 'SCA'
        address: string
        contract_type: 'Token' | 'NFT17' | 'NFT37'
        name: string
        symbol: string
    }
    percentage: number
}

export const getTokenHolders = (tokenAddress: string, page?: number) => {
    return request<WithPaging<TokenHolder>>(`/tokens/${tokenAddress}/holders`, { page })
}

export const useTokenHolders = (tokenAddress: string, page: string, size = 10, holderAddress?: string) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<TokenHolder>>>(
        [`/tokens/${tokenAddress}/holders`, filterEmptyValue({ page, size, holderAddress })],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (tokenHolder) => new TokenHolderVO(tokenHolder))
}

export const useTokenBurntList = (address: string, page: string, size = 10) => {
    const params = filterEmptyValue({ page, size })
    const { data: { data } = {} } = useSWR<AxiosResponse<TokenBurntsResponse>>(
        [`/tokens/${address}/burns`, params],
        request,
        {
            suspense: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new TokenBurntVO(item))
}
