import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import ChainStatus from '../components/ChainStatus'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import NetworkSwitcher from '../components/NetworkSwitcher'
import WalletConnectivity from '../components/pc/walletConnectivity'
import SearchBar from '../components/SearchBar'
import { Layout as LayoutSize } from '../constants/layout'
import { ROUTES } from '../constants/routes'
import { useFeatures, useResources } from '../context/configProvider'

type LayoutProps = {
    hideLayout?: boolean
    children: ReactNode
}

const Layout = ({ children, hideLayout }: LayoutProps) => {
    const { LogoComponent } = useResources()
    const { walletConnect = false } = useFeatures()

    if (hideLayout) {
        return <>{children}</>
    }

    return (
        <Container>
            <HeaderContainer>
                <div>
                    <LogoLink to={ROUTES.HOME}>
                        <LogoComponent width={223} height={33} />
                    </LogoLink>
                    <ChainStatusContainer>
                        <ChainStatus />
                    </ChainStatusContainer>
                </div>
                <div>
                    <RightContainer>
                        <SearchBar />
                        {walletConnect && <WalletConnectivity />}
                        <NetworkSwitcher />
                    </RightContainer>
                    <MenuContainer className="flex_right">
                        <Menu />
                    </MenuContainer>
                </div>
            </HeaderContainer>
            <ContentContainer>{children}</ContentContainer>
            <FooterContainer>
                <Footer />
            </FooterContainer>
        </Container>
    )
}

const Container = styled.div`
    padding: 28px 42px 28px 42px;
    width: ${LayoutSize.innerWidth}px;
    margin: auto;
`

const HeaderContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    margin: auto;
    width: ${LayoutSize.innerWidth}px;
`

const ChainStatusContainer = styled.div`
    margin-top: 4px;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 890px;
    justify-content: flex-end;
`

const MenuContainer = styled.div`
    margin-top: 21px;
`

const ContentContainer = styled.div`
    margin-top: 50px;
`

const FooterContainer = styled.div`
    margin-top: 140px;
`

const LogoLink = styled(Link)`
    font-size: 0;
`

export default Layout
