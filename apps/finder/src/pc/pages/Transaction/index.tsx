import { useParams } from 'react-router'

import { useTransaction } from '../../../api/transaction'
import { DetailTitle } from '../../../components/Title'
import TransactionSummary from './TransactionSummary'
import TransactionTabContainer from './TransactionTabContainer'

const Transaction = () => {
    const params = useParams()
    const txHash = params.txHash as string

    const transaction = useTransaction(txHash)

    if (transaction.hash === '') {
        return null
    }

    return (
        <>
            <DetailTitle title="Transaction" />
            <TransactionSummary transaction={transaction} />
            <TransactionTabContainer
                txHash={transaction.hash}
                tokenTransfer={transaction.tokenTransfer.gt(0)}
                nftTransfer={transaction.nftTransfer.gt(0)}
            />
        </>
    )
}

export default Transaction
