import { useCallback, useEffect, useState } from 'react'

import { GlobalEventHandlerManager } from '../utils/globalEventHandler'
import { memoize, singletonResolver } from '../utils/memoize'
import { useUniqueId } from './useUniqueId'

const getGlobalHandlerManagers = memoize(() => {
    const resizeHandlerManager = new GlobalEventHandlerManager<string>('resize')
    const scrollHandlerManager = new GlobalEventHandlerManager<string>('scroll')

    return {
        resizeHandlerManager,
        scrollHandlerManager,
    }
}, singletonResolver)

const increaseCount = (prevCount: number) => {
    if (prevCount > 1000) {
        return 0
    }

    return prevCount + 1
}

// hack to make regions re-render when their position/size changes
export const useRerenderOnScroll = (activate: boolean) => {
    const { resizeHandlerManager, scrollHandlerManager } = getGlobalHandlerManagers()

    const [, setCount] = useState(0)

    const id = useUniqueId()

    const rerender = useCallback(() => {
        setCount(increaseCount)
    }, [])

    useEffect(() => {
        if (activate) {
            resizeHandlerManager.add(id, rerender)
            scrollHandlerManager.add(id, rerender)
        }

        return () => {
            resizeHandlerManager.remove(id)
            scrollHandlerManager.remove(id)
        }
    }, [rerender, activate, id, resizeHandlerManager, scrollHandlerManager])
}
