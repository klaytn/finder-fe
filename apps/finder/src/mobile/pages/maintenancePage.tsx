import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, FaceNervousIcon, Flex, Text, typos } from '@klaytn/slush'

import ContactItem from '../../components/commons/contactItem'
import { ROUTES } from '../../constants/routes'
import { useResources } from '../../context/configProvider'
import { getThemeColorOnAttrs } from '../../functions/colorMap'
import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'

const MaintenancePage = () => {
    const whiteColor = useFinderThemeColor(colors.white)
    const { LogoComponent, contacts } = useResources()
    return (
        <Container>
            <LogoLink to={ROUTES.HOME}>
                <LogoComponent width={223} height={33} />
            </LogoLink>

            <ContentContainer>
                <FaceNervousIcon size={44} color={whiteColor} />
                <TitleText>
                    Server is <br />
                    Under maintenance.
                </TitleText>
                <DescText>
                    Even if it takes some time,
                    <br />
                    we will check it carefully and open it.
                </DescText>
            </ContentContainer>

            <IconsContainer>
                {contacts.map((contact) => (
                    <ContactItem key={contact.link} {...contact} />
                ))}
            </IconsContainer>
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'column',
    justifyContent: 'center',
})`
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
`

const LogoLink = styled(Link)`
    font-size: 0;
`

const ContentContainer = styled(Flex).attrs({
    direction: 'column',
    justifyContent: 'center',
})`
    align-items: center;
    margin-top: 52px;
    margin-bottom: 48px;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['24.32_900'],
        color: colors.white,
    }),
)`
    text-align: center;
    margin-top: 8px;
`

const DescText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['18.24_400'],
        color: colors.white,
    }),
)`
    text-align: center;
    margin-top: 16px;
`

const IconsContainer = styled(Flex).attrs({
    direction: 'row',
})`
    gap: 12px;
    opacity: 0.5;
`

export default MaintenancePage
