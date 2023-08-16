import { AxiosResponse } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'

import { useResources } from '../context/configProvider'
import { NetworkError } from '../errors/networkErrors'
import { filterEmptyValue } from '../functions/Functions'
import { BlockListItemVO, BlockVO } from '../vo/block'
import { BlockRewardDetailsVO } from '../vo/blockRewardDetails'
import { BlockTransactionVO } from '../vo/blockTransaction'
import { PagingVO } from '../vo/paging'
import { TransactionListItemVO } from '../vo/transaction'
import { request, IPaging, AddressInfo } from './api'
import { TransactionsResponse } from './transaction'

// blocks
export const getBlocks = async (page: string) => {
    return await request<BlocksResponse>('/blocks', { page })
}

export const useBlocks = (page: string, size = 10) => {
    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<BlocksResponse>>(
        [`/blocks`, { page, size }],
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

    const result = new PagingVO(data, size, (block) => new BlockListItemVO(block))
    const refresh = () => mutate()

    return {
        result,
        refresh,
    }
}
export interface BlocksResponse extends IPaging {
    results: Block[]
}

export interface Block {
    blockId: number
    datetime: string
    totalTransactionCount: number
    blockProposer: string
    blockProposerLabel?: string
    rewardKlay: string
    blockSize: number
    baseFeePerGas: string
    burntFees?: string
}

export const defaultBlock: Block = {
    blockId: 0,
    datetime: '',
    totalTransactionCount: 0,
    blockProposer: '',
    rewardKlay: '0',
    blockSize: 0,
    baseFeePerGas: '0',
}

// block
export const getBlock = async (blockId: number) => {
    return await request<BlockResponse>('/blocks/' + blockId)
}

export const useBlock = (blockId: string | number) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<BlockResponse>>(`/blocks/${blockId}`, request, {
        suspense: true,
    })

    if (!data) {
        throw new NetworkError()
    }

    return new BlockVO(data)
}

export interface BlockResponse {
    blockId: number
    datetime: string
    hash: string
    parentHash: string
    totalTransactionCount: number
    blockReward: BlockReward
    blockSize: number
    blockCommittee: BlockCommittee
    baseFeePerGas: string
    burntFees?: string
}

export const defaultBlockResponse: BlockResponse = {
    blockId: 0,
    datetime: '',
    hash: '',
    parentHash: '',
    totalTransactionCount: 0,
    blockReward: {
        mintedKlay: '0',
        transactionFee: '0',
        totalFee: '0',
    },
    blockSize: 0,
    blockCommittee: {
        blockProposer: { address: '' },
        validators: [],
    },
    baseFeePerGas: '0',
}

export interface BlockReward {
    mintedKlay: string
    transactionFee: string
    burntFee?: string
    totalFee: string
}

export interface BlockCommitteeAddress {
    address: string
    label?: string
}

export interface BlockCommittee {
    blockProposer: BlockCommitteeAddress
    validators: BlockCommitteeAddress[]
}

// block transactions
export const getBlockTransactions = async (blockId: number, page: string, type?: string) => {
    const params = filterEmptyValue({ page, type })
    return request<BlockTransactionResponse>(`/blocks/${blockId}/transactions`, params)
}

export const useBlockTransactions = (blockId: string | number, page: string, type?: string, size = 10) => {
    const { keyCurrency } = useResources()
    const params = filterEmptyValue({ page, type, size })

    const { data: { data } = {} } = useSWR<AxiosResponse<BlockTransactionResponse>>(
        [`/blocks/${blockId}/transactions`, params],
        request,
        {
            suspense: true,
            shouldRetryOnError: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (blockTransaction) => new BlockTransactionVO(blockTransaction, keyCurrency))
}

export interface BlockTransactionResponse extends IPaging {
    results: BlockTransaction[]
}

export interface BlockTransaction {
    blockId: number
    transactionHash: string
    datetime: string
    from: AddressInfo
    to: AddressInfo
    transactionType: string
    amount: string
    transactionFee: string
    success: boolean
    failMessage: string
    signature?: string
    methodId?: string
}

export const defaultBlockTransaction: BlockTransaction = {
    blockId: 0,
    transactionHash: '',
    datetime: '',
    from: {
        address: '',
        accountType: '',
        contractType: '',
    },
    to: {
        address: '',
        accountType: '',
        contractType: '',
    },
    transactionType: '',
    amount: '0',
    transactionFee: '',
    success: true,
    failMessage: '',
}

export const downloadProposedBlocks = async (address: string, year: string, month: string) => {
    const date = `${year}${month.padStart(2, '0')}`
    const response = await request(
        `/accounts/${address}/proposed-blocks/download`,
        { date },
        { binary: true, timeout: 30000 },
    )

    const name = `proposed_blocks_${address}_${date}.csv`
    const url = URL.createObjectURL(response.data)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', name)
    link.style.cssText = 'display:none'
    document.body.appendChild(link)
    link.click()
    link.remove()
}

export const useBlockInternalTx = (blockId: string | number, page: string, size = 10) => {
    const { keyCurrency } = useResources()
    const params = filterEmptyValue({ page, size })

    const { data: { data } = {} } = useSWR<AxiosResponse<TransactionsResponse>>(
        [`/blocks/${blockId}/internal-transactions`, params],
        request,
        {
            suspense: true,
            shouldRetryOnError: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(
        data,
        size,
        (internalTransaction) => new TransactionListItemVO(internalTransaction, keyCurrency),
    )
}

export type BlockRewardDistribution = {
    type: 'PROPOSER' | 'KGF' | 'KIR' | 'STAKERS'
    amount: number
}

export type BlockRewardRecipient = {
    type: 'PROPOSER' | 'KGF' | 'KIR' | 'STAKER'
    amount: number
    address: string
}

export type BlockRewardDetails = {
    minted: number
    totalFee: number
    burntFee: number
    distributions: BlockRewardDistribution[]
    recipients: BlockRewardRecipient[]
}

export const useBlockRewardDetails = (blockId: string | number) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<BlockRewardDetails>>(`/blocks/${blockId}/rewards`, request, {
        suspense: true,
    })

    if (!data) {
        throw new NetworkError()
    }

    return useMemo(() => new BlockRewardDetailsVO(data), [data])
}
