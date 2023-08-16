import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Flex } from '../../components/box'
import { If } from '../../components/logic/if'
import { TabInfo, Tabs as TabsComponent } from '../../components/tabs'
import { Text } from '../../components/text'
import { useTabs } from '../../hooks/useTabs'
import { colors } from '../../styles/colors'

const metaData: ComponentMeta<typeof TabsComponent> = {
    title: 'Components/Tabs',
    component: TabsComponent,
    argTypes: {
        size: {
            defaultValue: 'large',
        },
    },
}
export default metaData

const tabs: TabInfo[] = [
    { name: 'Overview', value: 'overview' },
    { name: 'Transitions', value: 'transitions' },
    { name: 'Disabled', value: 'disabled', disabled: true, description: 'There is no data' },
]

export const Tabs = ({ size }: { size: 'small' | 'large' }) => {
    const { selectedTab, onTabChange } = useTabs(tabs)

    return (
        <Container backgroundColor={colors.black[850]} round={16}>
            <TabsComponent
                size={size}
                tabs={tabs}
                selected={selectedTab}
                onChange={onTabChange}
                reversePadding={16}
                additional={
                    <If condition={selectedTab === 'overview'}>
                        <Text color={colors.white}>Overview additional</Text>
                    </If>
                }
            />
            <If condition={selectedTab === 'overview'}>
                <Text color={colors.white}>Overview page</Text>
            </If>
            <If condition={selectedTab === 'transitions'}>
                <Text color={colors.white}>Transitions page</Text>
            </If>
        </Container>
    )
}

const Container = styled(Flex)`
    width: 500px;
    margin: 20px;
    padding: 16px;
`
