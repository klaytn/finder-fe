import styled from 'styled-components'

import { colors, FaceSadIcon, neumorphism, Theme } from '@klaytn/slush'

import { getThemeColor } from '../../functions/colorMap'
import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'
import { PageSubTitle, PageTitle } from './pages'

const NoData = () => {
    const iconColor = useFinderThemeColor(colors.white)
    return (
        <BoundaryContainer>
            <FaceSadIcon color={iconColor} size={44} />
            <PageTitle style={{ marginTop: 16 }}>Failed to load content</PageTitle>
            <PageSubTitle textAlign="center">
                Sorry, there was an error.
                <br />
                Please try again later.
            </PageSubTitle>
        </BoundaryContainer>
    )
}

const BoundaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${getThemeColor(colors.black[850])};
    border-radius: 30px;
    padding: 150px 40px;
    ${({ theme }) => (theme.slush === Theme.dark ? neumorphism.black1 : neumorphism.white1)};
`

export default NoData
