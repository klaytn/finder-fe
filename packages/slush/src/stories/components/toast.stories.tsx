import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { CircleiconQuestionOffIcon } from '../../components/icon'
import { Text } from '../../components/text'
import { Toast as ToastComponent } from '../../components/toast'
import { Color } from '../../styles/colors'
import { typos } from '../../styles/typos'

const metaData: ComponentMeta<typeof ToastComponent> = {
    title: 'Components/Toast',
    component: ToastComponent,
    argTypes: {
        title: {
            defaultValue: 'title',
            type: 'string',
        },
        color: {
            defaultValue: 'green',
        },
        message: {
            defaultValue: 'message',
            type: 'string',
        },
        show: {
            defaultValue: true,
            type: 'boolean',
        },
        duration: {
            defaultValue: 2000,
            type: 'number',
        },
        width: {
            type: 'number',
        },
    },
}
export default metaData

const ExtraText = ({ color }: { color: Color }) => {
    return (
        <ExtraTextContent color={color} typo={typos.suit['12.16_400']}>
            <IconBox>
                <CircleiconQuestionOffIcon color={color} size={16} />
            </IconBox>
            Need Help?
        </ExtraTextContent>
    )
}

const UndoButton = ({ color }: { color: Color }) => {
    return (
        <button
            style={{
                color,
                outline: 'none',
                border: 'none',
                background: 'transparent',
            }}
        >
            <Text typo={typos.suit['12.16_400']} color={color}>
                Undo
            </Text>
        </button>
    )
}

const IconBox = styled.span`
    margin-right: 4px;
`

const ExtraTextContent = styled(Text)`
    display: inline-flex;
`

export const Toast = ({ title, color, message, show, width, duration }: Parameters<typeof ToastComponent>[0]) => {
    return (
        <ToastComponent
            message={message}
            title={title}
            show={show}
            width={width}
            duration={duration}
            color={color}
            onClose={() => {
                //
            }}
            extraText={ExtraText}
            undo={UndoButton}
        />
    )
}
