import { Divider } from '@klaytn/slush'

import InnerBox from '../../common/innerBox'
import AdditionalInfo from './additionalInfo'
import BasicInfo from './basicInfo'

type NftOverviewTabProps = {
    address: string
}

const NftOverviewTab = ({ address }: NftOverviewTabProps) => {
    return (
        <InnerBox paddingBottom={4}>
            <BasicInfo address={address} />
            <Divider />
            <AdditionalInfo address={address} />
        </InnerBox>
    )
}

export default NftOverviewTab
