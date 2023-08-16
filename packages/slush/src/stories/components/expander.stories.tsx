import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Box } from '../../components/box'
import {
    Expander as ExpanderComponent,
    ExpanderContents,
    ExpanderDescription,
    ExpanderHeader,
} from '../../components/expander'
import { Text } from '../../components/text'
import { colors } from '../../styles/colors'
import { typos } from '../../styles/typos'

const metaData: ComponentMeta<typeof ExpanderComponent> = {
    title: 'Components/Expander',
    component: ExpanderComponent,
}
export default metaData

export const Expander = () => {
    return (
        <Container>
            <ExpanderComponent>
                <ExpanderHeader>
                    <Text typo={typos.suit['16.20_400']} color={colors.white}>
                        This is Header
                    </Text>
                </ExpanderHeader>

                <ExpanderDescription>
                    <Text typo={typos.suit['12.16_400']} color={colors.white}>
                        This is Description (Optional)
                    </Text>
                </ExpanderDescription>

                <ExpanderContents>
                    <Text typo={typos.suit['16.20_400']} color={colors.white}>
                        This is Contents
                    </Text>
                </ExpanderContents>
            </ExpanderComponent>
        </Container>
    )
}

const Container = styled(Box)`
    width: 400px;
    margin: 20px;
`
