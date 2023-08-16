import { Flex } from '@klaytn/slush'

import { useAccountTokenBalance } from '../../../../api/account'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import TokenBalanceItemBox from './tokenBalanceItemBox'

type AccountTokenBalanceTabProps = {
    address: string
}

const AccountTokenBalanceTab = ({ address }: AccountTokenBalanceTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { results, currentPage, totalPage, totalCount } = useAccountTokenBalance(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Flex>
            <ListCount limitCount={limit.default} totalCount={totalCount} marginBottom={20} />

            {results.map((tokenTransfer) => (
                <TokenBalanceItemBox key={tokenTransfer.info.contractAddress} data={tokenTransfer} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Flex>
    )
}

export default AccountTokenBalanceTab
