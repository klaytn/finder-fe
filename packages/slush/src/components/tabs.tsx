import styled from 'styled-components'

import { Tooltip } from '..'
import { useScrollIndicator } from '../hooks/useScrollIndicator'
import { withAlpha } from '../styles/colors'
import { typos } from '../styles/typos'
import { gap } from '../utils/workaround'
import { Flex } from './box'
import { Divider } from './divider'
import { If } from './logic/if'
import { ScrollIndicator } from './scrollIndicator'

export type TabInfo = {
    name: string
    value: string
    disabled?: boolean
    description?: string
}

type TabsProps = {
    tabs: TabInfo[]
    selected: string
    onChange?: (value: string) => void
    size?: 'small' | 'large'
    reversePadding?: number
    additional?: JSX.Element
    center?: boolean
}

const STYLE_MAP = {
    large: {
        alignItems: 'start',
        height: 45,
        marginBottom: 40,
        typo: typos.suit['16.20_900'],
    },
    small: {
        alignItems: 'center',
        height: 40,
        marginBottom: 28,
        typo: typos.suit['12.16_900'],
    },
} as const

export const Tabs = ({ tabs, selected, reversePadding, onChange, size = 'large', additional, center }: TabsProps) => {
    const { handleScroll, indicatorWidth, scrollAreaRef, indicatorState } = useScrollIndicator<HTMLDivElement>()

    return (
        <>
            <ScrollIndicator width={indicatorWidth} height={STYLE_MAP[size].height} state={indicatorState} />
            <Container ref={scrollAreaRef} direction="column" onScroll={handleScroll}>
                <TabsContainer center={center}>
                    {tabs.map((tab) => (
                        <TabContainer key={tab.value} direction="column">
                            <TabButton
                                disabled={!!tab.disabled}
                                selected={selected === tab.value}
                                size={size}
                                onClick={() => {
                                    if (selected === tab.value) {
                                        return
                                    }
                                    onChange?.(tab.value)
                                }}
                            >
                                <Tooltip message={tab.description}>{tab.name}</Tooltip>
                            </TabButton>
                        </TabContainer>
                    ))}
                    <If condition={!!additional}>
                        <AdditionalContainer direction="row">{additional}</AdditionalContainer>
                    </If>
                </TabsContainer>
            </Container>
            <DividerContainer reversePadding={reversePadding} size={size} />
        </>
    )
}

const Container = styled(Flex)`
    overflow: auto;
    white-space: nowrap;
    ::-webkit-scrollbar {
        display: none;
    }
`

type TabsContainerProps = {
    center?: boolean
}
const TabsContainer = styled(Flex).attrs<TabsContainerProps>((props) => ({
    direction: 'row',
    justifyContent: props.center ? 'center' : 'flex-start',
}))<TabsContainerProps>`
    align-items: center;
    ${gap(25)};
`

const TabContainer = styled(Flex)``

const AdditionalContainer = styled(Flex)`
    flex-grow: 1;
    justify-content: right;
`

const TabButton = styled.button<{ size: 'small' | 'large'; selected: boolean; disabled: boolean }>`
    cursor: ${({ selected, disabled }) => (selected || disabled ? 'normal' : 'pointer')};
    display: flex;
    height: ${({ size }) => STYLE_MAP[size].height}px;
    align-items: ${({ size }) => STYLE_MAP[size].alignItems};
    border: 0;
    margin: 0;
    padding: 0;
    background: none;
    ${({ size }) => STYLE_MAP[size].typo};
    border-bottom: ${({ selected, theme }) =>
        `${selected ? 4 : 0}px solid ${withAlpha(theme.tabs.bottomBar, selected ? 100 : 0)}`};
    padding-bottom: ${({ selected }) => (selected ? 0 : 4)}px;
    color: ${({ selected, disabled, theme }) =>
        disabled ? theme.tabs.disabled : selected ? theme.tabs.selected : theme.tabs.normal};
    transition: color 0.3s ease, border 0.3s ease, padding 0.3s ease;
`

const DividerContainer = styled(Divider)<{ size: 'small' | 'large' }>`
    margin-bottom: ${({ size }) => STYLE_MAP[size].marginBottom}px;
`
