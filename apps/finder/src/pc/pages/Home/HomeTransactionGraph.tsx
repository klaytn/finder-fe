import styled from 'styled-components'

import { ArrowcomboLeftrightIcon, colors } from '@klaytn/slush'

import { useTransactionHistory } from '../../../api/home'
import HistoriesChart from '../../../components/commons/historiesChart'
import { getThemeColor } from '../../../functions/colorMap'
import { toKMG } from '../../../functions/Functions'
import HomeStatusTitle from './HomeStatusTitle'

const HomeTransactionGraph = () => {
    const txHistory = useTransactionHistory()
    return (
        <>
            <div>
                <HomeStatusTitle icon={ArrowcomboLeftrightIcon} title="Transaction History" />
            </div>
            <Subtitle>
                <TotalSpan>Total</TotalSpan>
                &nbsp;
                <TotalSpan>{toKMG(Number(txHistory.total))}</TotalSpan>
            </Subtitle>
            <ChartContainer>
                <HistoriesChart data={txHistory.histories} height={150} fontSize={12} />
            </ChartContainer>
        </>
    )
}

const Subtitle = styled.div`
    margin-top: 4px;
    padding-left: 24px;
`

const TotalSpan = styled.span`
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: ${getThemeColor(colors.black[400])};
`

const ChartContainer = styled.div`
    margin-top: 24px;
`

export default HomeTransactionGraph
