import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowRightIcon, colors, Flex, If, Text, typos } from '@klaytn/slush'

import { useTransaction } from '../../../../api/transaction'
import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { getStatusIcon } from '../../../../functions/icon'
import { useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'
import Address from '../../common/address'
import Hash from '../../common/hash'
import { BasicRow, NonTitleRow, TextRow } from './rows'

type SummaryProps = {
    hash: string
}

const Summary = ({ hash }: SummaryProps) => {
    const { type, blockId, from, to, feePayer, createdContract, isSuccess, status, failMessage } = useTransaction(hash)
    const { StatusIcon, statusColor } = getStatusIcon(isSuccess)

    const colorSet = useFinderThemeColorSet({
        blockId: colors.blue[400],
        label: colors.blue[200],
    })

    return (
        <Flex direction="column">
            <BasicRow title="TX Hash" gap={4}>
                <StatusText color={statusColor}>{status}</StatusText>
                <StatusIcon color={statusColor} size={16} />
            </BasicRow>
            <NonTitleRow marginBottom={failMessage ? 8 : 24}>
                <Hash hash={hash} copy />
            </NonTitleRow>

            {failMessage && (
                <NonTitleRow marginBottom={24}>
                    <ErrorText>{failMessage}</ErrorText>
                </NonTitleRow>
            )}

            <TextRow title="TX Type" text={type} />
            <BasicRow title="Block #">
                <Link to={`/block/${blockId}`}>
                    <Text typo={typos.suit['12.16_400']} color={colorSet.blockId}>
                        #{blockId}
                    </Text>
                </Link>
            </BasicRow>

            <FromToLabelRow direction="row" justifyContent="flex-start">
                <Text typo={typos.suit['12.16_900']} color={colorSet.label}>
                    From
                </Text>
                <If condition={!!to}>
                    <FromToLabelArrowIconContainer>
                        <ArrowRightIcon size={8} color={colorSet.label} />
                    </FromToLabelArrowIconContainer>
                    <Text typo={typos.suit['12.16_900']} color={colorSet.label}>
                        To
                    </Text>
                </If>
            </FromToLabelRow>

            <FromToRow direction="row" justifyContent="space-between">
                <Address address={from} grow={1} />
                <If condition={!!to}>
                    <FromToArrowIconContainer>
                        <ArrowRightIcon size={12} color={colorSet.label} />
                    </FromToArrowIconContainer>
                </If>
                <Address address={to} grow={1} />
            </FromToRow>

            {!!feePayer && (
                <BasicRow title="Fee Payer" marginBottom={24}>
                    <Address address={feePayer} grow={1} />
                </BasicRow>
            )}

            {!!createdContract && (
                <BasicRow title="Created Contract" marginBottom={24}>
                    <Address address={createdContract} grow={1} />
                </BasicRow>
            )}
        </Flex>
    )
}

const StatusText = styled(Text).attrs({
    typo: typos.suit['12.16_900'],
})``

const ErrorText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.red[500],
    }),
)`
    white-space: normal;
`

const FromToLabelRow = styled(Flex)`
    align-self: stretch;
    margin-bottom: 8px;
    align-items: center;
`

const FromToLabelArrowIconContainer = styled(Flex)`
    margin: 0px 5px;
`

const FromToRow = styled(Flex)`
    align-items: center;
    margin-bottom: 16px;
`

const FromToArrowIconContainer = styled(Flex)`
    margin: 0px 7px;
`

export default Summary
