import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useAccountProposedBlocks } from '../../../../api/account'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import BlockItem from './blockItem'

type AccountProposedBlocksTabProps = {
    address: string
}

const AccountProposedBlocksTab = ({ address }: AccountProposedBlocksTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, results, totalCount } = useAccountProposedBlocks(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            <ListCount limitCount={limit.default} totalCount={totalCount} marginBottom={20} />

            {results.map((item) => (
                <BlockItem key={item.id.toString()} block={item} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default AccountProposedBlocksTab
