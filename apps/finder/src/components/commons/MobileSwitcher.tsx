import { FC, lazy } from 'react'
import parseUA from 'ua-parser-js'

import { Layout } from '../../constants/layout'

/**
 * Function to determine whether or not to show the mobile page with additional conditions because some devices, such as the iPad 5th generation, may not be able to check userAgent alone.
 * @returns whether to show the mobile page or not
 */
function checkMobile() {
    const {
        device: { type },
        os: { name },
    } = parseUA(window.navigator.userAgent)

    // if it's clearly mobile
    if (['mobile', 'tablet', 'wearable'].includes(type || '')) {
        return true
    }

    // If it's not a mobile device and it's not mac os, it's considered a PC
    if (name?.toUpperCase() !== 'MAC OS') {
        return false
    }

    // Check for touch support
    if (!('ontouchstart' in window)) {
        return false
    }

    // Check resolution
    if (window.screen?.availWidth >= Layout.width) {
        return false
    }

    return true
}

const App = lazy(() => (checkMobile() ? import('../../mobile/MobileApp') : import('../../pc/App')))

const MobileSwitcher: FC = () => {
    return <App />
}

export default MobileSwitcher
