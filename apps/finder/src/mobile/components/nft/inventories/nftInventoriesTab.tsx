import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useNftInventories } from '../../../../api/nft'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import NftInventoryBox from './nftInventoryBox'

type NftInventoriesTabProps = {
    address: string
}

const NftInventoriesTab = ({ address }: NftInventoriesTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, results, totalCount } = useNftInventories(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Container>
            <ListCount limitCount={limit.nftInventory} totalCount={totalCount} marginBottom={20} />

            {results.map((nftInventory, index) => (
                <NftInventoryBox key={index} data={nftInventory} address={address} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default NftInventoriesTab
