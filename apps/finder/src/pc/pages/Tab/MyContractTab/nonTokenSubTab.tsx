import styled from 'styled-components'

import { useMyContract } from '../../../../api/my'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import { useWalletManager } from '../../../../hooks/useWalletManager'
import { MyContractNonTokenInfoRow } from './common'

const NonTokenSubTab = () => {
    const { selectedAddress } = useWalletManager()

    const query = useQuery()
    const tabId = query.get('tabId')
    const subTabId = query.get('subTabId')
    const page = query.get('page') || '1'

    const {
        result: { results, totalCount, currentPage, startIndex, totalPage },
    } = useMyContract({
        accountAddress: selectedAddress,
        type: 'CONTRACT',
        size: 20,
        page,
    })
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <>
            <CountContainer>
                <ListCount totalCount={totalCount} limitCount={limit.default} />
            </CountContainer>
            {results.map((myContract, index) => (
                <MyContractNonTokenInfoRow index={startIndex + index} key={myContract.address} contract={myContract} />
            ))}
            <Page
                current={currentPage}
                total={totalPage}
                query={{
                    tabId,
                    subTabId,
                }}
            />
        </>
    )
}

const CountContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export default NonTokenSubTab
