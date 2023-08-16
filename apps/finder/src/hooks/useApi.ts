import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export function useApi<Params extends unknown[], Result>(
    api: (...params: Params) => Promise<AxiosResponse<Result>>,
    params: Params,
    onErrorPath = '/error',
) {
    const [result, setResult] = useState<Result>()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await api(...params)
                setResult(data)
            } catch {
                navigate(onErrorPath, { replace: true })
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, onErrorPath, ...params])

    return result
}
