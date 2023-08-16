import { Flex } from '@klaytn/slush'

import { useAccountEventLogs } from '../../../../api/account'
import Empty from '../../../../components/commons/empty'
import ListCount from '../../../../components/commons/listCount'
import Page from '../../../../components/Page'
import { useServerConfig } from '../../../../context/configProvider'
import useQuery from '../../../../hooks/useQuery'
import EventLog from '../../transaction/eventLogs/eventLog'

type AccountEventLogsTabProps = {
    address: string
}

const AccountEventLogsTab = ({ address }: AccountEventLogsTabProps) => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')

    const { currentPage, totalPage, results, totalCount } = useAccountEventLogs(address, page)
    const {
        paging: { limit },
    } = useServerConfig()

    if (totalCount === 0) {
        return <Empty />
    }

    return (
        <Flex>
            <ListCount limitCount={limit.eventLog || limit.default} totalCount={totalCount} marginBottom={20} />

            {results.map((eventLog, index) => (
                <EventLog key={index} eventLog={eventLog} />
            ))}

            <Page current={currentPage} total={totalPage} query={{ tabId }} marginTop={12} size="small" />
        </Flex>
    )
}

export default AccountEventLogsTab
