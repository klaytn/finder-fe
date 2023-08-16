import { FC, useMemo } from 'react'
import { createPortal } from 'react-dom'

export const Portal: FC = ({ children }) => {
    const rootElement = useMemo(() => document.getElementById('slush-root'), [])

    if (!rootElement) {
        throw new Error('Could not found slush-root')
    }

    return createPortal(children, rootElement)
}
