import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Flex } from '../../components/box'
import { Skeleton as SkeletonComponent } from '../../components/progress/skeleton'

const metaData: ComponentMeta<typeof SkeletonComponent> = {
    title: 'Components/Progress',
    component: SkeletonComponent,
    argTypes: {
        show: {
            defaultValue: true,
            type: 'boolean',
        },
        children: {
            defaultValue: 'loading done',
            type: 'string',
        },
    },
}
export default metaData

export const Skeleton = ({ show, children }: Parameters<typeof SkeletonComponent>[0]) => {
    return (
        <Container>
            <SkeletonComponent show={show}>{children}</SkeletonComponent>
        </Container>
    )
}

const Container = styled(Flex)`
    width: 300px;
    height: 15px;
`
