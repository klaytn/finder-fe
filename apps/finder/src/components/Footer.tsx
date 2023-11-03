import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button, colors, Flex, percentageToHex, typos } from '@klaytn/slush'

import { Layout } from '../constants/layout'
import { ROUTES } from '../constants/routes'
import { useResources } from '../context/configProvider'
import { getThemeColor } from '../functions/colorMap'
import ContactItem from './commons/contactItem'
import ToggleFinderTheme from './commons/toogleFinderTheme'

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
            <LeftContainer>
                <LogoContainer>
                    <LogoLink to={ROUTES.HOME}>
                        <FooterLogoComponent width={186} height={45} opacity={0.5} />
                    </LogoLink>
                    <div>
                        <ToggleFinderTheme />
                    </div>
                </LogoContainer>
                <CopyrightSpan>
                    Copyright &copy; {keyCurrency.copyright}.
                    <br />
                    All Rights Reserved.
                </CopyrightSpan>
            </LeftContainer>
            <RightContainer>
                {!!contactLink && (
                    <ContactUsButton buttonType="second" size={32} onClick={handleContactUs}>
                        Contact Us
                    </ContactUsButton>
                )}
                <ContactContainer>
                    <CommunityTextSpan>{keyCurrency.name} Community</CommunityTextSpan>
                    <IconContainer>
                        {contacts.map((contact) => (
                            <ContactItem key={contact.link} {...contact} />
                        ))}
                    </IconContainer>
                </ContactContainer>
            </RightContainer>
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    width: ${Layout.innerWidth}px;
    margin: auto;
    padding-bottom: 44px;
`

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

const CopyrightSpan = styled.span`
    display: block;
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)}${percentageToHex(50)};
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-end;
    gap: 16px;
`

const ContactUsButton = styled(Button)`
    margin: 0;
    width: 96px;
`

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
`

const IconContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    gap: 8px;
    opacity: 0.35;
`

const CommunityTextSpan = styled.span`
    display: block;
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)}${percentageToHex(50)};
`

const LogoLink = styled(Link)`
    font-size: 0;
`

export default Footer
