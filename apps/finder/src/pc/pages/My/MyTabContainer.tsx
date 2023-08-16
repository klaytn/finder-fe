import { If } from '@klaytn/slush'

import TabContainer from '../../../components/commons/TabContainer'
import Disconnected from '../../../components/pc/wallet/disconnected'
import { useScrollWhenQueryChange } from '../../../hooks/useScrollWhenQueryChange'
import { useTabQuery } from '../../../hooks/useTabQuery'
import { useWalletManager } from '../../../hooks/useWalletManager'
import MyContractTab from '../Tab/MyContractTab'
import RevokeTokenApprovalTab from '../Tab/RevokeTokenApprovalTab'

const tabs = [
    { name: 'Revoke Token Approval', value: 'revokeTokenApproval' },
    { name: 'My Contract', value: 'myContract' },
]

const MyTabContainer = () => {
    const { selectedTab } = useTabQuery(tabs)
    const { isConnected } = useWalletManager()
    useScrollWhenQueryChange()

    if (!isConnected) {
        return <Disconnected />
    }

    return (
        <TabContainer tabs={tabs} reversePadding={40}>
            <If condition={selectedTab === 'revokeTokenApproval'}>
                <RevokeTokenApprovalTab />
            </If>

            <If condition={selectedTab === 'myContract'}>
                <MyContractTab />
            </If>
        </TabContainer>
    )
}

export default MyTabContainer
