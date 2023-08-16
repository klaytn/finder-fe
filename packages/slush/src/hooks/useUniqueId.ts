import { useEffect, useMemo } from 'react'

import { getUniqueId } from '../utils/common'

export const useUniqueId = () => {
    const { id, release } = useMemo(getUniqueId, [])

    useEffect(() => {
        release()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return id
}
