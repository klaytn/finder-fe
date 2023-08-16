import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Box, Flex } from '../../components/box'
import { Text } from '../../components/text'
import { typos } from '../../styles/typos'

const EmptyComponent = () => null

const metaData: ComponentMeta<typeof EmptyComponent> = {
    title: 'Styles/Typos',
    component: EmptyComponent,
    argTypes: {},
}
export default metaData

const typoList = Object.entries(typos)

export const Typos = () => {
    return (
        <OuterContainer direction="column">
            {typoList.map(([name, typoMap]) => (
                <Container key={name} shadow="black.900.40%" round={16}>
                    <Text typo={typos.suit['40.56_900']}>Font: {name}</Text>
                    <Flex direction="column">
                        {Object.entries(typoMap).map(([name, typo]) => (
                            <Flex key={name}>
                                <Text typo={typo}>{name} - ABCDEFGHIJKLMOPQRSTUVWXYZ Hello and welcome.</Text>
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
    padding: 16px;
    width: 1400px;
`
