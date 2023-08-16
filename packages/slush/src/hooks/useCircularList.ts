import { useEffect, useRef } from 'react'

import usePrevious from './usePrevious'
import useRefs from './useRefs'

const useCircularList = <ContainerElement extends HTMLElement, ItemElement extends HTMLElement>(
    itemCount: number,
    isShow: boolean,
    selectedIndex: number,
    itemHeight = 40,
) => {
    const containerRef = useRef<ContainerElement>(null)
    const itemRefs = useRefs<ItemElement>(itemCount * 2)

    useEffect(() => {
        // Adjust the scroll position so that it scrolls vertically indefinitely
        const firstHourButton = itemRefs[0]?.current
        const lastHourButton = itemRefs[itemRefs.length - 1]?.current
        const container = containerRef.current

        if (!firstHourButton || !lastHourButton || !container) {
            return
        }

        const firstButtonObserver = new IntersectionObserver(
            (entry) => {
                if (!entry[0]?.isIntersecting) {
                    return
                }

                container.scrollTo(0, container.scrollTop + container.scrollHeight / 2)
            },
            {
                threshold: 1,
            },
        )
        firstButtonObserver.observe(firstHourButton)

        const lastButtonObserver = new IntersectionObserver(
            (entry) => {
                if (!entry[0]?.isIntersecting) {
                    return
                }

                container.scrollTo(0, container.scrollTop - container.scrollHeight / 2)
            },
            {
                threshold: 1,
            },
        )
        lastButtonObserver.observe(lastHourButton)

        return () => {
            firstButtonObserver.disconnect()
            lastButtonObserver.disconnect()
        }
    }, [itemRefs])

    const prevShow = usePrevious(isShow)
    useEffect(() => {
        // Scroll the selected value to center when the popup is closed and reopened
        if (!isShow || isShow === prevShow) {
            return
        }

        setTimeout(() => {
            const index = selectedIndex - 4 + (selectedIndex < 4 ? itemCount : 0)
            containerRef.current?.scrollTo(0, itemHeight * index)
        }, 10)
    }, [isShow, itemRefs, selectedIndex, prevShow, containerRef, itemHeight, itemCount])

    return {
        containerRef,
        itemRefs,
    }
}

export default useCircularList
