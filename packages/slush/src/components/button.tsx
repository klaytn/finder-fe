import { ButtonHTMLAttributes, forwardRef } from 'react'
import styled, { css } from 'styled-components'

import { typos } from '../styles/typos'
import { setTransition } from '../utils/animation'
import { Flex } from './box'
import { IconProps } from './icon/type'

const buttonSizes = {
    44: {
        width: '44px',
        height: '44px',
        padding: '10px 14px',
        iconOnlyPadding: '11px',
        typo: typos.suit['14.18_900'],
        iconSize: 18,
        iconPadding: 10,
        round: 16,
        iconOnlySize: 22,
    },
    40: {
        width: '40px',
        height: '40px',
        padding: '10px 12px',
        iconOnlyPadding: '10px',
        typo: typos.suit['14.18_900'],
        iconSize: 16,
        iconPadding: 10,
        round: 14,
        iconOnlySize: 20,
    },
    36: {
        width: '36px',
        height: '36px',
        padding: '8px 10px',
        iconOnlyPadding: '9px',
        typo: typos.suit['14.18_900'],
        iconSize: 16,
        iconPadding: 8,
        round: 12,
        iconOnlySize: 18,
    },
    32: {
        width: '32px',
        height: '32px',
        padding: '6px 8px',
        iconOnlyPadding: '8px',
        typo: typos.suit['12.16_900'],
        iconSize: 14,
        iconPadding: 6,
        round: 11,
        iconOnlySize: 16,
    },
    28: {
        width: '28px',
        height: '28px',
        padding: '4px 12px',
        iconOnlyPadding: '7px',
        typo: typos.suit['10.14_900'],
        iconSize: 10,
        iconPadding: 4,
        round: 10,
        iconOnlySize: 14,
    },
}

export type ButtonSize = keyof typeof buttonSizes

export type ButtonType = 'first' | 'second' | 'third' | 'forth'

export type ButtonProps = {
    buttonType?: ButtonType
    size?: ButtonSize
    leftIcon?: (props: IconProps) => JSX.Element
    rightIcon?: (props: IconProps) => JSX.Element
    radiusRemove?: 'left' | 'right' | 'both'
}

type ColorSetProps = {
    buttonType: ButtonType
}

const colorSet = css<ColorSetProps>`
    ${({ buttonType, theme: { button: buttonTheme } }) => css`
        color: ${buttonTheme[buttonType].text.normal};
        fill: ${buttonTheme[buttonType].text.normal};

        &:hover,
        &:focus {
            color: ${buttonTheme[buttonType].text.hover};
            fill: ${buttonTheme[buttonType].text.hover};
        }

        &:active {
            color: ${buttonTheme[buttonType].text.active};
            fill: ${buttonTheme[buttonType].text.active};
        }

        &:disabled {
            color: ${buttonTheme[buttonType].text.disable};
            fill: ${buttonTheme[buttonType].text.disable};
        }
    `}
`

const getRadius = (size: number, radiusRemove?: 'left' | 'right' | 'both') => {
    if (!radiusRemove) {
        return `${size}px`
    }

    switch (radiusRemove) {
        case 'both':
            return 'auto'
        case 'left':
            return `0 ${size}px ${size}px 0`
        case 'right':
            return `${size}px 0 0 ${size}px`
    }
}

type ContainerProps = {
    buttonType: ButtonType
    size: ButtonSize
    hasChildren: boolean
    radiusRemove?: 'left' | 'right' | 'both'
}

const Container = styled.button<ContainerProps>`
    cursor: pointer;
    margin: 5px;
    ${setTransition('background-color', 'color', 'border', 'outline')};
    ${colorSet};

    ${({ buttonType, size, hasChildren, theme: { button: buttonTheme }, radiusRemove }) => css`
        border-radius: ${getRadius(buttonSizes[size].round, radiusRemove)};
        background-color: ${buttonTheme[buttonType].background.normal};
        border: ${buttonTheme[buttonType].border?.normal ||
        buttonTheme[buttonType].background.normal ||
        '0px solid transparent'};
        outline: ${buttonTheme[buttonType].outline.normal || '0px solid transparent'};
        ${!hasChildren && `width: ${buttonSizes[size].width}`};
        height: ${buttonSizes[size].height};
        padding: ${hasChildren ? buttonSizes[size].padding : buttonSizes[size].iconOnlyPadding};
        ${buttonSizes[size].typo}

        &:hover {
            background-color: ${buttonTheme[buttonType].background.hover};
            border: ${buttonTheme[buttonType].border?.hover || buttonTheme[buttonType].background.hover};
            outline: ${buttonTheme[buttonType].outline.hover};
        }

        &:active {
            background-color: ${buttonTheme[buttonType].background.active};
            border: ${buttonTheme[buttonType].border?.active || buttonTheme[buttonType].background.active};
            outline: ${buttonTheme[buttonType].outline.normal};
        }

        &:disabled {
            cursor: auto;
            background-color: ${buttonTheme[buttonType].background.disable};
            border: ${buttonTheme[buttonType].border?.disable || buttonTheme[buttonType].background.disable};
            outline: ${buttonTheme[buttonType].outline.normal};
        }
    `}
`

const LeftBox = styled(Flex)<{ padding: number }>`
    padding-right: ${({ padding }) => padding}px;
`

const ContentsBox = styled(Flex).attrs({
    direction: 'row',
})`
    text-align: center;
`

const RightBox = styled(Flex)<{ padding: number }>`
    padding-left: ${({ padding }) => padding}px;
`

export const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonHTMLAttributes<unknown>>(
    ({ buttonType = 'first', size = 44, children, leftIcon, rightIcon, ...props }, ref) => {
        const LeftIcon = leftIcon
        const RightIcon = rightIcon

        const { iconSize, iconPadding, iconOnlySize } = buttonSizes[size]

        const hasChildren = !!children

        return (
            <Container buttonType={buttonType} size={size} hasChildren={hasChildren} {...props} ref={ref}>
                <ContentsContainer direction="row" justifyContent="center">
                    {LeftIcon && (
                        <LeftBox padding={hasChildren ? iconPadding : 0}>
                            <LeftIcon size={hasChildren ? iconSize : iconOnlySize} useOuterColor />
                        </LeftBox>
                    )}
                    {hasChildren && <ContentsBox>{children}</ContentsBox>}
                    {RightIcon && (
                        <RightBox padding={hasChildren ? iconPadding : 0}>
                            <RightIcon size={hasChildren ? iconSize : iconOnlySize} useOuterColor />
                        </RightBox>
                    )}
                </ContentsContainer>
            </Container>
        )
    },
)

Button.displayName = 'Button'

const ContentsContainer = styled(Flex)`
    align-items: center;
`
