import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, FaceNervousIcon, Flex, Text, typos } from '@klaytn/slush'

import ContactItem from '../../../components/commons/contactItem'
import { Layout } from '../../../constants/layout'
import { ROUTES } from '../../../constants/routes'
import { useResources } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

const Maintenance = () => {
    const { LogoComponent, contacts } = useResources()
    const whiteColor = useFinderThemeColor(colors.white)

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
    width: ${Layout.width}px;
    height: 100%;
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
        typo: typos.suit['32.44_900'],
        color: colors.white,
    }),
)`
    text-align: center;
    margin-top: 8px;
`

const DescText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['20.28_400'],
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

export default Maintenance
