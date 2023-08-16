import styled from 'styled-components'

import { colors, Flex, If, Text, typos } from '@klaytn/slush'

import { useTransaction } from '../../../../api/transaction'
import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { formatDatetime, withCommas } from '../../../../functions/Functions'
import { useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'
import TimesAgo from '../../common/timesAgo'
import { TextRow } from './rows'

type TransfersProps = {
    hash: string
}

const Transfers = ({ hash }: TransfersProps) => {
    const { hasNftTransfer, hasTokenTransfer, nftTransfer, tokenTransfer, datetime } = useTransaction(hash)
    const colorSet = useFinderThemeColorSet({
        label: colors.blue[200],
        timesAgo: colors.white,
        datetime: colors.black[500],
    })

    return (
        <Container>
            <If condition={hasTokenTransfer}>
                <TextRow
                    title="Token Transfers"
                    text={<EllipsisNumber value={withCommas(tokenTransfer)} noEllipsis />}
                />
            </If>

            <If condition={hasNftTransfer}>
                <TextRow title="NFT Transfers" text={<EllipsisNumber value={withCommas(nftTransfer)} noEllipsis />} />
            </If>

            <TimeRow direction="row" justifyContent="space-between">
                <Text typo={typos.suit['12.16_900']} color={colorSet.label}>
                    Time
                </Text>
                <Text typo={typos.suit['12.16_400']} color={colorSet.timesAgo}>
                    <TimesAgo datetime={datetime} />
                </Text>
            </TimeRow>

            <Flex direction="row" justifyContent="flex-end">
                <Text typo={typos.suit['12.16_400']} color={colorSet.datetime}>
                    ({formatDatetime(datetime.toString())})
                </Text>
            </Flex>
        </Container>
    )
}

const Container = styled(Flex)`
    margin: 24px 0px;
`

const TimeRow = styled(Flex)`
    margin-bottom: 2px;
`

export default Transfers
