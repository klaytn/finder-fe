import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useNftTransfersByNft } from '../../../../api/nft'
import Empty from '../../../../components/commons/empty'
import Page from '../../../../components/Page'
import useQuery from '../../../../hooks/useQuery'
import NftTransferBox from '../../nft/transfers/nftTransferBox'

type NftItemTransfersTabProps = {
    address: string
    tokenId: string
}

const NftItemTransfersTab = ({ address, tokenId }: NftItemTransfersTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, results, totalCount } = useNftTransfersByNft(address, page, tokenId)

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            {results.map((nftTransfer, index) => (
                <NftTransferBox key={`${nftTransfer.blockId}-${index}`} data={nftTransfer} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default NftItemTransfersTab
