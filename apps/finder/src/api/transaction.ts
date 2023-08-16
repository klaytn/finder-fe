import { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import { useRef } from 'react'
import useSWR from 'swr'

import { useResources } from '../context/configProvider'
import { NetworkError } from '../errors/networkErrors'
import { filterEmptyValue } from '../functions/Functions'
import { KeyCurrency } from '../variants/resource'
import { EventLogVO } from '../vo/eventLog'
import { InputDataVO } from '../vo/inputData'
import { InternalTransactionVO } from '../vo/internalTransaction'
import { NftTransferVO } from '../vo/nftTransfer'
import { PagingVO } from '../vo/paging'
import { TokenTransferVO } from '../vo/tokenTransfer'
import { TransactionListItemVO, TransactionVO } from '../vo/transaction'
import { request, IPaging, AddressInfo, WithPaging, emptyApiResponse, AccountKey } from './api'
import { NftInfo } from './nft'
import { TokenInfo } from './token'

export interface TransactionTypesResponse {
    [type: string]: Record<string, string | undefined>
}

export const getTransactionTypes = () => {
    return request<TransactionTypesResponse>('/transaction-types', undefined, { noCaseControl: true })
}
export interface TransactionsResponse extends IPaging {
    results: Transaction[]
}

export interface Transaction {
    transactionHash: string
    blockId: number
    datetime: string
    from: AddressInfo
    to?: AddressInfo
    transactionType: string
    amount: string
    transactionFee: string
    success?: boolean
    failMessage: string
    error?: string
    signature?: string
    methodId?: string
}

export const defaultTransaction: Transaction = {
    transactionHash: '',
    blockId: 0,
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
    transactionFee: '0',
    success: true,
    failMessage: '',
}

// transactions
export const getTransactions = async (type: string | null, page: string, keyCurrency: KeyCurrency) => {
    const params = filterEmptyValue({ type, page })
    const { data } = await request<TransactionsResponse>('/transactions', params)
    return new PagingVO(data, 20, (transaction) => new TransactionListItemVO(transaction, keyCurrency))
}

const INITIAL_TX_LIST = Array.from({ length: 20 }).map((_, index) => ({
    ...defaultTransaction,
    transactionHash: ' '.repeat(index),
}))

export const useTransactions = (use: boolean, type: string | null, page: string, size = 10) => {
    const { keyCurrency } = useResources()
    const prevRef = useRef<WithPaging<Transaction>>()
    const params = filterEmptyValue({ type, page, size })
    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<TransactionsResponse>>(
        use ? [`/transactions`, params] : null,
        request,
        {
            suspense: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: {
                ...emptyApiResponse,
                data: prevRef.current || {
                    paging: {
                        currentPage: 1,
                        totalCount: 20,
                        totalPage: 1,
                    },
                    results: INITIAL_TX_LIST,
                },
            },
        },
    )

    if (use && !data) {
        throw new NetworkError()
    }

    if (data) {
        prevRef.current = data
    }

    const result = new PagingVO(data, size, (transaction) => new TransactionListItemVO(transaction, keyCurrency))
    const refresh = () => mutate()

    return {
        result,
        refresh,
    }
}

// transaction
export const getTransaction = async (txHash: string) => {
    return await request<TransactionResponse>('/transactions/' + txHash)
}

export const useTransaction = (txHash: string) => {
    const { keyCurrency } = useResources()
    const { data: { data } = {} } = useSWR<AxiosResponse<TransactionResponse>>(`/transactions/${txHash}`, request, {
        suspense: true,
    })

    if (!data) {
        throw new NetworkError()
    }

    return new TransactionVO(data, keyCurrency)
}

export interface TransactionResponse {
    transactionHash: string
    transactionType: string
    blockId: number
    tokenTransfer: number
    nftTransfer: number
    feePayer?: string
    feePayerAccount?: AddressInfo
    feeRation?: number // fee ratio, a value (0-100) indicating what percentage of the fee was paid by the lending account.
    createdContractAccount?: AddressInfo
    datetime: string
    nonce: number
    amount: string
    gasPrice: string
    gasUsed: string
    gasLimit: string
    transactionFee: string
    status: string
    failMessage?: string
    from: AddressInfo
    to?: AddressInfo
    effectiveGasPrice?: string
    signature?: string
    methodId?: string
    burntFees?: string
    accountKey?: AccountKey
    key?: string
}

export const defaultTransactionResponse: TransactionResponse = {
    transactionHash: '',
    transactionType: '',
    blockId: 0,
    tokenTransfer: 0,
    nftTransfer: 0,
    feePayer: '',
    datetime: '',
    nonce: 0,
    amount: '0',
    gasPrice: '',
    gasUsed: '',
    gasLimit: '',
    transactionFee: '0',
    status: '',
    from: {
        address: '',
    },
    to: {
        address: '',
    },
}

// tokenTransfers
export const getTokenTransfers = async (txHash: string, page: string) => {
    const params = { page: page }
    return await request<TokenTransferResponse>(`/transactions/${txHash}/token-transfers`, params)
}

export const useTokenTransfers = (txHash: string, page: string, size = 10) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<TokenTransferResponse>>(
        [`/transactions/${txHash}/token-transfers`, { page, size }],
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

export interface TokenTransferResponse extends IPaging {
    results: TokenTransfer[]
}

export interface TokenTransfer {
    blockId: number
    transactionHash: string
    datetime: string
    from: AddressInfo
    to: AddressInfo
    token: TokenInfo
    amount: string
}

export type TokenBurnt = TokenTransfer

export interface TokenBurntsResponse extends IPaging {
    results: TokenBurnt[]
}

export const defaulTokenTransfer: TokenTransfer = {
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
    token: {
        symbol: '',
        name: '',
        icon: '',
        contractAddress: '',
        decimal: 0,
    },
    amount: '',
}

// nftTransfers
export const getNftTransfers = async (txHash: string, page: string) => {
    const params = { page }
    return await request<NftTransferResponse>(`/transactions/${txHash}/nft-transfers`, params)
}

export const useNftTransfers = (txHash: string, page: string, size = 10) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<NftTransferResponse>>(
        [`/transactions/${txHash}/nft-transfers`, { page, size }],
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

export interface NftTransferResponse extends IPaging {
    results: NftTransfer[]
}
export interface NftTransfer {
    blockId: number
    transactionHash: string
    datetime: string
    from: AddressInfo
    to: AddressInfo
    nft: NftInfo
    tokenId: string
    tokenCount: number
}

export const defaultNftTransfer: NftTransfer = {
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
    nft: {
        symbol: '',
        name: '',
        icon: '',
        contractAddress: '',
    },
    tokenId: '',
    tokenCount: 0,
}

// eventLogs
export const getEventLogs = async (txHash: string, page: string, signature?: string) => {
    const params = filterEmptyValue({ page, signature })
    return await request<EventLogResponse>(`/transactions/${txHash}/event-logs`, params)
}

export const useEventLogs = (txHash: string, page: string, size = 10, signature?: string) => {
    const params = filterEmptyValue({ page, signature, size })

    const { data: { data } = {} } = useSWR<AxiosResponse<EventLogResponse>>(
        [`/transactions/${txHash}/event-logs`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (eventLog) => new EventLogVO(eventLog))
}

export interface EventLogResponse extends IPaging {
    results: EventLog[]
}

export interface EventLog {
    logIndex: number
    contractAddress: string
    type: string
    topics: string[]
    data: string
    items: EventLogItem[]
    blockNumber: number
    transactionHash: string
    estimatedEventLog?: boolean
    contractAccount?: AddressInfo
}

export const defaultEventLog: EventLog = {
    logIndex: 0,
    contractAddress: '',
    type: '',
    topics: [],
    data: '',
    items: [],
    blockNumber: 0,
    transactionHash: '',
}

export interface EventLogItem {
    name: string
    value: string
}

// internal transactions
export const getInternalTxs = async (txHash: string, page: string) => {
    const params = { page: page }
    return await request<InternalTxResponse>(`/transactions/${txHash}/internal-transactions`, params)
}

export const useInternalTransactions = (txHash: string, page: string, size = 10) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<InternalTxResponse>>(
        [`/transactions/${txHash}/internal-transactions`, { page, size }],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (internalTransaction) => new InternalTransactionVO(internalTransaction))
}

export interface InternalTxResponse extends IPaging {
    results: InternalTx[]
}

export interface InternalTx {
    callId: number
    level: number
    type: string
    from: AddressInfo
    to: AddressInfo
    amount: string
    gasLimit: number
    inputData: InputDataResponse
    outputData?: string
    error?: string
    reverted?: InternalTxReverted
}

export interface InternalTxReverted {
    contract?: string
    message?: string
}

export const defaultInternalTx: InternalTx = {
    callId: 0,
    level: 0,
    type: '',
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
    amount: '',
    gasLimit: 0,
    inputData: {
        originalValue: '',
        decodedValue: undefined,
        utf8Value: '',
    },
    outputData: '',
    error: '',
    reverted: {
        contract: '',
        message: '',
    },
}

// inputData
export const getInputData = async (txHash: string) => {
    return await request<InputDataResponse>(`/transactions/${txHash}/input-data`)
}

export const useInputData = (txHash: string) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<InputDataResponse>>(
        `/transactions/${txHash}/input-data`,
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new InputDataVO(data)
}

export interface InputDataResponse {
    originalValue: string
    decodedValue?: DecodedInputData | undefined
    utf8Value: string
}

export const defaultInputDataResponse: InputDataResponse = {
    originalValue: '',
    decodedValue: undefined,
    utf8Value: '',
}

export interface DecodedInputData {
    signature: string
    methodId: string
    parameters: DecodedInputDataParameter[]
}

export interface DecodedInputDataParameter {
    type: string
    value: string
}

export type TransactionSearchParams = {
    blockHash?: string
    blockNumberEnd?: number
    blockNumberStart?: number
    sortDirection?: 'ASC' | 'DESC'
    sortType?: 'BLOCK_NUMBER' | 'TIME'

    fromAt: Date
    toAt?: Date

    types?: string[]
    status?: boolean

    from?: string
    to?: string
    feePayer?: string

    page?: number
    size?: number
}

const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss"
export const getTransactionSearch = async (params: TransactionSearchParams, keyCurrency: KeyCurrency) => {
    const { data } = await request<TransactionsResponse>(
        '/transactions/searches',
        filterEmptyValue({
            ...params,
            fromAt: format(params.fromAt, DATE_TIME_FORMAT),
            toAt: params.toAt ? format(params.toAt, DATE_TIME_FORMAT) : undefined,
        }),
    )
    return new PagingVO(data, params.size || 20, (transaction) => new TransactionListItemVO(transaction, keyCurrency))
}

export const useTransactionSearch = (use: boolean, params: TransactionSearchParams) => {
    const { keyCurrency } = useResources()
    const prevRef = useRef<WithPaging<Transaction>>()
    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<TransactionsResponse>>(
        use
            ? [
                  '/transactions/searches',
                  filterEmptyValue({
                      ...params,
                      fromAt: format(params.fromAt, DATE_TIME_FORMAT),
                      toAt: params.toAt ? format(params.toAt, DATE_TIME_FORMAT) : undefined,
                  }),
              ]
            : null,
        request,
        {
            suspense: true,
            fallbackData: {
                ...emptyApiResponse,
                data: prevRef.current || {
                    paging: {
                        currentPage: 1,
                        totalCount: 20,
                        totalPage: 1,
                    },
                    results: INITIAL_TX_LIST,
                },
            },
        },
    )

    if (use && !data) {
        throw new NetworkError()
    }

    if (data) {
        prevRef.current = data
    }

    const refresh = () => mutate()

    const result = new PagingVO(
        data,
        params.size || 20,
        (transaction) => new TransactionListItemVO(transaction, keyCurrency),
    )

    return {
        result,
        refresh,
    }
}
