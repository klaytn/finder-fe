import { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { useResources } from '../context/configProvider'
import { NetworkError } from '../errors/networkErrors'
import { filterEmptyValue } from '../functions/Functions'
import { AccountVO } from '../vo/account'
import { AccountKeyHistoryVO } from '../vo/accountKeyHistory'
import { AddressVO } from '../vo/address'
import { BlockListItemVO } from '../vo/block'
import { ContractCodeVO } from '../vo/contractCode'
import { EventLogVO } from '../vo/eventLog'
import { NftBalanceVO } from '../vo/nftBalance'
import { NftTransferVO } from '../vo/nftTransfer'
import { PagingVO } from '../vo/paging'
import { TokenBalanceVO } from '../vo/tokenBalance'
import { TokenTransferVO } from '../vo/tokenTransfer'
import { TransactionListItemVO } from '../vo/transaction'
import { AccountKey, AddressInfo, request, WithPaging } from './api'
import { BlocksResponse } from './block'
import { NftInfo } from './nft'
import { TokenInfo } from './token'
import { EventLogResponse, NftTransferResponse, TokenTransferResponse, TransactionsResponse } from './transaction'

const DEFAULT_ASSOCIATED_INFOS = {
    contractCode: true,
    eventLog: true,
    feePaid: true,
    internalTransaction: true,
    kip_17Balance: true,
    kip_37Balance: true,
    nftTransfer: true,
    proposedBlocks: true,
    tokenBalance: true,
    tokenTransfer: true,
    transaction: true,
    accountKey: true,
}

// Remove underscores (_) from response names to convert kip_17Balance to kip17Balance, etc.
const getAssociatedInfos = (associatedInfos: AssociatedInfosRawResponse = DEFAULT_ASSOCIATED_INFOS) => {
    const partial = filterEmptyValue({
        ...associatedInfos,
        internalTx: associatedInfos.internalTransaction,
        kip17Balance: associatedInfos.kip_17Balance,
        kip37Balance: associatedInfos.kip_37Balance,
        contract: associatedInfos.contractCode,
        txList: associatedInfos.transaction,
        overview: true,
    }) as Omit<AssociatedInfosResponse, 'allDisabled'>

    const allDisabled = Object.entries(partial)
        .filter(([key]) => key !== 'overview')
        .map(([, value]) => value)
        .every((flag) => !flag)
    const result: AssociatedInfosResponse = {
        ...partial,
        allDisabled,
    }

    return result
}

// account
export const getAccount = async (address: string) => {
    const response = await request<AccountResponse<AssociatedInfosRawResponse>>(`/accounts/${address}`)

    const result: AxiosResponse<AccountResponse> = {
        ...response,
        data: {
            ...response.data,
            associatedInfos: getAssociatedInfos(response.data.associatedInfos),
        },
    }

    return result
}

export const useAccount = (address: string) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<AccountResponse<AssociatedInfosRawResponse>>>(
        `/accounts/${address}`,
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new AccountVO({
        ...data,
        associatedInfos: getAssociatedInfos(data.associatedInfos),
    })
}

export type GovernanceCouncil = {
    name: string
    squareLink?: string
    thumbnail?: string
    website: string[]
    contracts: {
        node?: string[]
        staking?: string[]
        reward?: string[]
    }
    joinedAt: string
}

export interface AccountResponse<AssociatedInfosType = AssociatedInfosResponse> {
    address: string
    accountType: string
    balance: string
    totalTransactionCount: number
    contractType: string
    info?: TokenInfo | NftInfo
    contractCreator?: AddressInfo
    contractCreatorAddress?: string
    contractCreatorTransactionHash?: string
    knsDomain?: string
    addressLabel?: string
    associatedInfos: AssociatedInfosType
    contractCreated?: boolean
    governanceCouncil?: GovernanceCouncil
    tags?: string[]
    accountKey?: AccountKey
}

type AssociatedInfosRawResponse = {
    feePaid: boolean
    internalTransaction: boolean
    kip_17Balance: boolean
    kip_37Balance: boolean
    nftTransfer: boolean
    proposedBlocks: boolean
    tokenBalance: boolean
    tokenTransfer: boolean
    transaction: boolean
    eventLog: boolean
    contractCode: boolean
    accountKey: boolean
}

type AssociatedInfosResponse = {
    allDisabled: boolean
    feePaid: boolean
    internalTx: boolean
    kip17Balance: boolean
    kip37Balance: boolean
    nftTransfer: boolean
    proposedBlocks: boolean
    tokenBalance: boolean
    tokenTransfer: boolean
    eventLog: boolean
    contract: boolean
    txList: boolean
    accountKey: boolean
    overview: boolean
}

export function isTokenInfo(info: TokenInfo | NftInfo): info is TokenInfo {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return 'decimal' in (info as any)
}

export const defaultAccountResponse: AccountResponse = {
    address: '',
    accountType: '',
    balance: '',
    totalTransactionCount: 0,
    contractType: '',
    associatedInfos: getAssociatedInfos(DEFAULT_ASSOCIATED_INFOS),
}

export const getAccountProposedBlocks = async (address: string, page: string) => {
    const params = { page: page }
    return await request<BlocksResponse>(`/accounts/${address}/proposed-blocks`, params)
}

export const useAccountProposedBlocks = (address: string, page: string, size = 10) => {
    const params = filterEmptyValue({ page, size })

    const { data: { data } = {} } = useSWR<AxiosResponse<BlocksResponse>>(
        [`/accounts/${address}/proposed-blocks`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new BlockListItemVO(item))
}

// transactions
export const getAccountTransactions = async (address: string, type: string, page: string) => {
    const params = { type: type, page: page }
    return await request<TransactionsResponse>(`/accounts/${address}/transactions`, params)
}

export const useAccountTransactions = (address: string, type: string, page: string, size = 10) => {
    const params = filterEmptyValue({ page, type, size })
    const { keyCurrency } = useResources()

    const { data: { data } = {} } = useSWR<AxiosResponse<TransactionsResponse>>(
        [`/accounts/${address}/transactions`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (accountTransaction) => new TransactionListItemVO(accountTransaction, keyCurrency))
}

// fee paid transactions
export const getFeePaidTransactions = (accountAddress: string, type?: string, page?: string) => {
    const params = filterEmptyValue({ type, page })
    return request<TransactionsResponse>(`/accounts/${accountAddress}/fee-paid-transactions`, params)
}

export const useFeePaidTransactions = (accountAddress: string, page: string, size = 10) => {
    const { keyCurrency } = useResources()
    const { data: { data } = {}, mutate } = useSWR<AxiosResponse<TransactionsResponse>>(
        [`/accounts/${accountAddress}/fee-paid-transactions`, { page, size }],
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

    const result = new PagingVO(data, size, (transaction) => new TransactionListItemVO(transaction, keyCurrency))
    const refresh = () => mutate()

    return {
        result,
        refresh,
    }
}

// internal transactions
export const getAccountInternalTxs = async (address: string, page: string) => {
    const params = { page: page }
    return await request<TransactionsResponse>(`/accounts/${address}/internal-transactions`, params)
}

export const useAccountInternalTransactions = (address: string, page: string, size = 10) => {
    const { keyCurrency } = useResources()
    const { data: { data } = {} } = useSWR<AxiosResponse<TransactionsResponse>>(
        [`/accounts/${address}/internal-transactions`, { page, size }],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(
        data,
        size,
        (accountInternalTransaction) => new TransactionListItemVO(accountInternalTransaction, keyCurrency),
    )
}

// event logs
export const getAccountEventLogs = async (address: string, page: string, signature?: string) => {
    const params = filterEmptyValue({ page, signature })
    return await request<EventLogResponse>(`/accounts/${address}/event-logs`, params)
}

export const useAccountEventLogs = (address: string, page: string, size = 10, signature?: string) => {
    const params = filterEmptyValue({ page, size, signature })

    const { data: { data } = {} } = useSWR<AxiosResponse<EventLogResponse>>(
        [`/accounts/${address}/event-logs`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new EventLogVO(item))
}

// token transfers
export const getAccountTokenTransfers = async (address: string, page: string, contractAddress?: string) => {
    const params = filterEmptyValue({
        page,
        contractAddress,
    })
    return await request<TokenTransferResponse>(`/accounts/${address}/token-transfers`, params)
}

export const useAccountTokenTransfers = (address: string, page: string, contractAddress?: string, size = 10) => {
    const params = filterEmptyValue({
        page,
        contractAddress,
        size,
    })

    const { data: { data } = {} } = useSWR<AxiosResponse<TokenTransferResponse>>(
        [`/accounts/${address}/token-transfers`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new TokenTransferVO(item))
}

// nft transfers
export const getAccountNftTransfers = async (address: string, page: string, contractAddress?: string) => {
    const params = filterEmptyValue({
        page,
        contractAddress,
    })
    return await request<NftTransferResponse>(`/accounts/${address}/nft-transfers`, params)
}

export const useAccountNftTransfers = (address: string, page: string, contractAddress?: string, size = 10) => {
    const params = filterEmptyValue({
        page,
        contractAddress,
        size,
    })

    const { data: { data } = {} } = useSWR<AxiosResponse<NftTransferResponse>>(
        [`/accounts/${address}/nft-transfers`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new NftTransferVO(item))
}

// contract code
export const getAccountContractCode = async (address: string) => {
    return await request<ContractCodeResponse>(`/accounts/${address}/contract-codes`)
}

export const useAccountContractCode = (address: string) => {
    const { data: { data } = {} } = useSWR<AxiosResponse<ContractCodeResponse>>(
        `/accounts/${address}/contract-codes`,
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new ContractCodeVO(data, address)
}

export interface ContractCodeResponse {
    contractName: string
    compilerVersion: string
    contractSourceCode: string
    contractAbi: string
    contractCreationCode: string
    abiEncodedValue?: string
    implementationContractCode?: {
        contractAddress: string
        contractName: string
        contractAbi: string
    }
    proxyContractCode?: {
        contractAddress: string
        contractName: string
        contractAbi: string
    }
    proxyContractType: boolean
    implementationContractType: boolean
}

export type TokenBalanceResponse = {
    balance: number
    info: {
        contractAddress: string
        decimal: number
        icon: string
        name: string
        symbol: string
    }
    latestTransactionDateTime: string
}

export const getAccountTokenBalance = (address: string, page?: number) => {
    return request<WithPaging<TokenBalanceResponse>>(`/accounts/${address}/token-balances`, { page })
}

export const useAccountTokenBalance = (address: string, page: string, size = 10) => {
    const params = {
        page,
        size,
    }

    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<TokenBalanceResponse>>>(
        [`/accounts/${address}/token-balances`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new TokenBalanceVO(item))
}

export type NftBalanceResponse = {
    contractType: 'KIP17' | 'KIP37'
    info: {
        contractAddress: string
        decimal: number
        icon?: string
        name: string
        symbol: string
    }
    latestTransaction: string
    tokenCount: number
    tokenId?: string
}

export const getAccountNftKip17Balance = (address: string, page?: number) => {
    return request<WithPaging<NftBalanceResponse>>(`/accounts/${address}/nft-kip17-balances`, { page })
}

export const useAccountNftKip17Balance = (address: string, page: string, size = 10) => {
    const params = {
        page,
        size,
    }

    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<NftBalanceResponse>>>(
        [`/accounts/${address}/nft-kip17-balances`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new NftBalanceVO(item))
}

export const getAccountNftKip37Balance = (address: string, page?: number) => {
    return request<WithPaging<NftBalanceResponse>>(`/accounts/${address}/nft-kip37-balances`, { page })
}

export const useAccountNftKip37Balance = (address: string, page: string, size = 10) => {
    const params = {
        page,
        size,
    }

    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<NftBalanceResponse>>>(
        [`/accounts/${address}/nft-kip37-balances`, params],
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new NftBalanceVO(item))
}

export type AccountTokenFilterItem = {
    contractAddress: string
    contractIcon: string
    contractName: string
    contractSymbol: string
    contractType: string
}

export const getAccountTokenFilters = (address: string) => {
    return request<AccountTokenFilterItem[]>(`/accounts/${address}/token-transfer-filters`)
}

export type AccountNftFilterItem = AccountTokenFilterItem

export const getAccountNftFilterItem = (address: string) => {
    return request<AccountTokenFilterItem[]>(`/accounts/${address}/nft-transfer-filters`)
}

export interface AccountSearchResult extends AddressInfo {
    info: NftInfo | TokenInfo
    tags?: string[]
}

export const useSearchAccount = (
    use: boolean,
    keyword: string,
    page: string,
    type: 'ALL' | 'KEYWORD' | 'TAG',
    size = 10,
) => {
    const params = { keyword, page, size }

    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<AccountSearchResult>>>(
        use ? [`/accounts/searches/${type}`, params] : null,
        request,
        {
            suspense: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: false,
        },
    )

    if (use && !data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new AddressVO(item))
}

export type AccountKeyHistory = {
    blockNumber: number
    transactionHash: string
    transactionType: string
    accountAddress: string
    accountKeyType: string
    key: string
    accountKey: AccountKey
    datetime: string
}

export const useAccountKeyHistory = (address: string, page: string, size = 10) => {
    const params = filterEmptyValue({ page, size })

    const { data: { data } = {} } = useSWR<AxiosResponse<WithPaging<AccountKeyHistory>>>(
        [`/accounts/${address}/key-histories`, params],
        request,
        {
            suspense: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: false,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return new PagingVO(data, size, (item) => new AccountKeyHistoryVO(item))
}
