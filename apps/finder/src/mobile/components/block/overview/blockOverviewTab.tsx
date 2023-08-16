import { Divider } from '@klaytn/slush'

import InnerBox from '../../common/innerBox'
import Calcs from './calcs'
import Proposers from './proposers'
import TimeAndHash from './timeAndHash'

type BlockOverviewTabProps = {
    id: string
}

const BlockOverviewTab = ({ id }: BlockOverviewTabProps) => {
    return (
        <InnerBox paddingBottom={4}>
            <TimeAndHash id={id} />
            <Divider />
            <Calcs id={id} />
            <Divider />
            <Proposers id={id} />
        </InnerBox>
    )
}

export default BlockOverviewTab
