import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useTokenHolders } from '../../../../api/token'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import HolderItemBox from '../../common/holderItemBox'

type TokenHoldersTabProps = {
    address: string
}

const TokenHoldersTab = ({ address }: TokenHoldersTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, startIndex, results, totalCount } = useTokenHolders(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            <ListCount limitCount={limit.tokenHolder} totalCount={totalCount} marginBottom={20} />

            {results.map((tokenHolder, index) => (
                <HolderItemBox key={index} rank={startIndex + index} data={tokenHolder} hasToken />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default TokenHoldersTab
