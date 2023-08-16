import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { colors, FireIcon, Text, typos } from '@klaytn/slush'

import { AddressInfo, defaultPage, Paging } from '../../../api/api'
import { Block, defaultBlock, getBlocks } from '../../../api/block'
import { Table, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import {
    TableBlockIdCell,
    TableHashCell,
    TableKlayCell,
    TableNumberCell,
    TableTimesAgoCell,
} from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { ListTitle } from '../../../components/Title'
import { useFeatures, useResources, useServerConfig } from '../../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { klay } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { finderStatusState } from '../../../states/status'

const Blocks = () => {
    const { keyCurrency } = useResources()
    const { blockRewards, baseFee = false, showBlockBurnt = false } = useFeatures()
    const query = useQuery()
    const [blocks, setBlocks] = useState<Block[]>(Array<Block>(20).fill(defaultBlock, 0, 20))
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const {
        paging: { limit },
    } = useServerConfig()

    const page = query.get('page') || '1'

    const hideColumnIndexList = useMemo(() => {
        const result: number[] = []

        if (!baseFee) {
            result.push(4, 5)
        }

        if (!blockRewards) {
            result.push(6)
        }

        return result
    }, [baseFee, blockRewards])

    const fetchBlocks = async (page: string) => {
        getBlocks(page).then((rsp) => {
            setBlocks(rsp.data.results)
            setPaging(rsp.data.paging)
        })
    }

    useEffect(() => {
        fetchBlocks(page)
    }, [page])

    const unitText = keyCurrency.gasUnit ? `(${keyCurrency.gasUnit})` : ''
    const titleDecorator = showBlockBurnt ? <TotalBurntByGasFee /> : null

    return (
        <>
            <div className="flex_space_between">
                <ListTitle title="Blocks" onRefresh={() => fetchBlocks('1')} types={[]} decorator={titleDecorator} />
            </div>

            <Table
                columnSizeList={[152, 80, 106, 166, 160, 160, 160, 120]}
                hideColumnIndexList={hideColumnIndexList}
                totalCount={paging.totalCount}
                limitCount={limit.block}
                gapWithCount={33}
            >
                <TableHeaders>
                    <TableHeader>Block #</TableHeader>
                    <TableHeader>Time ago</TableHeader>
                    <TableHeader>Total TXs</TableHeader>
                    <TableHeader>Block Proposer</TableHeader>
                    <TableHeader>Base Fee {unitText}</TableHeader>
                    <TableHeader>Burnt Fee {unitText}</TableHeader>
                    <TableHeader>Rewards {unitText}</TableHeader>
                    <TableHeader align="right">Size (Bytes)</TableHeader>
                </TableHeaders>

                {blocks.map((block, index) => {
                    const addressInfo: AddressInfo = {
                        address: block.blockProposer,
                        addressLabel: block.blockProposerLabel,
                    }

                    return (
                        <TableRow key={index}>
                            <TableBlockIdCell value={block.blockId} />
                            <TableTimesAgoCell value={block.datetime} />
                            <TableNumberCell value={block.totalTransactionCount} color={colors.white} align="left" />
                            <TableHashCell value={addressInfo} />
                            <TableKlayCell value={block.baseFeePerGas} />
                            <TableKlayCell value={block.burntFees || 0} />
                            <TableKlayCell value={block.rewardKlay} />
                            <TableNumberCell value={block.blockSize} color={colors.black[400]} />
                        </TableRow>
                    )
                })}
            </Table>

            <Page current={paging.currentPage} total={paging.totalPage} />
        </>
    )
}

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
                <FireIcon color={iconColor} size={20} />
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
    width: 100%;
    gap: 12px;
`

const TotalBurntByGasFeeTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.24_900'],
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
    color: ${getThemeColor(colors.white)};
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

export default Blocks
