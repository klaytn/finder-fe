import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Flex, percentageToHex, Tooltip, typos, withAlpha } from '@klaytn/slush'

import { getThemeColor } from '../functions/colorMap'

export type ButtonGroupItem = {
    title: ReactNode
    value: string
    decorator?: string
    disableMessage?: string
}

type ButtonGroupProps = {
    buttons: ButtonGroupItem[]
    selectedValue: string
    onChange?: (selectedItemValue: string) => void
}

const ButtonGroup = ({ buttons, selectedValue, onChange }: ButtonGroupProps) => {
    return (
        <Container>
            {buttons.map((item) => (
                <Tooltip message={item.disableMessage} key={item.value}>
                    <Button
                        disabled={!!item.disableMessage}
                        isSelected={selectedValue === item.value}
                        onClick={() => onChange?.(item.value)}
                    >
                        {item.title}
                        {item.decorator && (
                            <Decorator isSelected={selectedValue === item.value}>{item.decorator}</Decorator>
                        )}
                    </Button>
                </Tooltip>
            ))}
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    align-items: center;
    background-color: ${getThemeColor(colors.white)}${percentageToHex(5)};
    border-radius: 16px;
`

const Button = styled.button<{ isSelected: boolean }>`
    margin: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    text-align: center;
    ${typos.suit['14.18_900']};

    border-radius: 12px;
    border: none;
    outline: none;
    background-color: ${getThemeColor(({ isSelected }) => (isSelected ? colors.white : 'transparent'))}${({ isSelected }) => (isSelected ? percentageToHex(10) : '')};
    color: ${getThemeColor(({ isSelected }) => (isSelected ? colors.blue[400] : colors.black[500]))};
    cursor: pointer;

    &:disabled {
        color: ${getThemeColor(withAlpha(colors.white, 5))};
        cursor: inherit;
    }
`

const Decorator = styled.span<{ isSelected: boolean }>`
    margin-left: 8px;
    display: flex;
    padding: 3px 10px;
    color: ${getThemeColor(colors.white)};
    background-color: ${getThemeColor(({ isSelected }) => (isSelected ? colors.blue[850] : colors.black[800]))};
    border-radius: 8px;
    ${typos.suit['12.16_400']};
`

export default ButtonGroup
