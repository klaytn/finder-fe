import { createRef, useMemo } from 'react'

const useRefs = <T>(count: number) => {
    return useMemo(() => Array.from({ length: count }).map(() => createRef<T>()), [count])
}

export default useRefs
