import { ComponentMeta } from '@storybook/react'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

import DatePickerComponent from '../../components/datePicker'

const metaData: ComponentMeta<typeof DatePickerComponent> = {
    title: 'Components/DatePicker',
    component: DatePickerComponent,
    argTypes: {},
}
export default metaData

export const DatePicker = () => {
    const [value, setValue] = useState(() => new Date(2022, 1, 1, 21, 36))

    const handleChange = useCallback((value: Date) => {
        console.log(value)
        setValue(value)
    }, [])

    return (
        <Container>
            <DatePickerComponent value={value} onChange={handleChange} />
        </Container>
    )
}

DatePicker.storyName = 'DatePicker'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 150px;
    margin: 10px;
`
