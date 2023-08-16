import { Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { ArrowcomboLeftrightIcon, colors, Flex, Text, typos } from '@klaytn/slush'

import { useBurntByGasFeeHistory, useTransactionHistory } from '../../../api/home'
import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import HistoriesChart from '../../../components/commons/historiesChart'
import PortalItem from '../../../components/commons/portalItem'
import { useFeatures, useResources } from '../../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { klay, toKMG, withCommas } from '../../../functions/Functions'
import { group } from '../../../functions/group'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { finderKlayPriceState, IFinderKlayPrice } from '../../../states/price'
import { finderStatusState } from '../../../states/status'
import { finderSummaryState, IFinderSummary } from '../../../states/summary'
import HomeInfoBox from './homeInfoBox'
import HomeInfoRow from './homeInfoRow'

const AdditionalInfos = () => {
    const { showBlockBurnt = false } = useFeatures()
    return (
        <Container direction="column">
            {showBlockBurnt && (
                <Suspense fallback={null}>
                    <BurntInfo />
                </Suspense>
            )}
            <Summary />
            <Suspense fallback={null}>
                <TxHistory />
            </Suspense>
            <Price />
            <Portals />
        </Container>
    )
}

const Container = styled(Flex)``

const BurntInfo = () => {
    const { keyCurrency } = useResources()
    const {
        block_burnt: { accumulate_burnt_fees, accumulate_burnt_klay },
    } = useRecoilValue(finderStatusState)
    const { histories } = useBurntByGasFeeHistory()

    return (
        <>
            <BurntChartDescription>
                Total Burnt means the accumulated sum of
                <br />
                gas fee and burning amount
            </BurntChartDescription>
            <BurntChartContainer>
                <HistoriesChart data={histories} height={168} fontSize={10} />
            </BurntChartContainer>

            <HomeInfoRow
                title="by Gas Fee"
                text={
                    <>
                        <EllipsisNumber value={klay(accumulate_burnt_fees, undefined, 3)} noEllipsis />
                        <UnitText>{keyCurrency.unit}</UnitText>
                    </>
                }
            />
            <HomeInfoRow
                title="by Burning"
                text={
                    <>
                        <EllipsisNumber value={klay(accumulate_burnt_klay, undefined, 3)} noEllipsis />
                        <UnitText>{keyCurrency.unit}</UnitText>
                    </>
                }
            />
        </>
    )
}

const BurntChartDescription = styled.div`
    color: ${getThemeColor(colors.black[500])};
    ${typos.suit['12.16_400']};
`

const BurntChartContainer = styled.div`
    margin-top: 28px;
    margin-bottom: 20px;
`

const UnitText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['10.14_400'],
        color: colors.black[500],
    }),
)`
    margin-left: 4px;
`

const Summary = () => {
    const finderSummary = useRecoilValue<IFinderSummary>(finderSummaryState)

    return (
        <SummaryContainer>
            <HomeInfoBox title="Consensus Nodes" contents={finderSummary.consensus_node} />
            <HomeInfoBox title="Avg Block Time" description="(24hrs)" contents={finderSummary.average_block_time} />
            <HomeInfoBox title="Avg TX Per Block" description="(24hrs)" contents={finderSummary.average_tx_per_block} />
        </SummaryContainer>
    )
}

const SummaryContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-top: 40px;
`

const TxHistory = () => {
    const { histories, total } = useTransactionHistory()
    const iconColor = useFinderThemeColor(colors.blue[400])

    return (
        <>
            <TxHistoryTitleRow>
                <TxHistoryTitleContainer>
                    <ArrowcomboLeftrightIcon size={16} color={iconColor} />
                    <TxHistoryTitleText>Transaction History</TxHistoryTitleText>
                </TxHistoryTitleContainer>
                <TxHistoryValueText>Total {toKMG(parseFloat(total))}</TxHistoryValueText>
            </TxHistoryTitleRow>

            <TxHistoryGraphRow>
                <HistoriesChart data={histories} height={168} fontSize={10} />
            </TxHistoryGraphRow>
        </>
    )
}

const TxHistoryTitleRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    margin-top: 48px;
    align-items: center;
`

const TxHistoryTitleContainer = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const TxHistoryTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.blue[400],
    }),
)`
    margin-left: 4px;
`

const TxHistoryValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['10.14_400'],
        color: colors.black[400],
    }),
)``

const TxHistoryGraphRow = styled(Flex)`
    margin-top: 28px;
    margin-bottom: 20px;
`

const Price = () => {
    const finderKlayPrice = useRecoilValue<IFinderKlayPrice>(finderKlayPriceState)
    const { keyCurrency } = useResources()

    return (
        <>
            <HomeInfoRow
                title="Market Cap"
                text={
                    <>
                        $
                        <EllipsisNumber value={withCommas(finderKlayPrice.market_cap)} noEllipsis />
                    </>
                }
            />
            <HomeInfoRow
                title="Circulating Supply"
                text={
                    <>
                        <EllipsisNumber value={withCommas(finderKlayPrice.total_supply)} noEllipsis />{' '}
                        {keyCurrency.unit}
                    </>
                }
                marginBottom={0}
            />
        </>
    )
}

const Portals = () => {
    const { portals } = useResources()
    const portalGroups = group(portals, 2)

    return (
        <>
            <PortalTitleText>Portals</PortalTitleText>

            {portalGroups.map(([portal1, portal2]) => (
                <PortalRow key={`${portal1.name}-${portal2?.name}`}>
                    <PortalItem {...portal1} />
                    {portal2 ? <PortalItem {...portal2} /> : <PortalDummy />}
                </PortalRow>
            ))}
        </>
    )
}

const PortalDummy = styled.div`
    display: flex;
    flex: 1;
    direction: row;
    justify-content: space-between;
    border-radius: 16px;
    align-items: center;
    padding: 8px;
    margin-bottom: 12px;
    overflow: hidden;
    white-space: nowrap;
    flex-basis: auto;
    flex: 1;
`

const PortalTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.blue[400],
    }),
)`
    margin-top: 48px;
    margin-bottom: 12px;
`

const PortalRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    align-items: center;
    gap: 12px;
`

export default AdditionalInfos
