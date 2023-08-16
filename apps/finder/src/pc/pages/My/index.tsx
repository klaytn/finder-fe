import styled from 'styled-components'

import { colors, FaceWinkIcon } from '@klaytn/slush'

import { PageTitle } from '../../../components/pc/pages'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import MyTabContainer from './MyTabContainer'

const MyPage = () => {
    const iconColor = useFinderThemeColor(colors.blue[300])

    return (
        <>
            <TitleRow>
                <FaceWinkIcon size={44} color={iconColor} />
                <PageTitle>My Page</PageTitle>
            </TitleRow>

            <MyTabContainer />
        </>
    )
}

const TitleRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`

export default MyPage
