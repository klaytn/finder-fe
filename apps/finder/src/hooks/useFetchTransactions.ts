/* eslint-disable import/no-duplicates */
import addDays from 'date-fns/esm/addDays'
import format from 'date-fns/esm/format'
import isValid from 'date-fns/esm/isValid'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { TransactionSearchParams, useTransactionSearch, useTransactions } from '../api/transaction'
import { ROUTES } from '../constants/routes'
import { useFeatures } from '../context/configProvider'
import { filterEmptyValue } from '../functions/Functions'
import useQuery from './useQuery'

export enum QueryType {
    StringArray,
    String,
    Date,
    Boolean,
}

export const createFromQuery = (query: URLSearchParams) => {
    function fromQuery(key: string, type: QueryType.StringArray): string[]
    function fromQuery(key: string, type: QueryType.Date): Date | undefined
    function fromQuery(key: string, type?: QueryType.String): string | undefined
    function fromQuery(key: string, type?: QueryType.Boolean): boolean | undefined
    function fromQuery(key: string, type: QueryType = QueryType.String) {
        switch (type) {
            case QueryType.StringArray:
                return query.getAll(key)
            case QueryType.Date: {
                const value = query.get(key) || ''
                const date = new Date(value)
                return isValid(date) ? date : undefined
            }
            case QueryType.Boolean: {
                const value = query.get(key)
                if (value === null) {
                    return undefined
                }
                return value === 'true'
            }
            case QueryType.String:
                return query.get(key) || undefined
        }
    }

    return fromQuery
}

const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss"
type TxSearchParams = Omit<TransactionSearchParams, 'fromAt' | 'toAt'> & {
    fromAt?: Date
    toAt?: Date
    currentTime: boolean
    defaultFrom: Date
    defaultTo: Date
}
export const useTxSearch = () => {
    const navigate = useNavigate()

    const search = useCallback(
        (params: TxSearchParams) => {
            const filteredParams = filterEmptyValue(params) as TxSearchParams
            const { fromAt, toAt, from, to, feePayer, status, types, defaultFrom, defaultTo, currentTime } =
                filteredParams

            const query = new URLSearchParams()

            if (fromAt) {
                query.set('fromAt', format(fromAt, DATE_TIME_FORMAT))
            }
            if (toAt) {
                query.set('toAt', format(toAt, DATE_TIME_FORMAT))
            }
            if (currentTime) {
                query.set('currentTime', currentTime ? 'true' : 'false')
            }
            if (from) {
                query.set('from', from)
            }
            if (to) {
                query.set('to', to)
            }
            if (feePayer) {
                query.set('feePayer', feePayer)
            }
            if (typeof status === 'boolean') {
                query.set('status', status ? 'true' : 'false')
            }
            if (types) {
                types.forEach((type) => query.append('types', type))
            }

            const keyCount = new Set(query.keys()).size
            if (keyCount === 0) {
                navigate(`${ROUTES.TX.LIST}?_t=${Date.now()}`)
                return
            }

            if (currentTime) {
                query.delete('fromAt')
                query.delete('toAt')
            } else {
                query.set('fromAt', format(fromAt || defaultFrom, DATE_TIME_FORMAT))
                query.set('toAt', format(toAt || defaultTo, DATE_TIME_FORMAT))
            }

            query.set('sortDirection', 'DESC')

            query.set('_t', `${Date.now()}`)

            navigate(ROUTES.TX.LIST + '?' + query.toString())
        },
        [navigate],
    )

    return search
}

const useFetchTransactions = (defaultFrom: Date, defaultTo: Date) => {
    const { transactionFilter = false } = useFeatures()
    const query = useQuery()

    const fromQuery = createFromQuery(query)

    const page = fromQuery('page') || '1'
    const type = query.get('type') || ''

    const searchParams = filterEmptyValue({
        fromAt: fromQuery('fromAt', QueryType.Date),
        toAt: fromQuery('toAt', QueryType.Date),
        types: fromQuery('types', QueryType.StringArray),
        status: fromQuery('status', QueryType.Boolean),
        from: fromQuery('from'),
        to: fromQuery('to'),
        feePayer: fromQuery('feePayer'),
    })
    const sortType = (fromQuery('sortType', QueryType.String) || 'TIME') as 'TIME' | 'BLOCK_NUMBER'
    const sortDirection = (fromQuery('sortDirection', QueryType.String) || 'DESC') as 'DESC' | 'ASC'
    const currentTime = fromQuery('currentTime')

    const isSearch = transactionFilter && Object.values(searchParams).length > 0

    const searchResult = useTransactionSearch(isSearch, {
        ...searchParams,
        sortType,
        sortDirection,
        fromAt: currentTime ? addDays(new Date(), -1) : (searchParams.fromAt as Date) || defaultFrom,
        toAt: currentTime ? undefined : (searchParams.toAt as Date) || defaultTo,
        page: parseInt(page),
        size: 20,
    })

    const txResult = useTransactions(!isSearch, type, page, 20)

    return isSearch ? searchResult : txResult
}

export default useFetchTransactions
