import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useNftTransfersByNft } from '../../../../api/nft'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import NftTransferBox from './nftTransferBox'

type NftTransfersTabProps = {
    address: string
}

const NftTransfersTab = ({ address }: NftTransfersTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, results, totalCount } = useNftTransfersByNft(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            <ListCount limitCount={limit.default} totalCount={totalCount} marginBottom={20} />

            {results.map((nftTransfer, index) => (
                <NftTransferBox key={`${nftTransfer.blockId}-${index}`} data={nftTransfer} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default NftTransfersTab
