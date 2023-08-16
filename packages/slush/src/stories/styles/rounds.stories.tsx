import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Box, Flex } from '../../components/box'
import { Text } from '../../components/text'
import { colors } from '../../styles/colors'
import { Round, rounds } from '../../styles/rounds'

const EmptyComponent = () => null

const metaData: ComponentMeta<typeof EmptyComponent> = {
    title: 'Styles/Rounds',
    component: EmptyComponent,
    argTypes: {},
}
export default metaData

const COMMON_PROPS = {
    width: 50,
    height: 50,
    backgroundColor: colors.black[500],
    shadow: 'black.900.40%',
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const roundsList: Round[] = [undefined, ...Object.keys(rounds)] as any

export const Rounds = () => {
    return (
        <OuterContainer direction="row">
            {roundsList.map((round) => (
                <InnerContainer direction="column" key={round}>
                    <Text>{round || 'none'}</Text>
                    <Box round={round} {...COMMON_PROPS} />
                </InnerContainer>
            ))}
        </OuterContainer>
    )
}

const OuterContainer = styled(Flex)`
    margin: 20px;
`

const InnerContainer = styled(Flex)`
    margin-right: 5px;
`
