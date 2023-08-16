import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { Flex, Text, typos } from '@klaytn/slush'

import { calculateChainStatus } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { finderStatusState, IFinderStatus } from '../../../states/status'
import { timerState } from '../../../states/timer'

const ChainStatus = () => {
    const { datetime: lastUpdated } = useRecoilValue<IFinderStatus>(finderStatusState)
    const timer = useRecoilValue<number>(timerState)
    const diff = timer - Date.parse(lastUpdated)
    const { color, icon: statusIcon, status } = calculateChainStatus(diff)
    const statusColor = useFinderThemeColor(color)

    return (
        <StatusRow direction="row">
            <Text typo={typos.suit['12.16_900']} color={statusColor}>
                {status}
            </Text>
            <StatusIconText typo={typos.suit['12.16_400']}>{statusIcon}</StatusIconText>
        </StatusRow>
    )
}

const StatusRow = styled(Flex)`
    align-items: center;
`

const StatusIconText = styled(Text)`
    margin: 0px 2px;
`

export default ChainStatus
