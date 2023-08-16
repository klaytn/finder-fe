import { Flex } from '@klaytn/slush'

import { useAccountNftKip17Balance } from '../../../../api/account'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import NftBalanceItemBox from './nftBalanceItemBox'

type AccountKip17BalanceTabProps = {
    address: string
}

const AccountKip17BalanceTab = ({ address }: AccountKip17BalanceTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { results, currentPage, totalPage, totalCount } = useAccountNftKip17Balance(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Flex>
            <ListCount limitCount={limit.default} totalCount={totalCount} marginBottom={20} />

            {results.map((item) => (
                <NftBalanceItemBox key={item.info.contractAddress} data={item} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Flex>
    )
}

export default AccountKip17BalanceTab
