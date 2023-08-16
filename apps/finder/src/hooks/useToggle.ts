import { useCallback, useMemo, useState } from 'react'

export function useToggle(initialValue = false) {
    const [isShow, setValue] = useState(initialValue)

    const on = useCallback(() => setValue(true), [])
    const off = useCallback(() => setValue(false), [])
    const toggle = useCallback(() => setValue((prev) => !prev), [])

    const result = useMemo(() => ({ isShow, on, off, toggle }), [isShow, on, off, toggle])

    return result
}
