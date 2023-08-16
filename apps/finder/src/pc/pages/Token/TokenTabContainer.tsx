import { If } from '@klaytn/slush'

import TabContainer from '../../../components/commons/TabContainer'
import { useTabQuery } from '../../../hooks/useTabQuery'
import TokenBurntListTab from '../Tab/TokenBurntListTab'
import TokenHolderTab from '../Tab/TokenHolderTab'
import TokenTransferTab from '../Tab/TokenTransferTab'

export interface ITokenTabContainerProps {
    contractAddress: string
}

const TABS = [
    { name: 'Token transfers', value: 'tokenTransfer' },
    { name: 'Holders', value: 'tokenHolder' },
    { name: 'Burnt list', value: 'burntList' },
]

const TokenTabContainer = ({ contractAddress }: ITokenTabContainerProps) => {
    const { selectedTab } = useTabQuery(TABS)

    return (
        <TabContainer tabs={TABS} reversePadding={40}>
            <If condition={selectedTab === 'tokenTransfer'}>
                <TokenTransferTab tabId={selectedTab} tokenAddress={contractAddress} hideTokenColumn />
            </If>
            <If condition={selectedTab === 'tokenHolder'}>
                <TokenHolderTab tokenAddress={contractAddress} />
            </If>
            <If condition={selectedTab === 'burntList'}>
                <TokenBurntListTab tabId={selectedTab} tokenAddress={contractAddress} />
            </If>
        </TabContainer>
    )
}

export default TokenTabContainer
