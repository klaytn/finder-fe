import { ComponentMeta } from '@storybook/react'
import { ChangeEventHandler, useState } from 'react'
import styled from 'styled-components'

import { Box, Flex } from '../../components/box'
import { Button } from '../../components/button'
import { SearchNormalIcon } from '../../components/icon'
import { Input as InputComponent } from '../../components/input'
import { Label } from '../../components/label'

const metaData: ComponentMeta<typeof InputComponent> = {
    title: 'Components/Input',
    component: InputComponent,
    argTypes: {
        placeholder: {
            defaultValue: 'Placeholder',
            type: 'string',
        },
        valid: {
            defaultValue: true,
            type: 'boolean',
        },
        disabled: {
            defaultValue: false,
            type: 'boolean',
        },
    },
}
export default metaData

const ExampleButton = () => {
    return (
        <Button
            buttonType="first"
            size={28}
            style={{
                margin: 0,
            }}
        >
            Text
        </Button>
    )
}

export const Input = ({ placeholder, valid, disabled }: Parameters<typeof InputComponent>[0]) => {
    const [value, setValue] = useState('')

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setValue(value)
    }

    const handleClear = () => {
        setValue('')
    }

    return (
        <Container>
            <InputComponent
                value={value}
                onChange={handleChange}
                onClear={handleClear}
                leftIcon={SearchNormalIcon}
                rightIcon={SearchNormalIcon}
                rightButton={ExampleButton}
                hasClearButton
                placeholder={placeholder}
                valid={valid}
                disabled={disabled}
                labels={[
                    () => (
                        <Label size="medium" color="black" disabled={disabled}>
                            label1
                        </Label>
                    ),
                ]}
            />
            <Box
                style={{
                    marginTop: 6,
                }}
            >
                <InputComponent
                    value={value}
                    onChange={handleChange}
                    onClear={handleClear}
                    rightIcon={SearchNormalIcon}
                    hasClearButton
                    placeholder={placeholder}
                    valid={valid}
                    disabled={disabled}
                />
            </Box>
            <Box
                style={{
                    marginTop: 6,
                }}
            >
                <InputComponent
                    value={value}
                    onChange={handleChange}
                    onClear={handleClear}
                    hasClearButton
                    placeholder={placeholder}
                    valid={valid}
                    disabled={disabled}
                    autoCompleteItems={['item1', 'item2', 'last item']}
                    onSelectOnAutoComplete={setValue}
                />
            </Box>
        </Container>
    )
}

const Container = styled(Flex)`
    width: 460px;
    margin: 20px;
`
