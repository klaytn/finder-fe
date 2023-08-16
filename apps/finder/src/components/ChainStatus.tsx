import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { colors } from '@klaytn/slush'

import { extractThemeProp, getThemeColor } from '../functions/colorMap'
import { calculateChainStatus } from '../functions/Functions'
import { finderStatusState, IFinderStatus } from '../states/status'
import { timerState } from '../states/timer'

const ChainStatus = () => {
    const timer = useRecoilValue<number>(timerState)
    const finderStatus = useRecoilValue<IFinderStatus>(finderStatusState)
    const diff = timer - Date.parse(finderStatus.datetime)
    const status = calculateChainStatus(diff)

    return (
        <>
            <DescSpan>Chain status is</DescSpan>
            <StatusSpan color={status.color}>
                {status.status} {status.icon}
            </StatusSpan>
        </>
    )
}

const DescSpan = styled.span`
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: ${getThemeColor(colors.white)};
    margin-right: 2px;
`

const StatusSpan = styled.span<{ color: string }>`
    color: ${extractThemeProp('color')};
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
    margin-left: 2px;
`

export default ChainStatus
