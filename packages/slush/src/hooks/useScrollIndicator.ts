import { UIEventHandler, useCallback, useEffect, useRef, useState } from 'react'

export type IndicatorState = 'start' | 'middle' | 'end' | 'none'

const INDICATOR_MARGIN = 20

function getNextIndicatorState(scrollWidth: number, offsetWidth: number, scrollLeft: number) {
    if (scrollLeft <= INDICATOR_MARGIN) {
        return 'start'
    }

    const scrollMax = scrollWidth - offsetWidth - INDICATOR_MARGIN
    if (scrollLeft >= scrollMax) {
        return 'end'
    }

    return 'middle'
}

export const useScrollIndicator = <TargetElement extends HTMLElement>() => {
    const [indicatorState, setIndicatorState] = useState<IndicatorState>('none')
    const [indicatorWidth, setIndicatorWidth] = useState(0)

    const scrollAreaRef = useRef<TargetElement>(null)

    const initialize = useCallback(() => {
        if (!scrollAreaRef.current) {
            return
        }

        const { scrollWidth, offsetWidth, scrollLeft } = scrollAreaRef.current
        if (scrollWidth === 0) {
            setTimeout(initialize, 100)
            return
        }
        if (scrollWidth !== offsetWidth) {
            setIndicatorState(getNextIndicatorState(scrollWidth, offsetWidth, scrollLeft))
            setIndicatorWidth(offsetWidth)
            return
        }

        setIndicatorState('none')
    }, [])

    useEffect(() => {
        initialize()

        window.addEventListener('resize', initialize)
        return () => window.removeEventListener('resize', initialize)
    }, [initialize])

    const handleScroll: UIEventHandler<TargetElement> = useCallback(
        ({ currentTarget }) => {
            if (indicatorState === 'none') {
                return
            }

            const { scrollWidth, offsetWidth, scrollLeft } = currentTarget
            const nextIndicatorState = getNextIndicatorState(scrollWidth, offsetWidth, scrollLeft)
            if (indicatorState !== nextIndicatorState) {
                setIndicatorState(nextIndicatorState)
            }
        },
        [indicatorState],
    )

    return {
        indicatorState,
        scrollAreaRef,
        handleScroll,
        indicatorWidth,
    }
}
