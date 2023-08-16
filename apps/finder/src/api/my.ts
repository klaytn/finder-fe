import { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { NetworkError } from '../errors/networkErrors'
import { filterEmptyValue } from '../functions/Functions'
import { SelectableWalletType } from '../states/wallet'
import { ApprovedNftVO, ApprovedTokenVO } from '../vo/approvedToken'
import { MyContractVO } from '../vo/myContract'
import { PagingVO } from '../vo/paging'
import { createAuthToken, createQueryString, getPostClient, request, requestAndBind, WithPaging } from './api'

export type SpenderAccount = {
    address: string
    accountType: string
    contractType: string
    symbol?: string
    name?: string
    icon?: string
    knsDomain?: string
    addressLabel?: string
}

export type ContractSummary = {
    symbol: string
    name: string
    icon?: string
    contractAddress: string
    decimal: number
    totalSupply: string
    implementationAddress?: string
}

export type ApprovedTokenBase = {
    blockNumber: number
    transactionHash: string
    contractSummary: ContractSummary
    spenderAccount: SpenderAccount
    approvedTokenId?: string
    timestamp: string
}

export type ApprovedToken = {
    approvedAmount: string
} & ApprovedTokenBase

export type ApprovedNft = {
    approvedAll: boolean
} & ApprovedTokenBase

const approvedTokenBinder = (data: WithPaging<ApprovedToken>, size?: number) =>
    new PagingVO(data, size || 20, (item) => new ApprovedTokenVO(item))

export const useApprovedTokens = (accountAddress: string, page: string, size = 10) => {
    const params = filterEmptyValue({ page, size })

    const { data, mutate } = useSWR<PagingVO<ApprovedToken, ApprovedTokenVO>>(
        [approvedTokenBinder, `/accounts/${accountAddress}/approved-tokens`, params],
        requestAndBind,
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

    return {
        data,
        refresh: mutate,
    }
}

const approvedNftBinder = (data: WithPaging<ApprovedNft>, size?: number) =>
    new PagingVO(data, size || 20, (item) => new ApprovedNftVO(item))

export const useApprovedNfts = (accountAddress: string, page: string, size = 10) => {
    const params = filterEmptyValue({ page, size })

    const { data, mutate } = useSWR<PagingVO<ApprovedNft, ApprovedNftVO>>(
        [approvedNftBinder, `/accounts/${accountAddress}/approved-nfts`, params],
        requestAndBind,
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

    return {
        data,
        refresh: mutate,
    }
}

export const useApprovedNftsByTokenId = (accountAddress: string, page: string, size = 10) => {
    const params = filterEmptyValue({ page, size })

    const { data, mutate } = useSWR<PagingVO<ApprovedNft, ApprovedNftVO>>(
        [approvedNftBinder, `/accounts/${accountAddress}/approved-nft-tokenids`, params],
        requestAndBind,
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

    return {
        data,
        refresh: mutate,
    }
}

type MyContractParams = {
    accountAddress: string
    type: 'TOKEN' | 'CONTRACT'
    page?: number | string
    size?: number
}

export type MyContractResponse = {
    address: string
    type: string
    name?: string
    symbol?: string
    icon?: string
    officialSite?: string
    officialEmailAddress?: string
    contractCreatorAddress?: string
    contractCreatorTransactionHash?: string
    contractCreated?: boolean
    createdAt: string
    updatedAt: string
}

export const useMyContract = ({ accountAddress, type, page, size = 10 }: MyContractParams) => {
    const params = filterEmptyValue({
        type,
        page,
        size,
    })

    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<WithPaging<MyContractResponse>>>(
        [`/accounts/${accountAddress}/contracts`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return {
        result: new PagingVO(data, size, (item) => new MyContractVO(item)),
        refresh: mutate,
    }
}

export type PostMyContractParams = {
    contractAddress: string
    walletType: SelectableWalletType
    contractCreatorSignature: string
    officialSite?: string
    officialEmailAddress?: string
    icon?: File
    deleteIcon?: boolean
}

export async function postMyContract({
    contractAddress,
    walletType,
    contractCreatorSignature,
    officialEmailAddress,
    officialSite,
    icon,
    deleteIcon,
}: PostMyContractParams) {
    const form = new FormData()

    if (icon) {
        form.append('icon', icon)
    }
    if (!icon && deleteIcon === true) {
        form.append('deleteIcon', `${deleteIcon}`)
    }

    const params = filterEmptyValue({
        _t: Date.now(),
        walletType,
        contractCreatorSignature,
        officialSite,
        officialEmailAddress,
    })
    const query = createQueryString(params)
    const authToken = await createAuthToken(query)
    const apiClient = await getPostClient()

    return apiClient.put(`/contracts/${contractAddress}?${query}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authToken,
        },
    })
}
