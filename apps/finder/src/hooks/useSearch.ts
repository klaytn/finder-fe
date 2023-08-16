import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

import { useInput } from '@klaytn/slush'

import useQuery from '../hooks/useQuery'

type UseSearchOption = {
    queryName?: string
    keepQueries?: string[]
}

function useSearch({ queryName = 'search', keepQueries = [] }: UseSearchOption) {
    const query = useQuery()
    const search = query.get(queryName) || ''
    const navigate = useNavigate()
    const searchState = useInput(search)

    const searchRef = useRef<HTMLInputElement>(null)

    const { setValue } = searchState
    useEffect(() => {
        setValue(search)
    }, [setValue, search])

    const getNextQuery = () => {
        const nextQueryMap = new URLSearchParams()
        keepQueries.forEach((keepQuery) => {
            const keepValue = query.get(keepQuery)
            if (keepValue) {
                nextQueryMap.set(keepQuery, keepValue)
            }
        })
        return nextQueryMap
    }

    const handleClear = () => {
        if (searchState.value) {
            searchState.handleClear()
        }

        if (search) {
            const nextQuery = getNextQuery()
            navigate('?' + nextQuery.toString())
        }

        searchRef.current?.focus()
    }

    const handleSearch = () => {
        if (!search && !searchState.value) {
            return
        }

        if (!searchState.value) {
            const nextQuery = getNextQuery()
            navigate('?' + nextQuery.toString())
            return
        }

        const nextQuery = getNextQuery()
        nextQuery.set(queryName, searchState.value)
        navigate('?' + nextQuery.toString())
    }

    return {
        searchState,
        handleClear,
        handleSearch,
        searchRef,
    }
}

export default useSearch
