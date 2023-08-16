import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router'

import usePageTitle from '../../hooks/usePageTitle'

const TitleSetter = () => {
    const location = useLocation()
    const pageTitle = usePageTitle()

    useEffect(() => {
        ReactGA.set({
            page_title: pageTitle,
        })
    }, [location, pageTitle])

    return null
}

export default TitleSetter
