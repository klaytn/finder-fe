import BigNumber from 'bignumber.js'
import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { useTransaction } from '../../../../api/transaction'
import { useFeatures, useResources } from '../../../../context/configProvider'
import { klay } from '../../../../functions/Functions'
import { useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'

type TransactionSimpleAmountsProps = {
    hash: string
}

const TransactionSimpleAmounts = ({ hash }: TransactionSimpleAmountsProps) => {
    const { keyCurrency } = useResources()
    const { showGasPrice = false } = useFeatures()
    const { amount, gasPrice, fee } = useTransaction(hash)

    return (
        <Container>
            {showGasPrice && (
                <>
                    <AmountRow title="TX Fee" amount={fee} unit={keyCurrency.unit} />
                    <AmountRow title="Gas Price" amount={gasPrice} unit={keyCurrency.gasUnit} />
                </>
            )}
            <AmountRow title="Total" amount={amount} unit={keyCurrency.unit} />
        </Container>
    )
}

const Container = styled(Flex)`
    margin: 28px 0px 12px 0px;
`

type RowProps = {
    title: string
    amount: BigNumber
    unit: string
}

const AmountRow = ({ title, amount, unit }: RowProps) => {
    const colorSet = useFinderThemeColorSet({
        title: colors.blue[200],
        amount: colors.white,
        symbol: colors.black[500],
    })

    return (
        <RowContainer direction="row" justifyContent="space-between">
            <TitleText typo={typos.suit['12.16_900']} color={colorSet.title}>
                {title}
            </TitleText>
            <AmountContainer direction="row">
                <AmountText typo={typos.suit['12.16_400']} color={colorSet.amount}>
                    {klay(amount.toString())}
                </AmountText>
                <Text typo={typos.suit['12.16_400']} color={colorSet.symbol}>
                    {unit}
                </Text>
            </AmountContainer>
        </RowContainer>
    )
}

const RowContainer = styled(Flex)`
    margin-bottom: 16px;
`

const TitleText = styled(Text)`
    margin-right: 10px;
`

const AmountContainer = styled(Flex)`
    overflow: hidden;
`

const AmountText = styled(Text)`
    margin-right: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export default TransactionSimpleAmounts
