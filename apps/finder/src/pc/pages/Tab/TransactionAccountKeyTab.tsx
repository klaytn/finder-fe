import { useTransaction } from '../../../api/transaction'
import { AccountKeyInfo } from '../../../components/pc/accountKeyInfo'

type TransactionAccountKeyTabProps = {
    txHash: string
}

export const TransactionAccountKeyTab = ({ txHash }: TransactionAccountKeyTabProps) => {
    const { key, accountKey } = useTransaction(txHash)

    return <AccountKeyInfo encodedKey={key} accountKey={accountKey} />
}
