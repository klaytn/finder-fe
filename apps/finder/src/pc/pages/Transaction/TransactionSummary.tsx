import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { ArrowRightIcon, CircleiconConfirmOnIcon, colors, CopyIcon, ErrorIcon, Flex, Text, typos } from '@klaytn/slush'

import Address from '../../../components/Address'
import Copy from '../../../components/commons/Copy'
import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import EllipsisTooltip from '../../../components/commons/ellipsisTooltip'
import FinderLink from '../../../components/commons/finderLink'
import InfoTooltip from '../../../components/commons/infoTooltip'
import Summary, { SummaryContainer, SummaryUnit } from '../../../components/Summary'
import SummaryItem from '../../../components/SummaryItem'
import { SummaryTop, SummaryTopRow } from '../../../components/SummaryTop'
import { METHOD_TOOLTIP } from '../../../constants/message'
import { useFeatures, useResources } from '../../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { formatDatetime, klay, timesAgo, withCommas } from '../../../functions/Functions'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import { timerState } from '../../../states/timer'
import { TransactionVO } from '../../../vo/transaction'

interface ITransactionSummaryProps {
    transaction: TransactionVO
}

const TransactionSummary = ({ transaction }: ITransactionSummaryProps) => {
    const timer = useRecoilValue<number>(timerState)
    const { keyCurrency } = useResources()
    const { baseFee = false, showGasPrice = false } = useFeatures()

    const colorSet = useFinderThemeColorSet({
        copyButton: colors.white,
        infoIcon: colors.blue[200],
    })

    const hasAddressTo = !!transaction.to?.address

    const { failMessage } = transaction

    const showEffectiveGasPrice = baseFee && transaction.effectiveGasPrice !== undefined

    return (
        <SummaryContainer>
            <SummaryTop>
                <SummaryTopRow title="TX Hash" titleWidth={160} alignItems="baseline">
                    <ColumnContainer>
                        <RowContainer>
                            <Hash>
                                {transaction.hash}
                                <Copy value={transaction.hash}>
                                    <CopyIcon size={16} color={colorSet.copyButton} />
                                </Copy>
                            </Hash>
                            <TransactionResult status={transaction.status} />
                        </RowContainer>

                        {failMessage && <ErrorText>{failMessage}</ErrorText>}
                    </ColumnContainer>
                </SummaryTopRow>
            </SummaryTop>

            <Summary width={560}>
                <SummaryItem>
                    <SummaryItem.Key width={140}>TX Type</SummaryItem.Key>
                    <SummaryItem.Value width={400}>{transaction.type}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={140}>Block #</SummaryItem.Key>
                    <SummaryItem.Value width={400}>
                        <FinderLink to={`/block/${transaction.blockId}`}>{transaction.blockId}</FinderLink>
                    </SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={140}>
                        From
                        {hasAddressTo && (
                            <>
                                <span style={{ marginLeft: 10, marginRight: 10 }}>
                                    <ArrowRightIcon color={colors.white} size={12} />
                                </span>
                                To
                            </>
                        )}
                    </SummaryItem.Key>
                    <SummaryItem.Value width={400} ellipsis>
                        <Address value={transaction.from} big grow={1} basis={0} />
                        {hasAddressTo && (
                            <span style={{ marginLeft: 10, marginRight: 10, marginTop: 2 }}>
                                <ArrowRightIcon color={colors.white} size={12} />
                            </span>
                        )}
                        <Address value={transaction.to} big grow={1} basis={0} />
                    </SummaryItem.Value>
                </SummaryItem>
                {!!transaction.feePayer && (
                    <SummaryItem>
                        <SummaryItem.Key width={140}>Fee Payer</SummaryItem.Key>
                        <SummaryItem.Value width={400}>
                            <Address value={transaction.feePayer} big />
                        </SummaryItem.Value>
                    </SummaryItem>
                )}
                {!!transaction.createdContract && (
                    <SummaryItem>
                        <SummaryItem.Key width={140}>Created contract</SummaryItem.Key>
                        <SummaryItem.Value width={400}>
                            <Address value={transaction.createdContract} big />
                        </SummaryItem.Value>
                    </SummaryItem>
                )}
                <SummaryItem>
                    <SummaryItem.Key width={140}>Token Transfers</SummaryItem.Key>
                    <SummaryItem.Value width={400}>{transaction.tokenTransfer.toString()}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={140}>NFT Transfers</SummaryItem.Key>
                    <SummaryItem.Value width={400}>{transaction.nftTransfer.toString()}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={140}>Time</SummaryItem.Key>
                    <SummaryItem.Value width={400}>
                        {timesAgo(transaction.datetime, timer, 'full')}
                        <span style={{ color: '#968FA3', marginLeft: 12 }}>
                            ({formatDatetime(transaction.datetime)})
                        </span>
                    </SummaryItem.Value>
                </SummaryItem>
                {transaction.methodId && (
                    <SummaryItem>
                        <SummaryItem.Key width={140}>Method ID</SummaryItem.Key>
                        <SummaryItem.Value width={400}>{transaction.methodId}</SummaryItem.Value>
                    </SummaryItem>
                )}
            </Summary>

            <Summary width={520}>
                {showGasPrice && (
                    <SummaryItem>
                        <SummaryItem.Key width={120}>Amount</SummaryItem.Key>
                        <SummaryItem.Value width={380}>
                            <EllipsisNumber value={klay(transaction.amount)} noEllipsis />
                            <SummaryUnit />
                        </SummaryItem.Value>
                    </SummaryItem>
                )}
                {showGasPrice && (
                    <SummaryItem hasSub={showEffectiveGasPrice}>
                        <SummaryItem.Key width={120} sub={showEffectiveGasPrice ? 'Effective Gas Price' : ''}>
                            Gas Price
                        </SummaryItem.Key>
                        <SummaryItem.Value
                            width={380}
                            sub={
                                showEffectiveGasPrice && (
                                    <>
                                        <EllipsisNumber
                                            integerColor={colors.black[300]}
                                            value={klay(transaction.effectiveGasPrice)}
                                            noEllipsis
                                        />
                                        <SummaryUnit sub unit={keyCurrency.gasUnit} />
                                    </>
                                )
                            }
                        >
                            <EllipsisNumber value={klay(transaction.gasPrice)} noEllipsis />
                            <SummaryUnit unit={keyCurrency.gasUnit} />
                        </SummaryItem.Value>
                    </SummaryItem>
                )}
                <SummaryItem>
                    <SummaryItem.Key width={120}>Gas Used</SummaryItem.Key>
                    <SummaryItem.Value width={380}>{withCommas(transaction.gasUsed)}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Gas Limit</SummaryItem.Key>
                    <SummaryItem.Value width={380}>{withCommas(transaction.gasLimit)}</SummaryItem.Value>
                </SummaryItem>
                {showGasPrice && (
                    <SummaryItem freeHeight={!!transaction.burntFees}>
                        <SummaryItem.Key width={120} sub={transaction.burntFees ? 'Burnt Fee' : ''}>
                            TX Fee
                        </SummaryItem.Key>
                        <SummaryItem.Value
                            width={380}
                            sub={
                                !!transaction.burntFees && (
                                    <>
                                        <EllipsisNumber
                                            integerColor={colors.black[300]}
                                            value={klay(transaction.burntFees)}
                                            noEllipsis
                                        />
                                        <SummaryUnit sub />
                                    </>
                                )
                            }
                        >
                            <EllipsisNumber value={klay(transaction.fee)} noEllipsis />
                            <SummaryUnit />
                        </SummaryItem.Value>
                    </SummaryItem>
                )}

                {transaction.hasFeeRation && (
                    <SummaryItem hasSub>
                        <SummaryItem.Key width={120} sub="Payer / From">
                            Fee Ratio
                        </SummaryItem.Key>
                        <SummaryItem.Value
                            width={380}
                            sub={
                                <>
                                    <EllipsisNumber
                                        integerColor={colors.black[300]}
                                        value={klay(transaction.feePayerAmount)}
                                        noEllipsis
                                    />
                                    <SummaryUnit />
                                    <FeeRatioDivider />
                                    <EllipsisNumber
                                        integerColor={colors.black[300]}
                                        value={klay(transaction.feeFromAmount)}
                                        noEllipsis
                                    />
                                    <SummaryUnit />
                                </>
                            }
                        >
                            {transaction.feeRation}
                        </SummaryItem.Value>
                    </SummaryItem>
                )}

                <SummaryItem>
                    <SummaryItem.Key width={120}>Nonce</SummaryItem.Key>
                    <SummaryItem.Value width={380}>{transaction.nonce}</SummaryItem.Value>
                </SummaryItem>

                {transaction.signature && (
                    <SummaryItem>
                        <SummaryItem.Key width={120}>
                            Method Sig
                            <InfoTooltip
                                marginLeft={4}
                                alignItems="center"
                                size={16}
                                color={colorSet.infoIcon}
                                message={METHOD_TOOLTIP}
                            />
                        </SummaryItem.Key>
                        <SummaryItem.Value width={380}>
                            <EllipsisTooltip>{transaction.signature}</EllipsisTooltip>
                        </SummaryItem.Value>
                    </SummaryItem>
                )}
            </Summary>
        </SummaryContainer>
    )
}

const ColumnContainer = styled(Flex).attrs({
    direction: 'column',
})`
    width: 100%;
    gap: 12px;
`

const RowContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    align-items: center;
    flex-grow: 1;
`

const Hash = styled(Flex).attrs({
    direction: 'row',
    round: 16,
    justifyContent: 'center',
})`
    background-color: ${getThemeColor(colors.black[830])};
    padding: 8px 12px 8px 16px;
    gap: 12px;
    align-items: center;
`

const ErrorText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.20_400'],
        color: colors.red[500],
    }),
)``

type TransactionResultProps = {
    status?: string
}

const TransactionResult = ({ status }: TransactionResultProps) => {
    const isSuccess = status === 'Success'
    const color = isSuccess ? colors.green[500] : colors.red[500]
    const themeColor = useFinderThemeColor(color)
    const StatusIcon = isSuccess ? CircleiconConfirmOnIcon : ErrorIcon

    if (status === undefined) {
        return null
    }

    return (
        <>
            <TransactionResultContainer>
                <TransactionResultText color={themeColor}>{status}</TransactionResultText>
                <StatusIcon color={themeColor} size={25} />
            </TransactionResultContainer>
        </>
    )
}

const TransactionResultContainer = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const TransactionResultText = styled(Text).attrs({
    typo: typos.suit['16.20_900'],
})`
    margin-right: 4px;
`

const FeeRatioDivider = styled.span.attrs({ children: '/' })`
    margin: 0px 8px;
`

export default TransactionSummary
