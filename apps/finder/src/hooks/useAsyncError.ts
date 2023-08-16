import { useCallback, useState } from 'react'

const useAsyncError = () => {
    const [, setError] = useState()

    return useCallback((e) => {
        setError(() => {
            throw e
        })
    }, [])
}

export default useAsyncError
