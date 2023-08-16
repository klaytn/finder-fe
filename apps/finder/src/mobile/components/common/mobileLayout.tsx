import { FC, useEffect } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'

import { Flex, useToggle } from '@klaytn/slush'

import Footer from './footer'
import Header from './header'
import Menu from './menu'
import SearchBar from './searchBar'

type MobileLayoutProps = {
    noHeader?: boolean
    noSearchBar?: boolean
    noFooter?: boolean
}

const MobileLayout: FC<MobileLayoutProps> = ({ noHeader = false, noSearchBar = false, noFooter = false, children }) => {
    const menuState = useToggle()

    const menuTop = noSearchBar ? 70 : 130

    const location = useLocation()
    useEffect(() => {
        menuState.off()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <Container direction="column" header={!noHeader}>
            {!noHeader && <Header onMenuClick={menuState.toggle} />}
            {!noSearchBar && (
                <SearchBarContainer>
                    <SearchBar />
                </SearchBarContainer>
            )}
            <Menu open={menuState.isShow} top={menuTop} />
            <ContentsContainer>{children}</ContentsContainer>
            {!noFooter && <Footer />}
        </Container>
    )
}

const Container = styled(Flex)<{ header: boolean }>`
    padding: ${({ header }) => (header ? 20 : 28)}px 20px;
    min-width: 320px;
`

const SearchBarContainer = styled(Flex)`
    margin-top: 20px;
    margin-bottom: 44px;
`

const ContentsContainer = styled(Flex)`
    min-height: 520px;
`

export default MobileLayout
