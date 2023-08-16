import styled from 'styled-components'

import { Flex, If } from '@klaytn/slush'

import { useBlock } from '../../../../api/block'
import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { useFeatures, useResources } from '../../../../context/configProvider'
import { klay, withCommas } from '../../../../functions/Functions'
import { OverviewDescText, OverviewRow, OverviewValueText } from '../../common/overviewRows'

type CalcsProps = {
    id: string
}

const Calcs = ({ id }: CalcsProps) => {
    const { totalTransactionCount, totalRewards, mintedRewards, totalFee, burntFee, size, baseFeePerGas, burntFees } =
        useBlock(id)

    const hasBurntFees = burntFees !== undefined

    const { keyCurrency } = useResources()
    const { blockRewards = false, baseFee = false } = useFeatures()

    return (
        <Container>
            <OverviewRow title="Total TXs" marginBottom={16}>
                <OverviewValueText>{totalTransactionCount}</OverviewValueText>
            </OverviewRow>

            <If condition={baseFee}>
                <OverviewRow title="Base Fee" marginBottom={16}>
                    <RewardsContainer>
                        <OverviewValueText marginRight={4}>
                            <EllipsisNumber value={klay(baseFeePerGas)} noEllipsis />
                        </OverviewValueText>
                        <OverviewDescText>{keyCurrency.gasUnit}</OverviewDescText>
                    </RewardsContainer>
                </OverviewRow>
            </If>

            <If condition={blockRewards}>
                <OverviewRow title="Block Rewards" marginBottom={2}>
                    <RewardsContainer>
                        <OverviewValueText marginRight={4}>
                            <EllipsisNumber value={klay(totalRewards)} noEllipsis />
                        </OverviewValueText>
                        <OverviewDescText>{keyCurrency.gasUnit}</OverviewDescText>
                    </RewardsContainer>
                </OverviewRow>
                <OverviewRow>
                    <OverviewDescText>
                        (Minted {klay(mintedRewards)} + Total Fee {klay(totalFee)})
                    </OverviewDescText>
                </OverviewRow>
                <OverviewRow marginBottom={16}>
                    <OverviewDescText>- (Burnt Fee {klay(burntFee)})</OverviewDescText>
                </OverviewRow>
            </If>

            <If condition={baseFee && hasBurntFees}>
                <OverviewRow title="Burnt Fee" marginBottom={16}>
                    <RewardsContainer>
                        <OverviewValueText marginRight={4}>{klay(burntFees)}</OverviewValueText>
                        <OverviewDescText>{keyCurrency.gasUnit}</OverviewDescText>
                    </RewardsContainer>
                </OverviewRow>
            </If>

            <OverviewRow title="Block Size" marginBottom={24}>
                <OverviewValueText>{withCommas(size)} bytes</OverviewValueText>
            </OverviewRow>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 24px;
`

const RewardsContainer = styled(Flex).attrs({
    direction: 'row',
})``

export default Calcs
