import styled from 'styled-components'

import { colors, FilterFillIcon } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

type FilterIconProps = {
    isApplied: boolean
}

const FilterIcon = ({ isApplied }: FilterIconProps) => {
    const iconColor = useFinderThemeColor(colors.blue[400])
    return (
        <Container>
            <FilterFillIcon size={24} color={iconColor} />
            {isApplied && <AppliedDot />}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`

const AppliedDot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${getThemeColor(colors.red[400])};
    position: absolute;
    transform: translate(20px, -17px);
`

export default FilterIcon
