import { Children, ReactNode, Suspense } from 'react'
import styled from 'styled-components'

import { Flex, ProgressCircle } from '@klaytn/slush'

type TabItemContainerProps = {
    selectedTab: string
    children: ReactNode
}

const TabItemContainer = ({ children }: TabItemContainerProps) => {
    return (
        <Container>
            {Children.map(children, (child, index) => (
                <Suspense key={index} fallback={<ProgressCircle show />}>
                    {child}
                </Suspense>
            ))}
        </Container>
    )
}

const Container = styled(Flex)``

export default TabItemContainer
