import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Flex } from '../../components/box'
import { Button } from '../../components/button'
import { Tooltip as TooltipComponent } from '../../components/tooltip'

const metaData: ComponentMeta<typeof TooltipComponent> = {
    title: 'Components/Tooltip',
    component: TooltipComponent,
    argTypes: {
        message: {
            defaultValue: 'message',
            type: 'string',
        },
    },
}
export default metaData

export const Tooltip = (props: Parameters<typeof TooltipComponent>[0]) => {
    return (
        <Container>
            <TooltipComponent {...props}>
                <HoverButton>hover me! (Bottom setting lettering)</HoverButton>
            </TooltipComponent>

            <TooltipComponent
                {...props}
                message={
                    <p>
                        hello <br />
                        world
                    </p>
                }
            >
                <HoverButton>hover me! (JSX Example)</HoverButton>
            </TooltipComponent>
        </Container>
    )
}

const Container = styled(Flex).attrs({})`
    width: 200px;
    padding: 50px;
    gap: 10px;
`

const HoverButton = styled(Button)`
    width: 200px;
`
