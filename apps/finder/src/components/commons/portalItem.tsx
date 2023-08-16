import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../../functions/colorMap'
import { Portal } from '../../variants/resource'

const PortalItem = ({ icon: PortalIcon, name, link }: Portal) => {
    return (
        <PortalContainer href={link} target="_blank" rel="noreferrer">
            <PortalIconContainer>
                <PortalIcon size={24} />
            </PortalIconContainer>

            <PortalTextContainer>
                <PortalNameText>{name}</PortalNameText>
            </PortalTextContainer>
        </PortalContainer>
    )
}

const PortalContainer = styled.a`
    display: flex;
    direction: row;
    justify-content: space-between;
    border-radius: 16px;
    align-items: center;
    padding: 8px;
    background-color: ${getThemeColor(colors.black[830])};
    margin-bottom: 12px;
    overflow: hidden;
    white-space: nowrap;
    flex-basis: auto;
    flex: 1;
`

const PortalIconContainer = styled(Flex).attrs({
    justifyContent: 'center',
})`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    align-items: center;
    background: ${colors.black[900]};
`

const PortalTextContainer = styled(Flex)`
    flex-grow: 1;
    flex-basis: min-content;
    margin-left: 8px;
    margin-right: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['12.16_400']};
`

const PortalNameText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export default PortalItem
