import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useNftHolders } from '../../../../api/nft'
import Empty from '../../../../components/commons/empty'
import Page from '../../../../components/Page'
import useQuery from '../../../../hooks/useQuery'
import HolderItemBox from '../../common/holderItemBox'

type NftItemHoldersTabProps = {
    address: string
    tokenId: string
}

const NftItemHoldersTab = ({ address, tokenId }: NftItemHoldersTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, startIndex, results, totalCount } = useNftHolders(address, page, tokenId)

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            {results.map((tokenHolder, index) => (
                <HolderItemBox key={index} rank={startIndex + index} data={tokenHolder} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default NftItemHoldersTab
