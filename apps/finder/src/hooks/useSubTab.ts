import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import useQuery from './useQuery'

export const useSubTab = (defaultSubTab: string) => {
    const query = useQuery()
    const navigate = useNavigate()

    const subTab = query.get('subTabId') || defaultSubTab

    const handleSubTabChange = useCallback(
        (selectedSubTab: string) => {
            query.set('subTabId', selectedSubTab)
            query.delete('page')
            navigate('?' + query.toString())
        },
        [query, navigate],
    )

    return {
        subTab,
        handleSubTabChange,
    }
}
