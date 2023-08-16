import { useMemo } from 'react'
import { useLocation } from 'react-router'

import { getRouteFromPath } from '../constants/routes'
import useQuery from './useQuery'

function usePageTitle() {
    const location = useLocation()
    const query = useQuery()

    return useMemo(() => {
        const route = getRouteFromPath(location.pathname)
        const tab = query.get('tabId')
        return tab ? `${route}-${tab}` : route
    }, [location, query])
}

export default usePageTitle
