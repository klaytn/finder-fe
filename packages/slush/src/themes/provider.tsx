import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'

import darkTheme from './dark'
import lightTheme from './light'
import { ThemeConfig } from './type'

const SlushContext = createContext<ThemeConfig>({} as ThemeConfig)

export enum Theme {
    light,
    dark,
}

type SlushProviderProps = {
    theme: Theme
}

const selectTheme = (theme: Theme) => (theme === Theme.light ? lightTheme : darkTheme)

const createPortalRootElement = (id: string) => {
    const rootElement = document.createElement('div')
    rootElement.id = id
    document.body.appendChild(rootElement)
    return rootElement
}

export const SlushProvider = ({ children, theme }: PropsWithChildren<SlushProviderProps>) => {
    const currentTheme = useMemo(() => selectTheme(theme), [theme])

    const rootElement = useMemo(
        () => document.getElementById('slush-root') || createPortalRootElement('slush-root'),
        [],
    )

    useEffect(() => {
        return () => {
            if (rootElement.parentElement) {
                rootElement.parentElement.removeChild(rootElement)
            }
        }
    }, [rootElement])

    return (
        <ThemeProvider
            theme={{
                ...currentTheme,
                slush: theme, // pull down the theme so that it can be controlled externally like the finder
            }}
        >
            <SlushContext.Provider value={currentTheme}>{children}</SlushContext.Provider>
        </ThemeProvider>
    )
}

export const useTheme = () => {
    const theme = useContext(SlushContext)
    if (!theme) {
        throw new ReferenceError('The component must be wrapped with a SlushProvider.')
    }
    return theme
}
