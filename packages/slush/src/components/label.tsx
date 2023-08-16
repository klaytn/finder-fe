import { CSSProperties, FC, useMemo } from 'react'
import styled, { css } from 'styled-components'

import { Color } from '../styles/colors'
import { LabelSize } from '../styles/size'
import { KeyofTypos, typos } from '../styles/typos'
import { useTheme } from '../themes/provider'
import { Varient, LabelColor, LabelColorKey } from '../themes/type'
import { ValuesType } from '../types/utility-types'
import { Icon, MathCloseIcon } from './icon'

const sizeMap = {
    xlarge: {
        height: 36,
        typo: typos.suit['18.24_400'],
        padding: {
            width: 20,
            height: 8,
        },
        round: 13,
        closeIconSize: 18,
        iconSize: 20,
    },
    large: {
        height: 28,
        typo: typos.suit['14.18_400'],
        padding: {
            width: 12,
            height: 4,
        },
        round: 10,
        closeIconSize: 12,
        iconSize: 14,
    },
    medium: {
        height: 22,
        typo: typos.suit['12.16_400'],
        padding: {
            width: 10,
            height: 3,
        },
        round: 8,
        closeIconSize: 10,
        iconSize: 12,
    },
    small: {
        height: 18,
        typo: typos.suit['10.14_400'],
        padding: {
            width: 8,
            height: 2,
        },
        round: 7,
        closeIconSize: 10,
        iconSize: 0,
    },
} as const

export type LabelProps = {
    color?: LabelColorKey
    size?: LabelSize
    varient?: Varient
    onDelete?: () => void
    override?: {
        backgroundColor?: Color
        color?: Color
        typo?: ValuesType<typeof typos[KeyofTypos]>
    }
    disabled?: boolean
    icon?: Icon
    iconAlign?: 'left' | 'right'
    display?: CSSProperties['display']
}

export const Label: FC<LabelProps> = ({
    color = 'blue',
    size = 'large',
    varient = 'default',
    onDelete,
    children,
    override = {},
    disabled = false,
    icon,
    iconAlign,
    display = 'inline-block',
}) => {
    const {
        label: { default: defaultVarient, filled },
    } = useTheme()

    const labelColor = useMemo(() => {
        if (varient === 'filled' && filled) {
            return filled[color]
        }
        return defaultVarient[color]
    }, [color, defaultVarient, filled, varient])

    const IconComponent = icon

    const hasLeftIcon = IconComponent && iconAlign === 'left'
    const hasRightIcon = IconComponent && !!iconAlign && iconAlign === 'right'

    return (
        <Container
            size={size}
            fill={labelColor.fill}
            color={labelColor.color}
            override={override}
            disabled={disabled}
            display={display}
        >
            {hasLeftIcon && (
                <IconBox size={sizeMap[size].iconSize} marginRight={6}>
                    <IconComponent size={sizeMap[size].iconSize} color={labelColor.color} />
                </IconBox>
            )}
            {children}
            {hasRightIcon && (
                <IconBox size={sizeMap[size].iconSize} marginLeft={6}>
                    <IconComponent size={sizeMap[size].iconSize} color={labelColor.color} />
                </IconBox>
            )}
            {onDelete && !hasRightIcon && (
                <IconBox size={sizeMap[size].closeIconSize} marginLeft={4}>
                    <MathCloseIcon size={sizeMap[size].closeIconSize} color={labelColor.color} />
                </IconBox>
            )}
        </Container>
    )
}

const ellipsis = css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const Container = styled.div<Required<LabelColor & Pick<LabelProps, 'size' | 'override' | 'disabled' | 'display'>>>`
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    background-color: ${({ fill, override }) => override.backgroundColor || fill};
    color: ${({ color, override }) => override.color || color};
    line-height: ${({ size }) => sizeMap[size].height}px;
    height: ${({ size }) => sizeMap[size].height - sizeMap[size].padding.height * 2}px;
    padding: ${({ size }) => `${sizeMap[size].padding.height}px ${sizeMap[size].padding.width}px `};
    border-radius: ${({ size }) => sizeMap[size].round}px;
    ${({ size, override }) => override.typo || sizeMap[size].typo}
    display: ${({ display }) => display};
    align-items: center;
    ${ellipsis}
`

const IconBox = styled.span<{ marginRight?: number; marginLeft?: number; size: number }>`
    margin-left: ${({ marginLeft }) => marginLeft || 0}px;
    margin-right: ${({ marginRight }) => marginRight || 0}px;
    line-height: ${({ size }) => size}px;
`
