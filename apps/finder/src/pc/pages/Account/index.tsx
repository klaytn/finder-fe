import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { Label } from '@klaytn/slush'

import { getAccount } from '../../../api/account'
import Empty from '../../../components/commons/empty'
import { PageTitle } from '../../../components/pc/pages'
import { toPascalCase } from '../../../functions/string'
import useAsyncError from '../../../hooks/useAsyncError'
import { AccountVO } from '../../../vo/account'
import AccountSummary from './AccountSummary'
import AccountTabContainer from './AccountTabContainer'

const Account = () => {
    const params = useParams()
    const throwError = useAsyncError()
    const address = params.address as string

    const [account, setAccount] = useState<AccountVO>()

    const fetchAccount = useCallback(
        async (address: string) => {
            try {
                const { data } = await getAccount(address)
                setAccount(new AccountVO(data))
            } catch (e) {
                throwError(e)
            }
        },
        [throwError],
    )

    useEffect(() => {
        fetchAccount(address)
    }, [address, fetchAccount])

    if (!account || account.address === '') {
        return null
    }

    const { title, subType, displayTitle, governanceCouncil } = account

    return (
        <>
            <PageTitleContainer>
                {!!governanceCouncil?.thumbnail && <PageTitleIcon src={governanceCouncil.thumbnail} />}
                <PageTitle>{displayTitle}</PageTitle>
                {!!governanceCouncil && (
                    <PageTitleLabel color="black" size="xlarge">
                        {toPascalCase(governanceCouncil.contractType)}
                    </PageTitleLabel>
                )}
            </PageTitleContainer>
            <AccountSummary account={account} type={title} subType={subType} />
            <AccountContents account={account} title={title} subType={subType} />
        </>
    )
}

const PageTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
`

const PageTitleIcon = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`

const PageTitleLabel = styled(Label)`
    margin-left: 4px;
`

type AccountContentsProps = {
    account: AccountVO
    title: string
    subType?: string
}
const AccountContents = ({ account, title, subType }: AccountContentsProps) => {
    const { contractCreateFailed, associatedInfos } = account

    if (contractCreateFailed) {
        // No information because the contract was not submitted
        return null
    }

    if (associatedInfos.allDisabled) {
        // Don't show tabs because none are active
        return <Empty />
    }

    return <AccountTabContainer account={account} type={title} subType={subType} />
}

export default Account
