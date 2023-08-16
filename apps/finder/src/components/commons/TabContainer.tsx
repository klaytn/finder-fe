import { FC } from 'react'
import styled from 'styled-components'

import { colors, Flex, neumorphism, TabInfo, Tabs, Theme } from '@klaytn/slush'

import { Layout } from '../../constants/layout'
import { getThemeColor } from '../../functions/colorMap'
import { useTabQuery } from '../../hooks/useTabQuery'
import TabItemContainer from '../../mobile/components/common/tabItemContainer'

type TabContainerProps = {
    tabs: TabInfo[]
    query?: string
    reversePadding?: number
    tabEnabledInfos?: Record<string, boolean>
}

const TabContainer: FC<TabContainerProps> = ({ tabs, children, reversePadding, tabEnabledInfos = {} }) => {
    const { selectedTab, handleTabChange } = useTabQuery(tabs, { tabEnabledInfos })

    return (
        <Container>
            <InnerContainer>
                <Flex>
                    <Tabs
                        tabs={tabs}
                        selected={selectedTab}
                        onChange={handleTabChange}
                        reversePadding={reversePadding}
                    />
                    <TabItemContainer selectedTab={selectedTab}>{children}</TabItemContainer>
                </Flex>
            </InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 40px;
    background: ${getThemeColor(colors.black[850])};
    border-radius: 30px;
    ${({ theme }) => (theme.slush === Theme.dark ? neumorphism.black1 : neumorphism.white1)};
    width: ${Layout.innerWidth + 80}px;
    transform: translateX(-40px);
`

const InnerContainer = styled.div`
    padding: 32px 40px;
    width: ${Layout.innerWidth}px;
`

export default TabContainer
