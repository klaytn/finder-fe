import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Box } from '../../components/box'
import { ConfettiOffIcon } from '../../components/icon'
import { Label as LabelComponent } from '../../components/label'

const metaData: ComponentMeta<typeof LabelComponent> = {
    title: 'Components/Label',
    component: LabelComponent,
    argTypes: {
        size: {
            defaultValue: 'large',
        },
        color: {
            defaultValue: 'black',
        },
        children: {
            disabled: true,
        },
        iconAlign: {
            defaultValue: 'left',
        },
        varient: {
            defaultValue: 'default',
            options: ['default', 'filled'],
            control: {
                type: 'radio',
            },
        },
        maxWidth: {
            defaultValue: 0,
        },
        onDelete: {
            options: [undefined, 'deleted'],
            control: { type: 'select' },
        },
    },
}
export default metaData

export const Label = ({
    size,
    color,
    varient,
    onDelete,
    maxWidth,
    iconAlign,
}: Parameters<typeof LabelComponent>[0]) => {
    return (
        <Container>
            <LabelComponent
                icon={ConfettiOffIcon}
                iconAlign={iconAlign}
                size={size}
                color={color}
                varient={varient}
                onDelete={onDelete}
                maxWidth={maxWidth}
            >
                Label text
            </LabelComponent>
        </Container>
    )
}

const Container = styled(Box)`
    margin: 20px;
`
