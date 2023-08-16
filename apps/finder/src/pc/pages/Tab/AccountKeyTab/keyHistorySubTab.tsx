import styled from 'styled-components'

import { colors, useToggles } from '@klaytn/slush'

import { useAccountKeyHistory } from '../../../../api/account'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../../components/commons/table/basic'
import { TableBlockIdCell, TableHashCell, TableTimesAgoCell } from '../../../../components/commons/table/variants'
import Page from '../../../../components/Page'
import { AccountKeyJsonViewer } from '../../../../components/pc/accountKeyInfo'
import { useServerConfig } from '../../../../context/configProvider'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import useQuery from '../../../../hooks/useQuery'

type KeyHistorySubTabProps = {
    address: string
    tabId: string
}

export const KeyHistorySubTab = ({ address, tabId }: KeyHistorySubTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'

    const { results, totalCount, currentPage, totalPage } = useAccountKeyHistory(address, page, 20)
    const {
        paging: { limit },
    } = useServerConfig()

    const whiteColor = useFinderThemeColor(colors.white)

    const toggles = useToggles(results.length, false)

    return (
        <Container>
            <Table
                columnSizeList={[280, 180, 152, 260, 316]}
                paddingTop={0}
                totalCount={totalCount}
                limitCount={limit.default}
            >
                <TableHeaders>
                    <TableHeader>TX Hash</TableHeader>
                    <TableHeader>Blocks #</TableHeader>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>TX Type</TableHeader>
                    <TableHeader>Account Key</TableHeader>
                </TableHeaders>

                {results.map(
                    (
                        {
                            accountKey,
                            accountKeyType,
                            blockNumber,
                            datetime,
                            transactionHash,
                            transactionType,
                            shouldShowKeyDetails,
                        },
                        index,
                    ) => {
                        return (
                            <TableRow
                                key={index}
                                isOpen={shouldShowKeyDetails ? toggles.isShowList[index] : undefined}
                                onToggle={shouldShowKeyDetails ? () => toggles.toggle(index) : undefined}
                                expandedContents={
                                    shouldShowKeyDetails ? (
                                        <AccountKeyJsonViewer data={accountKey} address={address} />
                                    ) : null
                                }
                            >
                                <TableHashCell value={transactionHash} />
                                <TableBlockIdCell value={blockNumber} />
                                <TableTimesAgoCell value={datetime} format="long" />
                                <TableCell color={whiteColor} tooltip>
                                    {transactionType}
                                </TableCell>
                                <TableCell color={whiteColor} tooltip padding={shouldShowKeyDetails ? 48 : 0}>
                                    {accountKeyType}
                                </TableCell>
                            </TableRow>
                        )
                    },
                )}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ tabId, subTabId: 'keyHistory' }} />
        </Container>
    )
}

const Container = styled.div``
