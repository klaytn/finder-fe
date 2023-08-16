import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

import { typos } from '../styles/typos'
import { setTransition } from '../utils/animation'

type RadioProps = {
    label?: string
    inputMargin?: number
} & InputHTMLAttributes<HTMLInputElement>

const Radio = ({ label, inputMargin, ...restProps }: RadioProps) => {
    return (
        <RadioLabel>
            <RadioInput {...restProps} inputMargin={inputMargin} type="radio" />
            {label}
        </RadioLabel>
    )
}

const RadioInput = styled.input<{ inputMargin?: number }>`
    background: ${({ theme }) => theme.radio.background.normal};
    border: 1px solid ${({ theme }) => theme.radio.border.normal};
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-radius: 100%;
    appearance: none;
    ${setTransition('background-color', 'border')};

    margin: ${({ inputMargin }) => inputMargin}px;
    &:checked {
        background: ${({ theme }) => theme.radio.background.selected};
        border: 3px solid ${({ theme }) => theme.radio.border.selected};
    }
`

const RadioLabel = styled.label`
    display: flex;
    align-items: end;
    gap: 8px;
    ${typos.suit['12.16_400']};
    color: ${({ theme }) => theme.radio.text};
`

export default Radio
