import { forwardRef, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

import { Color } from '../styles/colors'
import { Typo, typos } from '../styles/typos'
import { useTheme } from '../themes/provider'
import { setTransition } from '../utils/animation'

type CheckProps = {
    label: string
    checked?: boolean
    labelProps?: {
        typo?: Typo
        color?: Color
    }
} & InputHTMLAttributes<HTMLInputElement>

const Check = forwardRef<HTMLInputElement, CheckProps>(
    ({ label, checked = false, labelProps = {}, ...restProps }: CheckProps, ref) => {
        const { check } = useTheme()

        return (
            <CheckLabel {...labelProps}>
                <CheckInput {...restProps} checked={checked} type="checkbox" ref={ref} />
                <CheckContainer checked={checked}>
                    <CheckboxIconContainer checked={checked}>
                        <CheckboxIcon color={check.icon} />
                    </CheckboxIconContainer>
                </CheckContainer>
                {label}
            </CheckLabel>
        )
    },
)

Check.displayName = 'Check'

const CheckInput = styled.input`
    display: none;
`

const CheckContainer = styled.div<{ checked: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    ${setTransition('background-color', 'border')};

    background: ${({ theme, checked }) => (checked ? theme.check.background.selected : theme.check.background.normal)};
    border: 1px solid ${({ theme, checked }) => (checked ? theme.check.border.selected : theme.check.border.normal)};
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-radius: 5px;
`

const CheckboxIconContainer = styled.div<{ checked: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    ${setTransition('opacity')};

    width: 16px;
    height: 16px;
    box-sizing: border-box;
`

const CheckLabel = styled.label<{ typo?: Typo; color?: Color }>`
    display: flex;
    align-items: center;
    gap: 8px;
    ${({ typo }) => typo || typos.suit['12.16_400']};
    color: ${({ theme, color }) => color || theme.check.text};
    cursor: pointer;
`

type CheckboxIconProps = {
    color: string
}
const CheckboxIcon = ({ color }: CheckboxIconProps) => {
    return (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9 0.5C8.72 0.5 8.47 0.61 8.29 0.79L4 5.09L1.71 2.79C1.53 2.61 1.28 2.5 1 2.5C0.45 2.5 0 2.95 0 3.5C0 3.78 0.11 4.03 0.29 4.21L3.29 7.21C3.47 7.39 3.72 7.5 4 7.5C4.28 7.5 4.53 7.39 4.71 7.21L9.71 2.21C9.89 2.03 10 1.78 10 1.5C10 0.95 9.55 0.5 9 0.5Z"
                fill={color}
            />
        </svg>
    )
}

export default Check
