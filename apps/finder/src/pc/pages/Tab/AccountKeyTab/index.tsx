import { useMemo } from 'react'
import styled from 'styled-components'

import { useAccount } from '../../../../api/account'
import ButtonGroup, { ButtonGroupItem } from '../../../../components/buttonGroup'
import { useSubTab } from '../../../../hooks/useSubTab'
import { CurrentKeySubTab } from './currentKeySubTab'
import { KeyHistorySubTab } from './keyHistorySubTab'

const SUB_TABS: ButtonGroupItem[] = [
    {
        title: 'Current Key',
        value: 'currentKey',
    },
    {
        title: 'Key History',
        value: 'keyHistory',
    },
]

type AccountKeyTabProps = {
    address: string
    tabId: string
}

export const AccountKeyTab = ({ address, tabId }: AccountKeyTabProps) => {
    const {
        associatedInfos: { accountKey = false },
    } = useAccount(address)
    const subTabs = useMemo(() => {
        if (accountKey) {
            return SUB_TABS
        }

        return SUB_TABS.map((subTab) => {
            if (subTab.value !== 'keyHistory') {
                return subTab
            }

            return {
                ...subTab,
                disableMessage: 'There is no data',
            }
        })
    }, [accountKey])
    const { subTab, handleSubTabChange } = useSubTab(subTabs[0].value)

    return (
        <div>
            <ButtonGroupContainer>
                <ButtonGroup buttons={subTabs} selectedValue={subTab} onChange={handleSubTabChange} />
            </ButtonGroupContainer>
            {subTab === 'currentKey' && <CurrentKeySubTab address={address} />}
            {subTab === 'keyHistory' && <KeyHistorySubTab address={address} tabId={tabId} />}
        </div>
    )
}

const ButtonGroupContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 28px;
`
