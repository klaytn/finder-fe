import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, Flex, ListNormalIcon } from '@klaytn/slush'

import NetworkSwitcher from '../../../components/NetworkSwitcher'
import { ROUTES } from '../../../constants/routes'
import { useResources } from '../../../context/configProvider'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

type HeaderProps = {
    onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const whiteColor = useFinderThemeColor(colors.white)
    const { LogoComponent } = useResources()

    return (
        <Container direction="row" justifyContent="space-between">
            <Link to={ROUTES.HOME}>
                <LogoContainer>
                    <LogoComponent width={120} height={17.61} />
                </LogoContainer>
            </Link>
            <RightContainer direction="row" justifyContent="space-between">
                <NetworkSwitcher />
                <MenuContainer onClick={onMenuClick}>
                    <ListNormalIcon color={whiteColor} size={24} />
                </MenuContainer>
            </RightContainer>
        </Container>
    )
}

const Container = styled(Flex)`
    align-items: center;
`

const LogoContainer = styled(Flex)``

const RightContainer = styled(Flex)`
    align-items: center;
`

const MenuContainer = styled(Flex)`
    margin-left: 12px;
`

export default Header
