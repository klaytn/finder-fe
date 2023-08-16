import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Box, Flex } from '../../components/box'
import { Text } from '../../components/text'
import { colors } from '../../styles/colors'

const EmptyComponent = () => null

const metaData: ComponentMeta<typeof EmptyComponent> = {
    title: 'Styles/Colors',
    component: EmptyComponent,
    argTypes: {},
}
export default metaData

const COMMON_PROPS = {
    width: 50,
    height: 50,
    round: 16,
    shadow: 'black.900.40%',
} as const

const colorList = Object.entries(colors).filter(([name]) => name !== 'white')

export const Colors = () => {
    return (
        <OuterContainer direction="column">
            <Container>
                <Text>white</Text>
                <Flex>
                    <ColorBox backgroundColor={colors.white} {...COMMON_PROPS} />
                </Flex>
            </Container>

            {colorList.map(([name, colorByNumber]) => (
                <Container key={name}>
                    <Text>{name}</Text>
                    <Flex direction="row">
                        {Object.entries(colorByNumber).map(([name, color]) => (
                            <Flex key={color}>
                                <Text>{name}</Text>
                                <ColorBox backgroundColor={color} {...COMMON_PROPS} />
                            </Flex>
                        ))}
                    </Flex>
                </Container>
            ))}
        </OuterContainer>
    )
}

const OuterContainer = styled(Flex)`
    margin-left: 20px;
`

const Container = styled(Box)`
    margin-top: 20px;
`

const ColorBox = styled(Box)`
    margin-right: 5px;
`
