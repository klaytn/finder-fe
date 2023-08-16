import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import HomeSearchBar from '../components/home/homeSearchBar'
import HomeStatus from '../components/home/homeStatus'

const HomePage = () => {
    return (
        <Container>
            <HomeSearchBar />
            <HomeStatus />
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 102px;
`

export default HomePage
