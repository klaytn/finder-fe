import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Box, Flex } from '../../components/box'
import { Text } from '../../components/text'
import { colors } from '../../styles/colors'
import { Shadow, shadows } from '../../styles/shadows'

const EmptyComponent = () => null

const metaData: ComponentMeta<typeof EmptyComponent> = {
    title: 'Styles/Shadows',
    component: EmptyComponent,
    argTypes: {},
}
export default metaData

const COMMON_PROPS = {
    width: 50,
    height: 50,
    backgroundColor: colors.black[500],
    round: 16,
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shadowList: Shadow[] = [undefined, ...Object.keys(shadows)] as any

export const Shadows = () => {
    return (
        <OuterContainer direction="column">
            {shadowList.map((shadow) => (
                <InnerContainer direction="column" key={shadow}>
                    <Text>{shadow || 'none'}</Text>
                    <Box shadow={shadow} {...COMMON_PROPS} />
                </InnerContainer>
            ))}
        </OuterContainer>
    )
}

const OuterContainer = styled(Flex)`
    margin-left: 20px;
`

const InnerContainer = styled(Flex)`
    margin-top: 20px;
`
