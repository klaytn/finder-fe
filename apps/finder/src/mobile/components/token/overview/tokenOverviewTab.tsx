import { Divider } from '@klaytn/slush'

import InnerBox from '../../common/innerBox'
import AdditionalInfo from './additionalInfo'
import AmountInfo from './amountInfo'
import BasicInfo from './basicInfo'

type TokenOverviewTabProps = {
    address: string
}

const TokenOverviewTab = ({ address }: TokenOverviewTabProps) => {
    return (
        <InnerBox paddingBottom={4}>
            <BasicInfo address={address} />
            <Divider />
            <AmountInfo address={address} />
            <Divider />
            <AdditionalInfo address={address} />
        </InnerBox>
    )
}

export default TokenOverviewTab
