import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useToken } from '../../../../api/token'
import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { klay, withCommas } from '../../../../functions/Functions'
import { OverviewDescText, OverviewRow, OverviewValueText } from '../../common/overviewRows'

type AmountInfoProps = {
    address: string
}

const AmountInfo = ({ address }: AmountInfoProps) => {
    const {
        info: { symbol },
        totalSupply,
        burnAmount,
        totalTransfers,
        totalBurns,
    } = useToken(address)

    return (
        <Container>
            <OverviewRow title="Total supply" marginBottom={2}>
                <OverviewValueText>
                    <EllipsisNumber value={klay(totalSupply)} noEllipsis />
                </OverviewValueText>
            </OverviewRow>
            <OverviewRow marginBottom={16}>
                <OverviewDescText>{symbol}</OverviewDescText>
            </OverviewRow>

            <OverviewRow title="Burnt amount" marginBottom={2}>
                <OverviewValueText>
                    <EllipsisNumber value={klay(burnAmount)} noEllipsis />
                </OverviewValueText>
            </OverviewRow>
            <OverviewRow marginBottom={16}>
                <OverviewDescText>{symbol}</OverviewDescText>
            </OverviewRow>

            <OverviewRow title="Total transfer" marginBottom={16}>
                <OverviewValueText>{withCommas(totalTransfers)}</OverviewValueText>
            </OverviewRow>

            <OverviewRow title="Burnt transfer">
                <OverviewValueText>{withCommas(totalBurns)}</OverviewValueText>
            </OverviewRow>
        </Container>
    )
}

const Container = styled(Flex)`
    margin: 24px 0px;
`

export default AmountInfo
