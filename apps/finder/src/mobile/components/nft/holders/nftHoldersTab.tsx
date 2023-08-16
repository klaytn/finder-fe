import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useNftHolders } from '../../../../api/nft'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import HolderItemBox from '../../common/holderItemBox'

type NftHoldersTabProps = {
    address: string
}

const NftHoldersTab = ({ address }: NftHoldersTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, startIndex, results, totalCount } = useNftHolders(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    const isKip17 = results[0]?.contractType === 'KIP17'

    return (
        <Container>
            <ListCount
                limitCount={isKip17 ? limit.nft17Holder : limit.nft37Holder}
                totalCount={totalCount}
                marginBottom={20}
            />

            {results.map((tokenHolder, index) => (
                <HolderItemBox key={index} rank={startIndex + index} data={tokenHolder} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default NftHoldersTab
