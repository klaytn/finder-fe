import { useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { FixedTooltip, Theme, ToggleTheme, useToggle } from '@klaytn/slush'

import { LocalStorageKey } from '../../constants/storage'
import { useFinderTheme } from '../../context/finderThemeProvider'

const TOOLTIP_HIDE_MS = 5000

const ToggleFinderTheme = () => {
    const {
        setTheme,
        theme: { slush },
    } = useFinderTheme()

    const toggleTheme = useCallback(() => {
        const nextTheme = slush === Theme.dark ? Theme.light : Theme.dark
        setTheme(nextTheme)

        localStorage.setItem(LocalStorageKey.FinderTheme, `${nextTheme}`)
    }, [slush, setTheme])

    useEffect(() => {
        localStorage.setItem(LocalStorageKey.FinderThemeInitialTooltip, 'true')
    }, [])

    const isDarkMode = slush === Theme.dark

    const isInitial = localStorage.getItem(LocalStorageKey.FinderThemeInitialTooltip)

    const tooltipToggle = useToggle(isInitial === null)

    useEffect(() => {
        setTimeout(tooltipToggle.off, TOOLTIP_HIDE_MS)
    }, [tooltipToggle])

    return (
        <FixedTooltip
            message={
                <ToggleThemeTooltipContents>
                    You can switch dark/light mode
                    <br /> by clicking here
                </ToggleThemeTooltipContents>
            }
            width={150}
            cursorPosition="right"
            show={tooltipToggle.isShow}
            direction="top"
            margin={20}
        >
            <ToggleTheme isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </FixedTooltip>
    )
}

const ToggleThemeTooltipContents = styled.span`
    display: inline-flex;
    text-align: left;
`

export default ToggleFinderTheme
