import styled from 'styled-components'

import { colors, Input, SearchNormalIcon, Theme } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { useSearchBar } from '../../../hooks/useSearchBar'

const HomeSearchBar = () => {
    const { value, handleChange, handleSearch } = useSearchBar()

    return (
        <HomeInput
            placeholder="Search by Block, TX Hash, Account..."
            rightIcon={SearchNormalIcon}
            hasRightDivider={false}
            value={value}
            onRightIconClick={handleSearch}
            onEnter={handleSearch}
            onChange={handleChange}
        />
    )
}

const HomeInput = styled(Input)`
    background-color: ${getThemeColor(colors.black[830])} !important;
    box-shadow: ${({ theme: { slush } }) =>
        slush === Theme.dark
            ? '6px 6px 20px 4px #1b112f, -6px -6px 12px #3c3054, inset 2px 2px 4px rgba(60, 48, 84, 0.75)'
            : '6px 6px 20px 4px rgba(27, 17, 47, 0.1), -6px -6px 12px rgba(60, 48, 84, 0.1), inset 2px 2px 4px rgba(60, 48, 84, 0.05)'};
    border: 3px solid ${getThemeColor(colors.blue[500])};
    border-radius: 28px !important;
`

export default HomeSearchBar
