import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilValue } from 'recoil'

import { ContextMenuItem } from '@klaytn/slush'

import { transactionTypeMapQuery, transactionTypesQuery } from '../states/transaction'
import Filter from './Filter'

export interface ITransactionTypeFilterProps {
    type: string
    path: string
    query?: string
}

const TransactionTypeFilter = ({ type, path, query = 'type' }: ITransactionTypeFilterProps) => {
    const transactionTypes = useRecoilValue(transactionTypesQuery)
    const transactionTypeMap = useRecoilValue(transactionTypeMapQuery)
    const title = transactionTypeMap.get(type) || 'TX Type'
    const navigate = useNavigate()

    const handleSelect = useCallback(
        (item: ContextMenuItem) => {
            if (!item.value) {
                navigate(path)
            } else {
                const delimiter = path.includes('?') ? '&' : '?'
                navigate(`${path}${delimiter}${query}=${item.value}`)
            }
        },
        [path, query, navigate],
    )

    return <Filter title={title} items={transactionTypes} onSelect={handleSelect} />
}

export default TransactionTypeFilter
