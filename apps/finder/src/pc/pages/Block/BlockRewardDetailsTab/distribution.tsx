import BigNumber from 'bignumber.js'

import { typos } from '@klaytn/slush'

import { Table, TableHeader, TableHeaders, TableRow } from '../../../../components/commons/table/basic'
import { TableHashCell, TableKlayCell, TableTextCell } from '../../../../components/commons/table/variants'
import { useResources } from '../../../../context/configProvider'
import { BlockRewardDetailsVO } from '../../../../vo/blockRewardDetails'
import Row from './row'

type BlockRewardRecipientTableItem = {
    type: string
    subtype: string
    address: string
    amount: BigNumber
}

function createTableData({
    proposerRecipient,
    kgfRecipient,
    kirRecipient,
    stakerRecipients,
    stakersTotalAmount,
}: BlockRewardDetailsVO) {
    const result: BlockRewardRecipientTableItem[] = []

    if (proposerRecipient) {
        if (proposerRecipient.hasAlpha) {
            result.push({
                type: 'Proposer',
                subtype: 'Total',
                address: '',
                amount: proposerRecipient.totalAmount,
            })
            result.push({
                type: '',
                subtype: 'Distribution',
                address: proposerRecipient.address,
                amount: proposerRecipient.amount,
            })
            result.push({
                type: '',
                subtype: 'Staker + Remainder',
                address: proposerRecipient.address,
                amount: proposerRecipient.alpha,
            })
        } else {
            result.push({
                type: 'Proposer',
                subtype: '',
                address: proposerRecipient.address,
                amount: proposerRecipient.totalAmount,
            })
        }
    }

    if (kgfRecipient) {
        result.push({
            type: 'KGF',
            subtype: '',
            address: kgfRecipient.address,
            amount: kgfRecipient.totalAmount,
        })
    }

    if (kirRecipient) {
        result.push({
            type: 'KIR',
            subtype: '',
            address: kirRecipient.address,
            amount: kirRecipient.totalAmount,
        })
    }

    if (stakersTotalAmount.gt(0)) {
        result.push({
            type: 'Stakers',
            subtype: 'Total',
            address: '',
            amount: stakersTotalAmount,
        })

        stakerRecipients.forEach((stakerRecipient) => {
            result.push({
                type: '',
                subtype: 'Staker',
                address: stakerRecipient.address,
                amount: stakerRecipient.totalAmount,
            })
        })
    }

    return result
}

type RewardDistributionProps = {
    data: BlockRewardDetailsVO
}
const RewardDistribution = ({ data }: RewardDistributionProps) => {
    const {
        keyCurrency: { gasUnit },
    } = useResources()
    const tableData = createTableData(data)

    return (
        <Row title="Reward Distribution">
            <Table columnSizeList={[200, 230, 406, 380]}>
                <TableHeaders>
                    <TableHeader>Type</TableHeader>
                    <TableHeader />
                    <TableHeader>Recipient</TableHeader>
                    <TableHeader align="right">Amount ({gasUnit})</TableHeader>
                </TableHeaders>

                {tableData.map(({ type, subtype, address, amount }, index) => (
                    <TableRow
                        key={index}
                        newSegmentRow={type !== 'Proposer' && !!type}
                        segmentLastRow={tableData[index + 1]?.subtype === ''}
                    >
                        <TableTextCell value={type} typo={typos.suit['14.18_700']} />
                        <TableTextCell value={subtype} typo={typos.suit['14.18_400']} />
                        <TableHashCell value={address || '-'} noLink={!address} />
                        <TableKlayCell value={amount} align="right" />
                    </TableRow>
                ))}
            </Table>
        </Row>
    )
}

export default RewardDistribution
