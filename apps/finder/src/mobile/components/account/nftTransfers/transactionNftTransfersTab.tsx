import { Flex } from '@klaytn/slush'

import { useAccountNftTransfers } from '../../../../api/account'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import NftTransfer from '../../transaction/nftTransfers/nftTransfer'

type AccountNftTransfersTabProps = {
    address: string
}

const AccountNftTransfersTab = ({ address }: AccountNftTransfersTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { results, currentPage, totalPage, totalCount } = useAccountNftTransfers(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Flex>
            <ListCount limitCount={limit.default} totalCount={totalCount} marginBottom={20} />

            {results.map((nftTransfer, index) => (
                <NftTransfer key={index} nftTransfer={nftTransfer} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Flex>
    )
}

export default AccountNftTransfersTab
