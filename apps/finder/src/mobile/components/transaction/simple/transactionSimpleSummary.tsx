import { format } from 'date-fns'
import { useLinkClickHandler } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowRightIcon, colors, Flex, If, Text, typos, withAlpha } from '@klaytn/slush'

import { useTransaction } from '../../../../api/transaction'
import { useResources } from '../../../../context/configProvider'
import { klay } from '../../../../functions/Functions'
import { getStatusIcon } from '../../../../functions/icon'
import { useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'

type TransactionSimpleSummaryProps = {
    hash: string
}

const TransactionSimpleSummary = ({ hash }: TransactionSimpleSummaryProps) => {
    const { keyCurrency } = useResources()
    const { status, isSuccess, type, amount, datetime, from, to } = useTransaction(hash)

    const { StatusIcon, statusColor } = getStatusIcon(isSuccess)
    const colorSet = useFinderThemeColorSet({
        divider: colors.white,
        type: colors.black[400],
        amount: colors.white,
        symbol: colors.black[500],
        datetime: colors.black[500],
        label: colors.blue[200],
        arrowIcon: colors.white,
    })

    return (
        <Flex direction="column">
            <Header direction="row">
                <StatusText typo={typos.suit['12.16_900']} color={statusColor}>
                    {status}
                </StatusText>
                <StatusIcon color={statusColor} size={16} />
                <DividerText typo={typos.suit['14.18_400']} color={withAlpha(colorSet.divider, 10)}>
                    |
                </DividerText>
                <Text typo={typos.suit['10.14_400']} color={colorSet.type}>
                    {type}
                </Text>
            </Header>

            <AmountContainer direction="row">
                <AmountText typo={typos.suit['24.32_900']} color={colorSet.amount}>
                    {klay(amount.toString())}
                </AmountText>
                <Text typo={typos.suit['20.28_900']} color={colorSet.symbol}>
                    {keyCurrency.unit}
                </Text>
            </AmountContainer>

            <DateTimeContainer>
                <Text typo={typos.suit['12.16_900']} color={colorSet.datetime}>
                    {format(datetime, 'MM/dd/yyyy hh:mm')}
                </Text>
            </DateTimeContainer>

            <FromToLabelContainer direction="row" justifyContent="space-between">
                <Text typo={typos.suit['14.18_900']} color={colorSet.label}>
                    From
                </Text>
                <If condition={!!to?.address}>
                    <Text typo={typos.suit['14.18_900']} color={colorSet.label}>
                        To
                    </Text>
                </If>
            </FromToLabelContainer>

            <FromToContainer direction="row" justifyContent="space-between">
                <AddressLink hash={from.address} />

                <If condition={!!to?.address}>
                    <FromToIconContainer>
                        <ArrowRightIcon color={colorSet.arrowIcon} size={14} />
                    </FromToIconContainer>
                    <AddressLink hash={to?.address || ''} />
                </If>
            </FromToContainer>
        </Flex>
    )
}

const Header = styled(Flex)`
    align-items: end;
    margin-bottom: 20px;
`

const StatusText = styled(Text)`
    margin-right: 4px;
`

const DividerText = styled(Text)`
    margin: 0px 8px;
`

const AmountContainer = styled(Flex)`
    align-items: end;
    margin-bottom: 8px;
    overflow: hidden;
`

const AmountText = styled(Text)`
    margin-right: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const DateTimeContainer = styled(Flex)`
    margin-bottom: 28px;
`

const FromToLabelContainer = styled(Flex)`
    margin-bottom: 12px;
`

const FromToContainer = styled(Flex)`
    margin-bottom: 28px;
    align-items: center;
`

const FromToIconContainer = styled(Flex)`
    margin: 0px 22px;
`

type AddressLinkProps = {
    hash: string
}

const AddressLink = ({ hash }: AddressLinkProps) => {
    const handleClick = useLinkClickHandler<HTMLDivElement>(`/account/${hash}`)
    return (
        <AddressLinkContainer onClick={handleClick} justifyContent="center">
            <AddressLinkText color={colors.white} typo={typos.code['12.16_400']}>
                {hash}
            </AddressLinkText>
        </AddressLinkContainer>
    )
}

const AddressLinkContainer = styled(Flex)`
    flex-grow: 1;
    background-color: ${colors.blue[600]};
    border-radius: 8px;
    padding: 3px 5px 3px 10px;
    overflow: hidden;
`

const AddressLinkText = styled(Text)`
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
`

export default TransactionSimpleSummary
