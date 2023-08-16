import { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { NetworkError } from '../errors/networkErrors'
import { request } from './api'

/**
 * Each history has the same date, but different key and value types for the data, so we unify them into { data: number } function that unifies them into
 */
function normalizeHistories<K extends string, V extends string | number>(histories: History<K, V>[], key: K) {
    return histories.map((history) => {
        const rawData = history[key]
        const data = typeof rawData === 'number' ? rawData : parseFloat(rawData)
        return {
            date: history.date,
            data,
        }
    })
}

export const useTransactionHistory = () => {
    const { data: { data } = {} } = useSWR<AxiosResponse<HomeTxHistoryResponse>>('/home/txhistory', request, {
        suspense: true,
    })

    if (!data) {
        throw new NetworkError()
    }

    return {
        ...data,
        histories: normalizeHistories(data.histories, 'count'),
    }
}

export const useBurntByGasFeeHistory = () => {
    const { data: { data } = {} } = useSWR<AxiosResponse<HomeBurntByGasFeeHistoryResponse>>(
        '/home/burnt-by-gas-fee-history',
        request,
        {
            suspense: true,
        },
    )

    if (!data) {
        throw new NetworkError()
    }

    return {
        histories: normalizeHistories(data.histories, 'amount'),
    }
}

export interface HomeTxHistoryResponse {
    total: string
    histories: History<'count', number>[]
}

export const defaultHomeTxHistoryResponse: HomeTxHistoryResponse = {
    total: '',
    histories: [],
}

export interface HomeBurntByGasFeeHistoryResponse {
    histories: History<'amount', string>[]
}

export type History<Key extends string, Value extends string | number> = { [K in Key]: Value } & { date: string }
