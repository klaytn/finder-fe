import styled from 'styled-components'

import { useToggle } from '@klaytn/slush'

import Footer from '../../../components/Footer'
import HomeSearchBar from '../../../components/HomeSearchBar'
import HomeGnb from './HomeGnb'
import HomeStatus from './HomeStatus'

const Home = () => {
    const { isShow, toggle } = useToggle()
    return (
        <Container>
            <HomeGnb />
            <SearchContainer>
                <HomeSearchBar />
            </SearchContainer>
            <StatusContainer>
                <HomeStatus isOpen={isShow} toggle={toggle} />
            </StatusContainer>
            <FooterContainer isOpen={isShow}>
                <Footer />
            </FooterContainer>
        </Container>
    )
}

const Container = styled.div`
    padding: 28px 42px 28px 42px;
`

const SearchContainer = styled.div`
    margin-top: 220px;
`

const StatusContainer = styled.div`
    margin-top: 40px;
`

type FooterContainerProps = {
    isOpen: boolean
}
const FooterContainer = styled.div<FooterContainerProps>`
    position: ${({ isOpen }) => (isOpen ? 'auto' : 'fixed')};
    bottom: ${({ isOpen }) => (isOpen ? undefined : '0px')};
    margin-top: ${({ isOpen }) => (isOpen ? '150px' : undefined)};
    width: 1380px;
`

export default Home
