import BigNumber from 'bignumber.js'
import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useBlock } from '../../../../api/block'
import { formatDatetime } from '../../../../functions/Functions'
import Hash from '../../common/hash'
import { OverviewDescText, OverviewRow, OverviewValueText } from '../../common/overviewRows'
import TimesAgo from '../../common/timesAgo'

type TimeAndHashProps = {
    id: string
}

const TimeAndHash = ({ id }: TimeAndHashProps) => {
    const { datetime, hash, parentHash } = useBlock(id)

    const parentId = new BigNumber(id).minus(new BigNumber('1')).toString()

    return (
        <Flex>
            <OverviewRow title="Time" marginBottom={2}>
                <OverviewValueText>
                    <TimesAgo datetime={datetime} />
                </OverviewValueText>
            </OverviewRow>
            <OverviewRow marginBottom={16}>
                <OverviewDescText>({formatDatetime(datetime)})</OverviewDescText>
            </OverviewRow>

            <OverviewRow title="Hash" marginBottom={8} />
            <HashRow marginBottom={16}>
                <Hash hash={hash} copy currentBlock />
            </HashRow>

            <OverviewRow title="Parent Hash" marginBottom={8} />
            <HashRow marginBottom={24}>
                <Hash hash={parentHash} link={`/block/${parentId}`} copy />
            </HashRow>
        </Flex>
    )
}

const HashRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})<{ marginBottom: number }>`
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
`

export default TimeAndHash
