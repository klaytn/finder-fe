import { ComponentMeta } from '@storybook/react'
import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

import { Flex } from '../../components/box'
import RadioComponent from '../../components/radio'
import { colors } from '../../styles/colors'
import { Theme } from '../../themes/provider'

const metaData: ComponentMeta<typeof RadioComponent> = {
    title: 'Components/Radio',
    component: RadioComponent,
}
export default metaData

export const Radio = () => {
    const [selected, setSelected] = useState('')

    const handleSelect = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSelected(value)
    }

    return (
        <Container>
            <RadioComponent label="True" value="true" onChange={handleSelect} checked={selected === 'true'} />
            <RadioComponent label="False" value="false" onChange={handleSelect} checked={selected === 'false'} />
            selected: {selected}
        </Container>
    )
}

const Container = styled(Flex)`
    width: 460px;
    margin: 20px;
    color: ${({ theme }) => (theme.slush === Theme.dark ? colors.white : colors.black[900])};
    gap: 4px;
`
