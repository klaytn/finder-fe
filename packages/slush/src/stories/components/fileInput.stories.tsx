import { ComponentMeta } from '@storybook/react'
import { ChangeEventHandler, useState } from 'react'
import styled from 'styled-components'

import { Flex } from '../../components/box'
import FileInputComponent from '../../components/fileInput'

const metaData: ComponentMeta<typeof FileInputComponent> = {
    title: 'Components/FileInput',
    component: FileInputComponent,
    argTypes: {
        placeholder: {
            defaultValue: 'Placeholder',
            type: 'string',
        },
    },
}
export default metaData

export const FileInput = ({ placeholder }: Parameters<typeof FileInputComponent>[0]) => {
    const [value, setValue] = useState('')

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setValue(value)
    }

    const handleClear = () => {
        setValue('')
    }

    return (
        <Container>
            <FileInputComponent onChange={handleChange} onClear={handleClear} value={value} placeholder={placeholder} />
        </Container>
    )
}

const Container = styled(Flex)`
    width: 460px;
    margin: 20px;
`

FileInput.storyName = 'FileInput'
