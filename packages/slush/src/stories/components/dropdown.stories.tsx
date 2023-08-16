import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import styled from 'styled-components'

import { default as DropdownComponent } from '../../components/dropdown'
import RadioForm, { RadioOption } from '../../components/radiobox'
import { Text } from '../../components/text'
import { typos } from '../../styles/typos'
import { useTheme } from '../../themes/provider'

const metaData: ComponentMeta<typeof DropdownComponent> = {
    title: 'Components/Dropdown',
    component: DropdownComponent,
    argTypes: {},
}
export default metaData

export const Dropdown = () => {
    const orderOptions = [
        {
            text: 'Ascending',
            value: '0',
        },
        {
            text: 'Descending',
            value: '1',
        },
    ]

    const dataOptions = [
        {
            text: 'Time',
            value: '0',
        },
        {
            text: 'Total Supply',
            value: '1',
        },
        {
            text: 'Total Transfer',
            value: '2',
        },
    ]
    const [orderSelected, setOrderSelected] = useState<RadioOption>(null)
    const [dataSelected, setDataSelected] = useState<RadioOption>(null)
    const {
        dropdown: { button },
    } = useTheme()
    return (
        <DropdownComponent buttonText={<ButtonText color={button.color}>Sorting</ButtonText>} align="left">
            <RadioForm selected={orderSelected} onSelect={(option) => setOrderSelected(option)}>
                <DropdownComponent.Title>Order by</DropdownComponent.Title>
                {orderOptions.map((option) => (
                    <DropdownComponent.Item key={option.value}>
                        <RadioForm.Item option={option} />
                    </DropdownComponent.Item>
                ))}
            </RadioForm>
            <RadioForm selected={dataSelected} onSelect={(option) => setDataSelected(option)}>
                <DropdownComponent.Title>Data</DropdownComponent.Title>
                {dataOptions.map((option) => (
                    <DropdownComponent.Item key={option.value}>
                        <RadioForm.Item option={option} />
                    </DropdownComponent.Item>
                ))}
            </RadioForm>
        </DropdownComponent>
    )
}

const ButtonText = styled(Text).attrs({
    typo: typos.suit['14.18_400'],
})`
    width: 64px;
    text-align: start;
    margin-right: 6px;
`

Dropdown.storyName = 'Dropdown'
