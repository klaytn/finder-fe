import React from 'react'
import styled, { DefaultTheme } from 'styled-components'

import { colors, SearchNormalIcon, Theme, typos } from '@klaytn/slush'

import { getThemeColor } from '../functions/colorMap'
import { useFinderThemeColor } from '../hooks/useFinderThemeColor'
import { useSearchBar } from '../hooks/useSearchBar'

const HomeSearchBar = () => {
    const { handleChange, handleSearch, value } = useSearchBar()

    const homeIconColor = useFinderThemeColor(colors.black[500])
    const searchIconColor = homeIconColor
    const searchIconSize = 28

    return (
        <Container>
            <Input
                onChange={handleChange}
                value={value}
                autoFocus
                placeholder="Block#, TX Hash, Account address/tags, Token&NFT name/symbol..."
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        handleSearch()
                    }
                }}
            />
            <SearchContainer onClick={handleSearch}>
                <SearchNormalIcon color={searchIconColor} size={searchIconSize} />
            </SearchContainer>
        </Container>
    )
}

const SHADOWS = {
    [Theme.dark]: '6px 6px 20px 4px #1b112f, -6px -6px 12px #3c3054, inset 2px 2px 4px rgba(60, 48, 84, 0.75)',
    [Theme.light]:
        '6px 6px 20px 4px rgba(27, 17, 47, 0.1), -6px -6px 12px rgba(60, 48, 84, 0.1), inset 2px 2px 4px rgba(60, 48, 84, 0.05)',
} as const

const getShadow = ({ theme: { slush } }: { theme: DefaultTheme }) => {
    return SHADOWS[slush] || SHADOWS[Theme.dark]
}

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    width: 952px;
    height: 72px;
    border: 3px solid ${getThemeColor(colors.blue[500])};
    box-sizing: border-box;
    box-shadow: ${getShadow};
    border-radius: 24px;
    padding: 20px 0 20px 27px;
`

const Input = styled.input`
    border: 0;
    background-color: transparent;
    margin-top: 2px;
    padding: 2px 2px 6px 2px;
    width: 836px;
    height: 20px;
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.white)};
    ::placeholder {
        color: ${getThemeColor(colors.black[500])};
    }
`

const SearchContainer = styled.div`
    cursor: pointer;
    margin-left: 26px;
`

export default HomeSearchBar
