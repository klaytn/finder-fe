import styled from 'styled-components'

import { colors } from '@klaytn/slush'

import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'
import { Contact } from '../../variants/resource'

const ContactItem = ({ icon: ContactIcon, link }: Contact) => {
    const color = useFinderThemeColor(colors.white)
    return (
        <ContactContainer href={link} target="_blank" rel="noreferrer">
            <ContactIcon size={24} color={color} />
        </ContactContainer>
    )
}

const ContactContainer = styled.a`
    display: flex;
    font-size: 0;
`

export default ContactItem
