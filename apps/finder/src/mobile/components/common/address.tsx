import { useLinkClickHandler } from 'react-router-dom'
import styled from 'styled-components'

import { colors, Flex, Text, Theme, typos } from '@klaytn/slush'

import { useFinderTheme } from '../../../context/finderThemeProvider'
import { extractProp } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { AddressVO } from '../../../vo/address'

type AddressProps = {
    address?: AddressVO
    grow?: number
    link?: string
    isSuccess?: boolean
    showHash?: boolean
}

const Address = ({
    address,
    grow,
    link = `/account/${address?.address}`,
    isSuccess = true,
    showHash = false,
}: AddressProps) => {
    const handleClick = useLinkClickHandler<HTMLDivElement>(link)

    const {
        theme: { slush },
    } = useFinderTheme()
    const isDarkMode = slush === Theme.dark
    const successTextColor = isDarkMode ? colors.blue[200] : colors.blue[700]
    const failTextColor = isDarkMode ? colors.red[200] : colors.red[700]
    const successBgColor = isDarkMode ? colors.blue[850] : colors.blue[200]
    const failBgColor = isDarkMode ? colors.red[850] : colors.red[200]

    const textColor = isSuccess ? successTextColor : failTextColor
    const bgColor = isSuccess ? successBgColor : failBgColor
    const iconColor = useFinderThemeColor(isSuccess ? colors.white : colors.red[600])

    if (!address) {
        return null
    }

    const { displayName, icon, displayIcon: DisplayIcon } = address

    const hasIcon = !!(icon || DisplayIcon)

    return (
        <Container direction="row" grow={grow}>
            {hasIcon && (
                <IconContainer>
                    {icon ? <IconImg src={icon} /> : <DisplayIcon size={16} color={iconColor} />}
                </IconContainer>
            )}

            <LabelContainer onClick={handleClick} backgroundColor={bgColor}>
                <LabelText color={textColor}>{showHash ? address.address : displayName}</LabelText>
            </LabelContainer>
        </Container>
    )
}

const Container = styled(Flex)<{ grow?: number }>`
    align-items: center;
    overflow: hidden;
    flex-grow: ${extractProp('grow')};
    flex-basis: 0;
    gap: 2px;
`

const IconContainer = styled(Flex)`
    margin-right: 2px;
`

const IconImg = styled.img`
    width: 14px;
    background-color: ${colors.white};
    border: 1px solid ${colors.black[900]};
    border-radius: 50%;
`

const LabelContainer = styled(Flex)<{ backgroundColor: string }>`
    background-color: ${extractProp('backgroundColor')};
    padding: 3px 7px 3px 10px;
    border-radius: 8px;
    flex-grow: 1;
    overflow: hidden;
`

const LabelText = styled(Text).attrs({
    typo: typos.code['12.16_400'],
})`
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
`

export default Address
