import { useCallback, useState } from 'react'
import styled from 'styled-components'

import { Toast, useToggle } from '@klaytn/slush'

import { useMyContract } from '../../../../api/my'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import { useWalletManager } from '../../../../hooks/useWalletManager'
import { MyContractTokenInfoRow } from './common'

const TokenAndNftSubTab = () => {
    const { selectedAddress } = useWalletManager()

    const query = useQuery()
    const tabId = query.get('tabId')
    const subTabId = query.get('subTabId')
    const page = query.get('page') || '1'

    const {
        result: { results, totalCount, currentPage, startIndex, totalPage },
        refresh,
    } = useMyContract({
        accountAddress: selectedAddress,
        type: 'TOKEN',
        size: 20,
        page,
    })
    const {
        paging: { limit },
    } = useServerConfig()

    const errorToast = useToggle()
    const openErrorToast = errorToast.on
    const [errorMessage, setErrorMessage] = useState('')
    const [isWarning, setIsWarning] = useState(false)
    const handleShowErrorToast = useCallback(
        (message: string, isWarning = false) => {
            setErrorMessage(message)
            setIsWarning(isWarning)
            openErrorToast()
        },
        [openErrorToast],
    )

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <>
            <Toast
                message={errorMessage}
                show={errorToast.isShow}
                color={isWarning ? 'yellow' : 'red'}
                onClose={errorToast.off}
            />
            <CountContainer>
                <ListCount totalCount={totalCount} limitCount={limit.default} />
            </CountContainer>
            {results.map((myContract, index) => (
                <MyContractTokenInfoRow
                    index={startIndex + index}
                    key={myContract.address}
                    contract={myContract}
                    showErrorToast={handleShowErrorToast}
                    refresh={refresh}
                />
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

export default TokenAndNftSubTab
