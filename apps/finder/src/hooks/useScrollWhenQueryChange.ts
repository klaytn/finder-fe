import { useEffect } from 'react'
import { useLocation } from 'react-router'

export const useScrollWhenQueryChange = () => {
    const { search } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [search])
}
