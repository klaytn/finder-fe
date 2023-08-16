import { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import styled, { DefaultTheme } from 'styled-components'

import { colors, Flex, If, Label, LabelColorKey, LabelProps, Tooltip, typos } from '@klaytn/slush'

import { AddressInfo, isAddressInfo } from '../api/api'
import { useFinderTheme } from '../context/finderThemeProvider'
import { getThemeColor } from '../functions/colorMap'
import { extractProp } from '../functions/Functions'
import { AddressVO } from '../vo/address'

const getColor = (
    failed: boolean,
    selected: boolean,
    theme: { theme: DefaultTheme },
): { icon: string; label: LabelColorKey; override?: Record<string, string> } => {
    if (failed && selected) {
        return {
            icon: getThemeColor(colors.red[200])(theme),
            label: 'red',
            override: {
                backgroundColor: getThemeColor(colors.red[200])(theme),
                color: getThemeColor(colors.red[700])(theme),
            },
        }
    }

    if (selected) {
        return {
            icon: getThemeColor(colors.blue[200])(theme),
            label: 'blue',
            override: {
                backgroundColor: getThemeColor(colors.blue[200])(theme),
                color: getThemeColor(colors.blue[700])(theme),
            },
        }
    }

    if (failed) {
        return {
            icon: getThemeColor(colors.red[600])(theme),
            label: 'red',
        }
    }
    return {
        icon: getThemeColor(colors.blue[200])(theme),
        label: 'blue',
    }
}

interface IAddressProps {
    failed?: boolean
    value: string | AddressInfo | undefined
    color?: string
    backgroundColor?: string
    selectedAddress?: string
    noIcon?: boolean
    noLink?: boolean
    big?: boolean
    grow?: number
    basis?: number
    shrink?: number
    containerStyle?: CSSProperties
    openInNewPage?: boolean
}

const TokenInfoTooltipContent = ({ name, symbol, icon }: Pick<AddressInfo, 'name' | 'symbol' | 'icon'>) => {
    return (
        <TooltipContentContainer>
            {!!icon && (
                <Content>
                    <LogoImg src={icon} width={20} height={20} />
                </Content>
            )}
            <Content>
                {name} ({symbol})
            </Content>
        </TooltipContentContainer>
    )
}

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LogoImg = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${colors.white};
    border: 1px solid ${getThemeColor(colors.white)};
`

const TooltipContentContainer = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 4px 0px;
`

const hasNecessaryInfo = (addressInfo: AddressInfo) => !!addressInfo.name && !!addressInfo.symbol

const getName = (displayName: string, value: string, addressInfo?: string | AddressInfo) => {
    if (isAddressInfo(addressInfo) && hasNecessaryInfo(addressInfo)) {
        return <TokenInfoTooltipContent name={addressInfo.name} symbol={addressInfo.symbol} icon={addressInfo.icon} />
    }

    if (displayName !== value) {
        return displayName
    }

    return ''
}

const Address = (props: IAddressProps) => {
    const theme = useFinderTheme()

    const failed = props.failed || false
    const address = props.value === undefined ? '' : typeof props.value === 'string' ? props.value : props.value.address
    const type = address.length === 66 ? 'tx' : 'account'
    const {
        noIcon,
        selectedAddress,
        noLink = false,
        big = false,
        grow,
        basis,
        shrink,
        containerStyle,
        openInNewPage = false,
    } = props

    const addressVO = AddressVO.from(props.value)
    const AddressIcon = addressVO?.displayIcon
    const iconImage = addressVO?.icon
    const displayName = addressVO?.displayName || address

    const tooltipName = getName(displayName, address, props.value)

    const isSelected = selectedAddress === address
    const colorMap = getColor(failed, isSelected, theme)
    const labelProps: LabelProps = {
        size: big ? 'large' : 'medium',
        color: colorMap.label,
        override: {
            color: props.color || colorMap.override?.color,
            backgroundColor: colorMap.override?.backgroundColor,
            typo: big ? typos.code['14.18_400'] : typos.code['12.16_400'],
        },
        display: 'inline-grid',
    }

    if (address === '') {
        return null
    }

    return (
        <>
            <Container grow={grow} basis={basis} shrink={shrink} style={containerStyle}>
                {!noIcon && (AddressIcon || iconImage) && (
                    <IconContainer>
                        {iconImage ? (
                            <IconImg src={iconImage} />
                        ) : (
                            AddressIcon && <AddressIcon size={20} color={colorMap.icon} />
                        )}
                    </IconContainer>
                )}
                <Tooltip message={tooltipName}>
                    <Label {...labelProps}>
                        <If condition={isSelected || noLink}>
                            <LabelSpan>{displayName}</LabelSpan>
                        </If>
                        <If condition={!isSelected && !noLink}>
                            <LabelLink to={`/${type}/${address}`} target={openInNewPage ? '_blank' : undefined}>
                                {displayName}
                            </LabelLink>
                        </If>
                    </Label>
                </Tooltip>
            </Container>
        </>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
})<{ grow?: number; maxWidth?: number; basis?: number; shrink?: number }>`
    align-items: center;
    overflow: hidden;
    flex-grow: ${extractProp('grow')};
    flex-basis: ${extractProp('basis')};
    flex-shrink: ${extractProp('shrink')};
`

const IconContainer = styled(Flex)`
    margin-right: 4px;
    width: 20px;
`

const IconImg = styled.img`
    width: 18px;
    border-radius: 50%;
    background-color: ${colors.white};
    border: 1px solid ${getThemeColor(colors.white)};
`

const LabelLink = styled(Link)`
    color: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const LabelSpan = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export default Address
