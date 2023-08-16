import { createContext, ForwardedRef, forwardRef, useContext } from 'react'
import styled, { useTheme } from 'styled-components'

import { typos } from '../styles/typos'
import { Theme } from '../themes/provider'
import { noop } from '../utils/common'
import { Box } from './box'
import { CheckboxActiveIcon, RadioCheckIcon, ShapeCircleOnIcon } from './icon'
import CheckboxOffIcon from './icon/checkboxOffIcon'
import { Text } from './text'

export type RadioOption = {
    text: string
    value: unknown
} | null

type RadioContextState = {
    selected: RadioOption
    onSelect(option: RadioOption): void
}

const radioContext = createContext<RadioContextState>({
    selected: null,
    onSelect: noop,
})

type RadioFormProps = RadioContextState & {
    children: React.ReactNode
}

const RadioForm = ({ children, selected, onSelect }: RadioFormProps) => {
    return (
        <radioContext.Provider
            value={{
                selected,
                onSelect,
            }}
        >
            {children}
        </radioContext.Provider>
    )
}

const useRadioContext = () => {
    const context = useContext(radioContext)
    if (!context) {
        throw new Error('')
    }
    return context
}

const Icon = ({ isSelected }: { isSelected: boolean }) => {
    const { radiobox, slush } = useTheme()
    if (slush === Theme.light) {
        return <>{isSelected ? <CheckboxActiveIcon size={16} /> : <CheckboxOffIcon size={16} />}</>
    }
    return <>{isSelected ? <RadioCheckIcon size={16} /> : <ShapeCircleOnIcon size={16} color={radiobox.icon} />}</>
}

const RadioItem = forwardRef(({ option }: { option: RadioOption }, ref: ForwardedRef<HTMLDivElement>) => {
    const { selected, onSelect } = useRadioContext()
    const isSelected = selected?.value === option?.value
    const { radiobox } = useTheme()
    return (
        <RadioBox selected={isSelected} onClick={() => onSelect(option)} ref={ref}>
            <Icon isSelected={selected?.value === option?.value} />
            <RadioText
                typo={isSelected ? typos.suit['14.18_900'] : typos.suit['14.18_400']}
                color={isSelected ? radiobox.selected.color : radiobox.color}
            >
                {option?.text}
            </RadioText>
        </RadioBox>
    )
})

RadioItem.displayName = 'RadioItem'

const RadioBox = styled(Box)<{ selected: boolean }>`
    padding: 13px 24px;
    width: calc(100% - 48px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    background: ${({ selected, theme: { radiobox } }) => (selected ? radiobox.selected.background : 'transparent')};

    &:hover {
        background: ${({ theme: { radiobox } }) => radiobox.selected.background};
    }

    &:last-child {
        border-bottom-left-radius: 14px;
        border-bottom-right-radius: 14px;
    }
`

const RadioText = styled(Text)`
    margin-left: 8px;
    user-select: none;
`

RadioForm.Item = RadioItem

export default RadioForm
