import { Divider } from '@klaytn/slush'

import InnerBox from '../../common/innerBox'
import Amounts from './amounts'
import Summary from './summary'
import Transfers from './transfers'

type TransactionOverviewTabProps = {
    hash: string
}

const TransactionOverviewTab = ({ hash }: TransactionOverviewTabProps) => {
    return (
        <InnerBox paddingBottom={4}>
            <Summary hash={hash} />
            <Divider />
            <Transfers hash={hash} />
            <Divider />
            <Amounts hash={hash} />
        </InnerBox>
    )
}

export default TransactionOverviewTab
