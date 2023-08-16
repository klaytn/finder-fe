import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { colors, FireIcon, If, Text, typos } from '@klaytn/slush'

import { useBlocks } from '../../api/block'
import ListCount from '../../components/commons/listCount'
import Page from '../../components/Page'
import { useFeatures, useResources, useServerConfig } from '../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../functions/colorMap'
import { klay } from '../../functions/Functions'
import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'
import useQuery from '../../hooks/useQuery'
import { finderStatusState } from '../../states/status'
import BlockItem from '../components/block/list/blockItem'
import TitleRow from '../components/common/titleRow'

const BlocksPage = () => {
    const query = useQuery()
    const page = query.get('page') || '1'

    const {
        result: { currentPage, totalPage, results, totalCount },
        refresh,
    } = useBlocks(page)
    const {
        paging: { limit },
    } = useServerConfig()
    const { showBlockBurnt = false } = useFeatures()

    return (
        <>
            <TitleRow title="Blocks" onRefresh={refresh} marginBottom={12} />
            <ListCount limitCount={limit.block} totalCount={totalCount} marginBottom={20} />
            {showBlockBurnt && <TotalBurntByGasFee />}

            {results.map((block) => (
                <BlockItem key={block.id.toString()} block={block} />
            ))}
            <If condition={currentPage === totalPage}>
                <LastPageText>
                    Because of length issue,
                    <br />
                    we show only the newest 40,000 data. <br />
                    You can check the previous data by search.
                </LastPageText>
            </If>
            <Page current={currentPage} total={totalPage} marginTop={12} size="small" />
        </>
    )
}

const LastPageText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    margin: 60px 20px;
    text-align: center;
`

const TotalBurntByGasFee = () => {
    const { block_burnt } = useRecoilValue(finderStatusState)
    const { accumulate_burnt_fees = '0' } = block_burnt || {}

    const { keyCurrency } = useResources()
    const iconColor = useFinderThemeColor(colors.blue[400])

    const { integer, fraction } = useMemo(() => {
        const result = klay(accumulate_burnt_fees, undefined, 3)
        const [integer, fraction] = result.split('.')

        return {
            integer,
            fraction,
        }
    }, [accumulate_burnt_fees])

    return (
        <TotalBurntByGasFeeContainer>
            <TotalBurntByGasFeeTitleContainer>
                <FireIcon color={iconColor} size={16} />
                <TitleText>Total Burnt by Gas fee</TitleText>
            </TotalBurntByGasFeeTitleContainer>

            <TotalBurntNumberContainer>
                <KlayPriceDollarSpan>{integer}.</KlayPriceDollarSpan>
                <TotalBurntFraction>{fraction}</TotalBurntFraction>
                <TotalBurntUnit>{keyCurrency.unit}</TotalBurntUnit>
            </TotalBurntNumberContainer>
        </TotalBurntByGasFeeContainer>
    )
}

const TotalBurntByGasFeeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    width: 100%;
    gap: 4px;
    margin-bottom: 12px;
`

const TotalBurntByGasFeeTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.blue[400],
    }),
)``

const TotalBurntNumberContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
`

const KlayPriceDollarSpan = styled.span`
    font-weight: bold;
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)};
`

const TotalBurntFraction = styled(KlayPriceDollarSpan)`
    color: ${getThemeColor(colors.black[400])};
`

const TotalBurntUnit = styled.span`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.black[500])};
    margin-left: 4px;
`

export default BlocksPage
