import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button, colors, Flex, gap, typos } from '@klaytn/slush'

import ContactItem from '../../../components/commons/contactItem'
import ToggleFinderTheme from '../../../components/commons/toogleFinderTheme'
import { ROUTES } from '../../../constants/routes'
import { useResources } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'

const Footer = () => {
    const { FooterLogoComponent, contacts, keyCurrency, contactLink } = useResources()

    const handleContactUs = useCallback(() => {
        if (!contactLink) {
            return
        }

        window.open(contactLink, '_blank', 'noopener')
    }, [contactLink])

    return (
        <Container>
            <LogoContainer>
                <LogoRow direction="row" justifyContent="space-between">
                    <LogoLink to={ROUTES.HOME}>
                        <FooterLogoComponent width={186} height={45} />
                    </LogoLink>
                </LogoRow>

                <CopyrightSpan>
                    Copyright © {keyCurrency.copyright}.
                    <br />
                    All Rights Reserved.
                </CopyrightSpan>

                {!!contactLink && (
                    <ContactUsButton buttonType="second" size={32} onClick={handleContactUs}>
                        Contact Us
                    </ContactUsButton>
                )}

                <CommunityTextSpan>{keyCurrency.name} Community</CommunityTextSpan>
                <IconsContainer direction="row">
                    {contacts.map((contact) => (
                        <ContactItem key={contact.link} {...contact} />
                    ))}
                </IconsContainer>
            </LogoContainer>

            <ToggleThemeContainer>
                <ToggleFinderTheme />
            </ToggleThemeContainer>
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    align-items: end;
`

const LogoContainer = styled(Flex).attrs({
    direction: 'column',
})`
    margin-top: 40px;
`

const CopyrightSpan = styled.span`
    display: block;
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)};
    opacity: 0.5;
    margin-bottom: 12px;
`

const LogoRow = styled(Flex)`
    align-items: center;
    margin-bottom: 12px;
    opacity: 0.5;
`

const CommunityTextSpan = styled.span`
    display: block;
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)};
    opacity: 0.5;
    margin-bottom: 8px;
`

const IconsContainer = styled(Flex)`
    ${gap(12)};
    opacity: 0.5;
`

const ToggleThemeContainer = styled(Flex)``

const LogoLink = styled(Link)`
    font-size: 0;
`

const ContactUsButton = styled(Button)`
    margin: 0;
    width: 96px;
    margin-bottom: 24px;
`

export default Footer
