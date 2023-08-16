import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useTransaction } from '../../../../api/transaction'
import { useFeatures } from '../../../../context/configProvider'
import { withCommas } from '../../../../functions/Functions'
import { KlayRow, TextRow } from './rows'

type AmountsProps = {
    hash: string
}

const Amounts = ({ hash }: AmountsProps) => {
    const {
        nonce,
        amount,
        gasPrice,
        gasUsed,
        gasLimit,
        fee,
        effectiveGasPrice,
        hasEffectiveGasPrice,
        feeRation,
        feeFromAmount,
        feePayerAmount,
        burntFees,
    } = useTransaction(hash)

    const { baseFee = false, showGasPrice = false } = useFeatures()
    const showEffectiveGasPrice = baseFee && showGasPrice && hasEffectiveGasPrice

    return (
        <Container direction="column">
            <TextRow title="Nonce" text={nonce} />
            {showGasPrice && <KlayRow title="Amount" klay={amount} />}
            {showGasPrice && (
                <KlayRow title="Gas Price" klay={gasPrice} marginBottom={showEffectiveGasPrice ? 4 : 16} />
            )}
            {showEffectiveGasPrice && <KlayRow isSub title="Effective Gas Price" klay={effectiveGasPrice} />}
            <TextRow title="Gas Used" text={withCommas(gasUsed)} />
            <TextRow title="Gas Limit" text={withCommas(gasLimit)} />
            {showGasPrice && <KlayRow title="TX Fee" klay={fee} />}
            {!!burntFees && <KlayRow title="Burnt Fee" klay={burntFees} />}
            {feeRation !== undefined && (
                <>
                    <TextRow title="Fee Ratio" text={feeRation} marginBottom={4} />
                    {feePayerAmount !== undefined && (
                        <KlayRow isSub title="Payer" klay={feePayerAmount} marginBottom={4} />
                    )}
                    {feeFromAmount !== undefined && <KlayRow isSub title="From" klay={feeFromAmount} />}
                </>
            )}
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 24px;
`

export default Amounts
