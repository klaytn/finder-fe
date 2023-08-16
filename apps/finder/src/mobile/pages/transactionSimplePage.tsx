import { useParams } from 'react-router'

import { Divider } from '@klaytn/slush'

import InnerBox from '../components/common/innerBox'
import TransactionSimpleAmounts from '../components/transaction/simple/transactionSimpleAmounts'
import TransactionSimpleLinks from '../components/transaction/simple/transactionSimpleLinks'
import TransactionSimpleSummary from '../components/transaction/simple/transactionSimpleSummary'
import TransactionTitle from '../components/transaction/transactionTitle'

const TransactionSimplePage = () => {
    const params = useParams()
    const hash = params.txHash || ''

    return (
        <>
            <TransactionTitle hash={hash} simpleView />
            <InnerBox>
                <TransactionSimpleSummary hash={hash} />
                <Divider />
                <TransactionSimpleAmounts hash={hash} />
                <Divider />
                <TransactionSimpleLinks hash={hash} />
            </InnerBox>
        </>
    )
}

export default TransactionSimplePage
