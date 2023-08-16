import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

import { WithPaging } from '../api/api'
import useQuery from '../hooks/useQuery'

export function getUseDataWithPagingHook<Data, Params extends unknown[]>(
    api: (address: string, page?: number, ...params: Params) => Promise<AxiosResponse<WithPaging<Data>>>,
    pageSize = 20,
) {
    return (address: string, ...params: Params) => {
        const query = useQuery()
        const pageQuery = query.get('page')
        const currentPage = parseInt(pageQuery || '1')
        const [isLoaded, setIsLoaded] = useState(false)

        const [data, setData] = useState<WithPaging<Data>>({
            paging: {
                currentPage,
                totalCount: 0,
                totalPage: 0,
            },
            results: [],
        })

        const startIndex = pageSize * (currentPage - 1) + 1
        const paramsKey = JSON.stringify(params, null, '')

        useEffect(() => {
            const initialLoad = async () => {
                const restoredParams = JSON.parse(paramsKey)
                const loadedData = await api(address, currentPage, ...restoredParams)
                setData(loadedData.data)
                setIsLoaded(true)
            }
            initialLoad()
        }, [address, currentPage, paramsKey])

        return {
            isLoaded,
            ...data,
            startIndex,
        }
    }
}
