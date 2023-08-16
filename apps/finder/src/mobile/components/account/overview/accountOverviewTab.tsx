import { Divider } from '@klaytn/slush'

import InnerBox from '../../common/innerBox'
import AddressInfo from './addressInfo'
import BasicInfo from './basicInfo'

type AccountOverviewTabProps = {
    address: string
}

const AccountOverviewTab = ({ address }: AccountOverviewTabProps) => {
    return (
        <InnerBox paddingBottom={4}>
            <AddressInfo address={address} />
            <Divider />
            <BasicInfo address={address} />
        </InnerBox>
    )
}

export default AccountOverviewTab
