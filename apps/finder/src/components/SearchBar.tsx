import React from 'react'
import styled from 'styled-components'

import { Input, SearchNormalIcon, setTransition } from '@klaytn/slush'

import { useSearchBar } from '../hooks/useSearchBar'

const SearchBar = () => {
    const { handleChange, handleSearch, value } = useSearchBar()

    return (
        <Container>
            <Input
                onChange={handleChange}
                value={value}
                placeholder="Block#, TX Hash, Account address/tags, Token&NFT name/symbol..."
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        handleSearch()
                    }
                }}
                onRightIconClick={handleSearch}
                rightIcon={SearchNormalIcon}
                hasRightDivider={false}
            />
        </Container>
    )
}

const Container = styled.div`
    width: 593px;
    flex-shrink: 1;
    ${setTransition('width')};
`

export default SearchBar
