import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import Menu from '../../../components/Menu'
import NetworkSwitcher from '../../../components/NetworkSwitcher'
import WalletConnectivity from '../../../components/pc/walletConnectivity'
import { Layout } from '../../../constants/layout'
import { ROUTES } from '../../../constants/routes'
import { useFeatures, useResources } from '../../../context/configProvider'

const HomeGnb = () => {
    const { LogoComponent } = useResources()
    const { walletConnect = false } = useFeatures()

    return (
        <Container>
            <LogoContainer>
                <LogoLink to={ROUTES.HOME}>
                    <LogoComponent width={223} height={33} />
                </LogoLink>
                <RightContainer>
                    {walletConnect && <WalletConnectivity />}
                    <NetworkSwitcher />
                </RightContainer>
            </LogoContainer>
            <MenuContainer>
                <Menu />
            </MenuContainer>
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'column',
    justifyContent: 'space-between',
})`
    width: ${Layout.innerWidth}px;
    margin: auto;
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

const MenuContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 21px;
`

const LogoLink = styled(Link)`
    font-size: 0;
`

export default HomeGnb
