import { Input, SearchNormalIcon } from '@klaytn/slush'

import { useSearchBar } from '../../../hooks/useSearchBar'

const SearchBar = () => {
    const { value, handleChange, handleSearch } = useSearchBar()

    return (
        <Input
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

export default SearchBar
