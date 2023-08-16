import { forwardRef, PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, If, Label, typos } from '@klaytn/slush'

import BlockHash from '../../../components/BlockHash'
import Copy from '../../../components/commons/Copy'
import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import Summary, { SummaryContainer, SummaryUnit } from '../../../components/Summary'
import SummaryItem from '../../../components/SummaryItem'
import { useFeatures, useResources } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'
import { formatDatetime, klay, withCommas } from '../../../functions/Functions'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import TimesAgo from '../../../mobile/components/common/timesAgo'
import { BlockCommitteeAddressVO, BlockVO } from '../../../vo/block'

interface IBlockSummaryProps {
    block: BlockVO
}

const BlockSummary = ({ block }: IBlockSummaryProps) => {
    const colorSet = useFinderThemeColorSet({
        description: colors.black[500],
        proposer: colors.blue[200],
    })

    const hasBurntFees = block.burntFees !== undefined

    const { keyCurrency } = useResources()
    const { blockRewards = false, baseFee = false } = useFeatures()

    return (
        <SummaryContainer>
            <Summary width={640}>
                <SummaryItem>
                    <BlockSummaryRow title="Time" width={640}>
                        <TimesAgo datetime={block.datetime} />
                        <span style={{ color: colorSet.description, marginLeft: 12 }}>
                            ({formatDatetime(block.datetime)})
                        </span>
                    </BlockSummaryRow>
                </SummaryItem>
                <SummaryItem>
                    <BlockSummaryRow title="Hash" width={640}>
                        <BlockHash value={block.hash} maxLength={41} currentBlock />
                        <Copy value={block.hash} />
                    </BlockSummaryRow>
                </SummaryItem>
                <SummaryItem>
                    <BlockSummaryRow title="Parent Hash" width={640}>
                        <Link to={`/block/${block.id.minus(1)}`} className="link" style={{ textDecoration: 'none' }}>
                            <BlockHash value={block.parentHash} maxLength={41} />
                        </Link>
                        <Copy value={block.parentHash} />
                    </BlockSummaryRow>
                </SummaryItem>
                <SummaryItem>
                    <BlockSummaryRow title="Total TXs" width={640}>
                        {withCommas(block.totalTransactionCount)}
                    </BlockSummaryRow>
                </SummaryItem>
                <If condition={baseFee}>
                    <SummaryItem>
                        <BlockSummaryRow title="Base Fee" width={640}>
                            <EllipsisNumber value={klay(block.baseFeePerGas)} noEllipsis />
                            <SummaryUnit unit={keyCurrency.gasUnit} />
                        </BlockSummaryRow>
                    </SummaryItem>
                    <If condition={hasBurntFees}>
                        <SummaryItem>
                            <BlockSummaryRow title="Burnt Fees" width={640}>
                                <EllipsisNumber value={klay(block.burntFees)} noEllipsis />
                                <SummaryUnit unit={keyCurrency.gasUnit} />
                            </BlockSummaryRow>
                        </SummaryItem>
                    </If>
                </If>
                <If condition={blockRewards}>
                    <SummaryItem freeHeight>
                        <BlockSummaryRow
                            title="Block Rewards"
                            width={640}
                            subKey={<br />}
                            subValue={
                                <>
                                    (Minted {klay(block.mintedRewards)} + Total Fee {klay(block.totalFee)}) - (Burnt Fee{' '}
                                    {klay(block.burntFee)})
                                </>
                            }
                        >
                            <EllipsisNumber value={klay(block.totalRewards)} noEllipsis />
                            <SummaryUnit unit={keyCurrency.gasUnit} />
                        </BlockSummaryRow>
                    </SummaryItem>
                </If>
                <SummaryItem>
                    <BlockSummaryRow title="Block Size" width={640}>
                        {withCommas(block.size)} bytes
                    </BlockSummaryRow>
                </SummaryItem>
            </Summary>

            <Summary width={540}>
                <SummaryItem>
                    <BlockSummaryRow title="Block Proposer" width={540}>
                        <BlockProposer value={block.committee.blockProposer} color={colorSet.proposer} />
                    </BlockSummaryRow>
                </SummaryItem>
                {block.hasValidators && (
                    <SummaryItem alignItems="baseline">
                        <BlockSummaryRow title={`Validators (${block.committee.validators.length})`} width={540}>
                            <BlockValidator values={block.committee.validators} />
                        </BlockSummaryRow>
                    </SummaryItem>
                )}
            </Summary>
        </SummaryContainer>
    )
}

type BlockSummaryRowProps = PropsWithChildren<{
    title: string
    width: number
    subKey?: ReactNode
    subValue?: ReactNode
}>

const BlockSummaryRow = forwardRef<HTMLDivElement, BlockSummaryRowProps>(
    ({ title, width, children, subKey, subValue }, ref) => {
        return (
            <>
                <SummaryItem.Key width={140} sub={subKey}>
                    {title}
                </SummaryItem.Key>
                <SummaryItem.Value width={width - 140} sub={subValue} ref={ref}>
                    {children}
                </SummaryItem.Value>
            </>
        )
    },
)

BlockSummaryRow.displayName = 'BlockSummaryRow'

const BLOCK_PROPOSER_SUBSTR_LENGTH = 8
const getDisplayName = ({ address, label }: BlockCommitteeAddressVO) => {
    if (label) {
        return label
    }

    return (
        address.substring(0, BLOCK_PROPOSER_SUBSTR_LENGTH) +
        '...' +
        address.substring(address.length - BLOCK_PROPOSER_SUBSTR_LENGTH, address.length)
    )
}
interface IBlockProposerProps {
    value: BlockCommitteeAddressVO
    color: string
}

const BlockProposer = ({ value, color }: IBlockProposerProps) => {
    const displayName = getDisplayName(value)
    return (
        <Label
            color="blue"
            override={{
                typo: typos.code['12.16_400'],
            }}
        >
            <Link to={`/account/${value.address}`} style={{ color }}>
                {displayName}
            </Link>
        </Label>
    )
}

interface IBlockValidatorProps {
    values: BlockCommitteeAddressVO[]
}

const BlockValidator = (props: IBlockValidatorProps) => {
    const color = useFinderThemeColor(colors.blue[200])
    return (
        <ValidatorContainer>
            {props.values.map((validator, index) => {
                return (
                    <div key={index} style={{ marginBottom: 12 }}>
                        <BlockProposer key={index} value={validator} color={color} />
                    </div>
                )
            })}
        </ValidatorContainer>
    )
}

const ValidatorContainer = styled.div`
    width: 200px;
    overflow-y: auto;
    height: 184px;

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${getThemeColor(colors.blue[100])};
    }
    &::-webkit-scrollbar-track {
        background-color: ${getThemeColor(colors.blue[800])};
    }
`

export default BlockSummary
