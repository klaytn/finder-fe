import styled from 'styled-components'

import { IndicatorState } from '../hooks/useScrollIndicator'
import { withAlpha } from '../styles/colors'

type ScrollIndicatorProps = {
    width: number
    height: number
    state: IndicatorState
}

export const ScrollIndicator = ({ width, height, state }: ScrollIndicatorProps) => {
    return (
        <IndicatorContainer style={{ width }}>
            <StartIndicator show={state !== 'none' && state !== 'start'} height={height} />
            <EndIndicator show={state !== 'none' && state !== 'end'} height={height} />
        </IndicatorContainer>
    )
}

const IndicatorContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    pointer-events: none;
    align-self: stretch;
    justify-content: space-between;
`

const StartIndicator = styled.div<{ show: boolean; height: number }>`
    display: flex;
    width: 18px;
    height: ${({ height }) => height}px;
    background: linear-gradient(
        270deg,
        ${({ theme }) => withAlpha(theme.tabs.indicator, 0)} 0%,
        ${({ theme }) => withAlpha(theme.tabs.indicator, 15)} 46.35%,
        ${({ theme }) => withAlpha(theme.tabs.indicator, 50)} 100%
    );
    opacity: ${({ show }) => (show ? 0.5 : 0)};
    transition: opacity 150ms ease-out;
`

const EndIndicator = styled(StartIndicator)`
    background: linear-gradient(
        90deg,
        ${({ theme }) => withAlpha(theme.tabs.indicator, 0)} 0%,
        ${({ theme }) => withAlpha(theme.tabs.indicator, 15)} 46.35%,
        ${({ theme }) => withAlpha(theme.tabs.indicator, 50)} 100%
    );
`
