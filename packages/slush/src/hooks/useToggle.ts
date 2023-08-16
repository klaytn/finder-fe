import { useCallback, useEffect, useMemo, useState } from 'react'

export function useToggle(initialValue = false) {
    const [isShow, setValue] = useState(initialValue)

    const on = useCallback(() => setValue(true), [])
    const off = useCallback(() => setValue(false), [])
    const toggle = useCallback(() => setValue((prev) => !prev), [])

    return useMemo(() => ({ isShow, on, off, toggle }), [isShow, on, off, toggle])
}

export function useToggles(length: number, initialValue = false) {
    const [isShowList, setIsShowList] = useState(Array.from({ length }).map(() => initialValue))

    const reset = useCallback(() => {
        setIsShowList(Array.from({ length }).map(() => initialValue))
    }, [length, initialValue])

    useEffect(() => {
        reset()
    }, [reset])

    const toggle = useCallback((index: number) => {
        setIsShowList((prevList) => [
            ...prevList.slice(0, index),
            !prevList[index],
            ...prevList.slice(index + 1, prevList.length),
        ])
    }, [])

    const isAllOn = useMemo(() => isShowList.every((isOn) => isOn), [isShowList])

    const toggleAll = useCallback(() => {
        setIsShowList(Array.from({ length }).map(() => !isAllOn))
    }, [isAllOn, length])

    const onAll = useCallback(() => {
        setIsShowList(Array.from({ length }).map(() => true))
    }, [length])

    const offAll = useCallback(() => {
        setIsShowList(Array.from({ length }).map(() => false))
    }, [length])

    return useMemo(
        () => ({ isShowList, toggle, toggleAll, isAllOn, onAll, offAll, reset }),
        [isShowList, toggle, toggleAll, isAllOn, onAll, offAll, reset],
    )
}
