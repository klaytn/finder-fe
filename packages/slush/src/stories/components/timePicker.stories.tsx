import { ComponentMeta } from '@storybook/react'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

import TimePickerComponent from '../../components/timePicker'

const metaData: ComponentMeta<typeof TimePickerComponent> = {
    title: 'Components/TimePicker',
    component: TimePickerComponent,
    argTypes: {},
}
export default metaData

export const TimePicker = () => {
    const [value, setValue] = useState(() => new Date(2022, 1, 1, 21, 36))

    const handleChange = useCallback((value: Date) => {
        console.log(value)
        setValue(value)
    }, [])

    return (
        <Container>
            <TimePickerComponent value={value} onChange={handleChange} />
        </Container>
    )
}

TimePicker.storyName = 'TimePicker'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 150px;
    margin: 10px;
`
