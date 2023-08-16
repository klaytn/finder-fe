import { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { NetworkError } from '../errors/networkErrors'
import { filterEmptyValue } from '../functions/Functions'
import { SortDirection, SortType } from '../types/search'
import { NftDetailVO, NftItemDetailVO, NftListItemVO } from '../vo/nft'
import { NftHolderVO } from '../vo/nftHolder'
import { NftInventoryVO } from '../vo/nftInventory'
import { NftTransferVO } from '../vo/nftTransfer'
import { PagingVO } from '../vo/paging'
import { request, IPaging, WithPaging } from './api'
import { NftTransferResponse } from './transaction'

// nfts
export const getNfts = async (page: string) => {
    const params = { page: page }
    return await request<NftsResponse>('/nfts', params)
}

export const useNfts = (page: string, size = 10) => {
    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<NftsResponse>>([`/nfts`, { page, size }], request, {
        suspense: true,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    if (!data) {
        throw new NetworkError()
    }

    const result = new PagingVO(data, size, (nft) => new NftListItemVO(nft))
    const refresh = () => mutate()

    return {
        result,
        refresh,
    }
}

type UseVerifiedNftsParams = {
    page?: string
    size?: number
    fromDate?: string
    toDate?: string
    sortType?: SortType
    sortDirection?: SortDirection
}
export const useVerifiedNfts = (params: UseVerifiedNftsParams, tokenSearchFilter: boolean) => {
    const filteredParams = filterEmptyValue(params)

    const api = tokenSearchFilter ? '/searches/verified-nfts' : '/nfts'

    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<NftsResponse>>([api, filteredParams], request, {
        suspense: true,
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    if (!data) {
        throw new NetworkError()
    }

    return {
        refresh: () => mutate(),
        data: new PagingVO(data, params.size || 20, (nft) => new NftListItemVO(nft)),
    }
}

export const searchNfts = async (keyword: string, page: string, size = '20') => {
    const params = { keyword: keyword, page: page, size: size }
    return await request<NftsResponse>('/searches/nfts', params)
}

export const useSearchNft = (
    keyword: string,
    page: string,
    size = 10,
    filter: Record<string, string | null> = { fromDate: null, toDate: null, sortType: null, sortDirection: null },
) => {
    const params = filterEmptyValue({ keyword, page, size, ...filter })

    const { data: { data } = {} } = useSWR<AxiosResponse<NftsResponse>>(
        keyword ? ['/searches/nfts', params] : null,
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

    return new PagingVO(data, size, (nft) => new NftListItemVO(nft))
}

export interface NftsResponse extends IPaging {
    results: Nft[]
}

export interface Nft {
    info: NftInfo
    totalSupply: string
    totalTransfers: number
}

export const defaultNft: Nft = {
    info: {
        symbol: '',
        name: '',
        contractAddress: '',
    },
    totalSupply: '',
    totalTransfers: 0,
}

export interface NftInfo {
    symbol: string
    name: string
    icon?: string
    contractAddress: string
    implementationAddress?: string
}

// nft
export const getNft = async (contractAddress: string) => {
    return await request<NftResponse>(`/nfts/${contractAddress}`)
}

export const useNft = (contractAddress: string) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<NftResponse>>(`/nfts/${contractAddress}`, request, {
        suspense: true,
    })

    if (!data) {
        throw new NetworkError()
    }

    return new NftDetailVO(data)
}

export interface NftResponse {
    info: NftInfo
    type: string
    totalSupply: string
    totalTransfers: number
    holderCount: number
    officialSite?: string
}

export const defaultNftResponse: NftResponse = {
    info: {
        symbol: '',
        name: '',
        contractAddress: '',
    },
    type: '',
    totalSupply: '',
    totalTransfers: 0,
    holderCount: 0,
    officialSite: '',
}

// nftTransfers
export const getNftNftTransfers = async (nftAddress: string, page: string, tokenId?: string) => {
    const params = filterEmptyValue({
        page,
        tokenId,
    })
    return await request<NftTransferResponse>(`/nfts/${nftAddress}/transfers`, params)
}

export const useNftTransfersByNft = (nftAddress: string, page: string, tokenId?: string, size = 10) => {
    const params = filterEmptyValue({
        page,
        tokenId,
        size,
    })

    const { data: { data } = {} } = useSWR<AxiosResponse<NftTransferResponse>>(
        [`/nfts/${nftAddress}/transfers`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (nftTransfer) => new NftTransferVO(nftTransfer))
}

export type NftHolder = {
    contractType: 'KIP17' | 'KIP37'
    holder: {
        accountType: 'EOA' | 'SCA'
        address: string
        contractType: 'Token' | 'NFT17' | 'NFT37'
        name: string
        symbol: string
    }
    percentage: number
    tokenCount: number
    tokenId?: string
}

export const getNftHolders = (nftAddress: string, page?: number, tokenId?: string) => {
    const params = filterEmptyValue({
        page,
        tokenId,
    })

    return request<WithPaging<NftHolder>>(`/nfts/${nftAddress}/holders`, params)
}

export const useNftHolders = (nftAddress: string, page?: string, tokenId?: string, size = 10) => {
    const params = filterEmptyValue({
        page,
        tokenId,
        size,
    })

    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<NftHolder>>>(
        [`/nfts/${nftAddress}/holders`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (nftHolder) => new NftHolderVO(nftHolder))
}

export type NftInventory = {
    contractType: 'KIP17' | 'KIP37'
    holder: {
        accountType: 'EOA' | 'SCA'
        address: string
        contractType: 'Token' | 'NFT17' | 'NFT37'
        name: string
        symbol: string
    }
    tokenCount: number
    tokenId: string
    tokenUri: string
}

export const getNftInventories = (nftAddress: string, page?: number, keyword?: string) => {
    const params = filterEmptyValue({
        page,
        keyword,
    })
    return request<WithPaging<NftInventory>>(`/nfts/${nftAddress}/inventories`, params)
}

export const useNftInventories = (nftAddress: string, page?: number | string, keyword?: string, size = 10) => {
    const params = filterEmptyValue({
        page,
        keyword,
        size,
    })

    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<NftInventory>>>(
        [`/nfts/${nftAddress}/inventories`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (nftInventory) => new NftInventoryVO(nftInventory))
}

export type NftItem = {
    contractType: 'KIP17' | 'KIP37'
    holder?: {
        accountType: 'EOA' | 'SCA'
        address: string
        contractType: 'Token' | 'NFT17' | 'NFT37'
        name: string
        symbol: string
    }
    info: {
        contractAddress: string
        decimal: number
        icon: string
        name: string
        symbol: string
    }
    tokenId: string
    tokenUri: string
    totalSupply?: number
    burnAmount?: number
    tokenUriRefreshable?: boolean
    tokenUriUpdatedAt?: string
}

export const getNftItem = (nftAddress: string, tokenId: string) => {
    return request<NftItem>(`/nfts/${nftAddress}/tokenids/${tokenId}`)
}

export const useNftItem = (nftAddress: string, tokenId: string) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<NftItem>>(`/nfts/${nftAddress}/tokenids/${tokenId}`, request, {
        suspense: true,
    })

    if (!data) {
        throw new NetworkError()
    }

    return new NftItemDetailVO(data)
}

export const refreshNftItem = (nftAddress: string, tokenId: string) => {
    return request<NftItem>(`/nfts/${nftAddress}/inventories/${tokenId}/refresh`, null, { method: 'PUT' })
}
