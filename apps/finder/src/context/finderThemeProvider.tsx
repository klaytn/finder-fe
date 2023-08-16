import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ThemeProvider, useTheme } from 'styled-components'

import { noop, SlushProvider, Theme } from '@klaytn/slush'

import { LocalStorageKey } from '../constants/storage'

type FinderThemeProviderProps = {
    children: ReactNode
}

type SetTheme = (theme: Theme) => void
type FinderThemeContextProps = {
    setTheme: SetTheme
}
const FinderThemeContext = createContext<FinderThemeContextProps>({ setTheme: noop })

const DARK_MODE_QUERY = '(prefers-color-scheme: Dark)'

const getSystemTheme = () => {
    const isDarkMode = window.matchMedia?.(DARK_MODE_QUERY)?.matches
    return isDarkMode ? Theme.dark : Theme.light
}

const getInitialTheme = () => {
    const themeNum = localStorage.getItem(LocalStorageKey.FinderTheme)
    if (!themeNum) {
        return getSystemTheme()
    }

    return parseInt(themeNum) as Theme
}

const FinderThemeProvider = ({ children }: FinderThemeProviderProps) => {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        // Detect and automatically change the system theme when you change it
        const changeThemeBySystem = ({ matches }: MediaQueryListEvent) => {
            const themeNum = localStorage.getItem(LocalStorageKey.FinderTheme)
            if (themeNum) {
                return
            }

            const systemTheme = matches ? Theme.dark : Theme.light
            setTheme(systemTheme)
        }
        window.matchMedia?.(DARK_MODE_QUERY)?.addEventListener?.('change', changeThemeBySystem)

        return () => window.matchMedia?.(DARK_MODE_QUERY)?.removeEventListener?.('change', changeThemeBySystem)
    }, [])

    useEffect(() => {
        // Only allow toggling with the T button when in development
        if (process.env.NODE_ENV !== 'development') {
            return
        }

        const handleChangeTheme = ({ code = '' }: KeyboardEvent) => {
            if (code === 'KeyT') {
                setTheme((prevTheme) => (prevTheme === Theme.dark ? Theme.light : Theme.dark))
            }
        }

        window.addEventListener('keydown', handleChangeTheme)

        return () => window.removeEventListener('keydown', handleChangeTheme)
    })

    return (
        <FinderThemeContext.Provider value={{ setTheme }}>
            <ThemeProvider theme={{ slush: theme }}>
                <SlushProvider theme={theme}>{children}</SlushProvider>
            </ThemeProvider>
        </FinderThemeContext.Provider>
    )
}

export const useFinderTheme = () => {
    const { slush } = useTheme()
    const { setTheme } = useContext(FinderThemeContext)

    return { theme: { slush }, setTheme }
}

export default FinderThemeProvider
