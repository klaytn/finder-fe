import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useTokenTransfersByToken } from '../../../../api/token'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import TransactionItemBox from '../../common/transactionItemBox'

type TokenTransfersTabProps = {
    address: string
}

const TokenTransfersTab = ({ address }: TokenTransfersTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, results, totalCount } = useTokenTransfersByToken(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            <ListCount limitCount={limit.default} totalCount={totalCount} marginBottom={20} />

            {results.map((tokenTransfer, index) => (
                <TransactionItemBox key={`${tokenTransfer.blockId}-${index}`} data={tokenTransfer} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default TokenTransfersTab
