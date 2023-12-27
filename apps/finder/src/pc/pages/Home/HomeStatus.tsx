import { ReactNode, Suspense, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import {
    ChevronBottomIcon,
    ChevronTopIcon,
    colors,
    CubeIcon,
    FaceSmileyIcon,
    FireIcon,
    Flex,
    percentageToHex,
    Text,
    typos,
} from '@klaytn/slush'

import { useBurntByGasFeeHistory } from '../../../api/home'
import HistoriesChart from '../../../components/commons/historiesChart'
import PortalItem from '../../../components/commons/portalItem'
import { ZIndexMap } from '../../../constants/zIndex'
import { useFeatures, useResources } from '../../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { calculateChainStatus, getFixedLengthWithCommasNumber, klay, withCommas } from '../../../functions/Functions'
import { group } from '../../../functions/group'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { finderKlayPriceState, IFinderKlayPrice } from '../../../states/price'
import { finderStatusState, IFinderStatus } from '../../../states/status'
import { finderSummaryState, IFinderSummary } from '../../../states/summary'
import { timerState } from '../../../states/timer'
import HomeStatusTitle from './HomeStatusTitle'
import HomeTransactionGraph from './HomeTransactionGraph'

type HomeStatusProps = {
    isOpen: boolean
    toggle(): void
}

const HomeStatus = ({ isOpen, toggle }: HomeStatusProps) => {
    const iconColor = useFinderThemeColor(colors.white)
    const { keyCurrency } = useResources()
    const { showBtcPrice, showBlockBurnt } = useFeatures()

    const marketCapTransformer = useCallback((value: string) => {
        const result = withCommas(value)
        const [integer, fraction] = result.split('.')

        return (
            <>
                ${integer}.<SmallFractionSpan>{fraction}</SmallFractionSpan>
            </>
        )
    }, [])
    const totalSupplyTransformer = useCallback(
        (value: string) => {
            const result = withCommas(value)
            const [integer, fraction = '0'] = result.split('.')

            return (
                <>
                    {integer}.<SmallFractionSpan>{fraction}</SmallFractionSpan>
                    <TotalBurntUnit>{keyCurrency.unit}</TotalBurntUnit>
                </>
            )
        },
        [keyCurrency],
    )

    return (
        <div>
            <Container>
                <InnerContainer>
                    <LeftContainer>
                        <HomeChainStatus />
                        <HomeBlockHeight />
                        {isOpen && <HomeBlockStatus />}
                    </LeftContainer>
                    <Divider />
                    <RightContainer>
                        <HomeKlayPrice />

                        {showBtcPrice && (
                            <div style={{ marginTop: 4 }}>
                                <HomeKlayPriceBtc />
                            </div>
                        )}

                        {showBlockBurnt && !isOpen && <TotalBurnt />}

                        {isOpen && (
                            <>
                                <div style={{ marginTop: 12 }}>
                                    <HomeKlayMarket
                                        title="Market Cap"
                                        keyProp="market_cap"
                                        transformer={marketCapTransformer}
                                    />
                                </div>
                                <div style={{ marginTop: 12 }}>
                                    <HomeKlayMarket
                                        title="Circulating Supply"
                                        keyProp="total_supply"
                                        transformer={totalSupplyTransformer}
                                    />
                                </div>

                                {showBlockBurnt && <TotalBurntDetails />}

                                {!showBlockBurnt && (
                                    <div style={{ marginTop: 40 }}>
                                        <HomePortalColumn />
                                    </div>
                                )}
                            </>
                        )}
                    </RightContainer>
                </InnerContainer>
                {showBlockBurnt && isOpen && <HomePortalRow />}
                <IconContainer>
                    <IconSpan onClick={toggle}>
                        {isOpen && <ChevronTopIcon color={iconColor} size={28} />}
                        {!isOpen && <ChevronBottomIcon color={iconColor} size={28} />}
                    </IconSpan>
                </IconContainer>
            </Container>
        </div>
    )
}

const Container = styled.div`
    width: 952px;
    margin: 0 auto;
    background-color: ${getThemeColor(colors.black[870])};
    border-radius: 28px;
`

const InnerContainer = styled.div`
    padding: 34px 40px 30px 40px;
    display: flex;
`

const LeftContainer = styled.div`
    width: 410px;
`

const RightContainer = styled.div`
    width: 382px;
`

const Divider = styled.div`
    width: 40px;
    border-right: 1px solid ${getThemeColor(colors.white)}${percentageToHex(10)};
    margin: 0 40px 0 auto;
`

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 32px;
`

const IconSpan = styled.span`
    margin-top: 1px;
    margin-left: 28px;
    cursor: pointer;
    z-index: ${ZIndexMap.footer};
`

const HomeChainStatus = () => {
    const { datetime: lastUpdated } = useRecoilValue<IFinderStatus>(finderStatusState)
    const timer = useRecoilValue<number>(timerState)
    const diff = timer - Date.parse(lastUpdated)
    const status = calculateChainStatus(diff)
    const color = useFinderThemeColor(status.color)

    return (
        <div className="flex_space_between">
            <div>
                <HomeStatusTitle icon={FaceSmileyIcon} title="Finder Status" />
            </div>
            <ChainStatusDetailContainer>
                <Flex justifyContent="end">
                    <Text typo={typos.suit['16.24_900']} color={color}>
                        {status.status} {status.icon}
                    </Text>
                </Flex>
            </ChainStatusDetailContainer>
        </div>
    )
}

const ChainStatusDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const HomeBlockHeight = () => {
    const { block_height } = useRecoilValue<IFinderStatus>(finderStatusState)

    return (
        <div className="flex_space_between" style={{ marginTop: 12 }}>
            <div>
                <HomeStatusTitle icon={CubeIcon} title="Block Height" />
            </div>
            <div>
                <Link to={`/block/${block_height}`} className="link">
                    <BlockHeightSpan>#{block_height}</BlockHeightSpan>
                </Link>
            </div>
        </div>
    )
}

const BlockHeightSpan = styled.span`
    ${typos.suit['16.24_900']};
    color: ${getThemeColor(colors.white)};
`

const HomeBlockStatus = () => {
    const { consensus_node, average_block_time, average_tx_per_block } =
        useRecoilValue<IFinderSummary>(finderSummaryState)

    return (
        <div style={{ marginTop: 26 }}>
            <div className="flex_space_between" style={{ marginTop: 40 }}>
                <HomeBlockButton title="Consensus Nodes" value={String(consensus_node)} />
                <HomeBlockButton title="Avg Block Time" subtitle="(24hrs)" value={average_block_time} />
                <HomeBlockButton title="Avg TX Per Block" subtitle="(24hrs)" value={withCommas(average_tx_per_block)} />
            </div>
            <div style={{ marginTop: 40 }}>
                <Suspense fallback={null}>
                    <HomeTransactionGraph />
                </Suspense>
            </div>
        </div>
    )
}

interface IHomeBlockButtonProps {
    title: string
    subtitle?: string
    value: string
}

const HomeBlockButton = (props: IHomeBlockButtonProps) => {
    return (
        <BlockCardContainer>
            <BlockCardInnerContainer>
                <BlockCardText>
                    <BlockCardTitle>
                        {props.title}
                        {props.subtitle && <BlockCardSubtitle>{props.subtitle}</BlockCardSubtitle>}
                    </BlockCardTitle>
                </BlockCardText>
                <BlockCardValue>{props.value}</BlockCardValue>
            </BlockCardInnerContainer>
        </BlockCardContainer>
    )
}

const BlockCardContainer = styled.div`
    width: 124px;
    height: 92px;
    background-color: ${getThemeColor(colors.black[850])};
    border-radius: 16px;
`

const BlockCardInnerContainer = styled.div`
    padding: 16px 24px 16px 24px;
`

const BlockCardText = styled.div`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.0075em;
`

const BlockCardTitle = styled.span`
    ${typos.suit['12.16_900']};
    color: ${getThemeColor(colors.blue[400])};
`

const BlockCardSubtitle = styled.span`
    ${typos.suit['12.16_900']};
    color: ${getThemeColor(colors.white)};
    margin-left: 4px;
`

const BlockCardValue = styled.div`
    margin-top: 8px;
    ${typos.suit['16.20_900']};
    color: ${getThemeColor(colors.white)};
`

const HomeKlayPrice = () => {
    const { usd_price, usd_price_changes } = useRecoilValue<IFinderKlayPrice>(finderKlayPriceState)
    const { keyCurrency } = useResources()

    return (
        <div className="flex_space_between">
            <div>
                <HomeStatusTitle icon={keyCurrency.icon} title={`${keyCurrency.unit} Price`} />
            </div>
            <KlayPriceContainer>
                <KlayPriceDollarSpan>${klay(usd_price)}</KlayPriceDollarSpan>
                &nbsp;&nbsp;
                <KlayPriceRatioSpan>
                    ({Number(usd_price_changes) > 0 && '+'}
                    {getFixedLengthWithCommasNumber(usd_price_changes, Number(usd_price_changes) > 0 ? 3 : 4)}%)
                </KlayPriceRatioSpan>
            </KlayPriceContainer>
        </div>
    )
}

const KlayPriceContainer = styled.div`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.0075em;
`

const KlayPriceDollarSpan = styled.span`
    font-weight: bold;
    color: ${getThemeColor(colors.white)};
`

const KlayPriceRatioSpan = styled.span`
    color: ${getThemeColor(colors.red[500])};
`

const TotalBurnt = () => {
    const {
        block_burnt: { accumulate_burnt },
    } = useRecoilValue<IFinderStatus>(finderStatusState)
    const { keyCurrency } = useResources()

    const { integer, fraction } = useMemo(() => {
        const result = klay(accumulate_burnt, undefined, 3)
        const [integer, fraction] = result.split('.')

        return {
            integer,
            fraction,
        }
    }, [accumulate_burnt])

    return (
        <TotalBurntContainer>
            <HomeStatusTitle icon={FireIcon} title="Total Burnt" />

            <TotalBurntNumberContainer>
                <KlayPriceDollarSpan>{integer}.</KlayPriceDollarSpan>
                <TotalBurntFraction>{fraction}</TotalBurntFraction>
                <TotalBurntUnit>{keyCurrency.unit}</TotalBurntUnit>
            </TotalBurntNumberContainer>
        </TotalBurntContainer>
    )
}

const TotalBurntDetails = () => {
    return (
        <TotalBurntDetailsContainer>
            <TotalBurnt />
            <TotalBurntDetailsDesc>
                Total Burnt means the accumulated sum of
                <br />
                gas fee and burning amount
            </TotalBurntDetailsDesc>
            <TotalBurntDetailsChartContainer>
                <Suspense fallback={null}>
                    <TotalBurntChart />
                </Suspense>
            </TotalBurntDetailsChartContainer>

            <BurntInfoRow title="by Gas Fee" keyProp="accumulate_burnt_fees" />
            <BurntInfoRow title="by Burning" keyProp="accumulate_burnt_klay" />
            <BurntInfoRow title="by KIP103" keyProp="kip103_burnt" />
        </TotalBurntDetailsContainer>
    )
}

const TotalBurntChart = () => {
    const { histories } = useBurntByGasFeeHistory()
    return <HistoriesChart data={histories} height={150} fontSize={12} />
}

const TotalBurntContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 12px;
`

const TotalBurntNumberContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
`

const TotalBurntFraction = styled(KlayPriceDollarSpan)`
    ${typos.suit['16.20_400']};
    color: ${getThemeColor(colors.black[400])};
`

const TotalBurntUnit = styled.span`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.black[500])};
    margin-left: 4px;
`

const TotalBurntDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`

const TotalBurntDetailsDesc = styled.div`
    color: ${getThemeColor(colors.black[500])};
    ${typos.suit['12.16_400']};
    margin-top: 8px;
    margin-bottom: 36px;
`

const TotalBurntDetailsChartContainer = styled.div`
    margin-bottom: 24px;
`

type BurntInfoRowProps = {
    title: string
    keyProp: keyof IFinderStatus['block_burnt']
}
const BurntInfoRow = ({ title, keyProp }: BurntInfoRowProps) => {
    const { block_burnt } = useRecoilValue<IFinderStatus>(finderStatusState)
    const { keyCurrency } = useResources()

    const value = klay(block_burnt[keyProp])
    const [integer, fraction] = value.split('.')

    return (
        <BurntInfoRowContainer>
            <KlayMarketTitleSpan>{title}</KlayMarketTitleSpan>
            <div className="flex_right">
                <KlayMarketValueSpan>{integer}.</KlayMarketValueSpan>
                <SmallFractionSpan>{fraction}</SmallFractionSpan>
                <TotalBurntUnit>{keyCurrency.unit}</TotalBurntUnit>
            </div>
        </BurntInfoRowContainer>
    )
}

const SmallFractionSpan = styled.span`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.black[400])};
`

const BurntInfoRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 12px;
`

const HomeKlayPriceBtc = () => {
    const { btc_price } = useRecoilValue<IFinderKlayPrice>(finderKlayPriceState)
    return (
        <div className="flex_right">
            <KlayPriceBtcSpan>@ {klay(btc_price)} BTC</KlayPriceBtcSpan>
        </div>
    )
}

const KlayPriceBtcSpan = styled.span`
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: ${getThemeColor(colors.black[400])};
`

interface IHomeKlayMarketProps {
    title: string
    keyProp: keyof IFinderKlayPrice
    transformer: (value: string) => ReactNode
}

const HomeKlayMarket = ({ title, keyProp, transformer }: IHomeKlayMarketProps) => {
    const finderKlayPrice = useRecoilValue<IFinderKlayPrice>(finderKlayPriceState)

    return (
        <div>
            <div className="flex_space_between">
                <div>
                    <KlayMarketTitleSpan>{title}</KlayMarketTitleSpan>
                </div>
                <div>
                    <KlayMarketValueSpan>{transformer(finderKlayPrice[keyProp])}</KlayMarketValueSpan>
                </div>
            </div>
        </div>
    )
}

const KlayMarketTitleSpan = styled.span`
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.0075em;
    color: ${getThemeColor(colors.blue[400])};
`

const KlayMarketValueSpan = styled.span`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)};
`

const HomePortalRow = () => {
    const { portals } = useResources()
    const groupSize = Math.ceil(portals.length / 2)
    const portalGroups = group(portals, groupSize)

    return (
        <PortalContainer>
            {portalGroups.map((portalsGroup, index) => (
                <PortalRow key={index}>
                    {portalsGroup.map((portal) => (
                        <PortalItem key={portal.link} {...portal} />
                    ))}
                </PortalRow>
            ))}
        </PortalContainer>
    )
}

const PortalContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 26px 40px 30px 40px;
`

const PortalRow = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
    gap: 12px;
`

const HomePortalColumn = () => {
    const { portals } = useResources()
    const portalGroups = group(portals, 2)

    return (
        <PortalColumnContainer>
            <PortalTitle>Portals</PortalTitle>

            {portalGroups.map(([portal1, portal2]) => (
                <PortalRow key={`${portal1.name}-${portal2?.name}`}>
                    <PortalItem {...portal1} />
                    {portal2 && <PortalItem {...portal2} />}
                </PortalRow>
            ))}
        </PortalColumnContainer>
    )
}

const PortalColumnContainer = styled(Flex).attrs({
    round: 16,
})`
    background-color: ${getThemeColor(colors.black[850])};
    padding: 16px 16px 0px 20px;
`

const PortalTitle = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.20_900'],
        color: colors.blue[400],
    }),
)`
    margin-bottom: 24px;
`

export default HomeStatus
