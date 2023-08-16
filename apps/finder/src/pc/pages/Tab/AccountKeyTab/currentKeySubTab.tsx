import { useAccount } from '../../../../api/account'
import { AccountKeyInfo } from '../../../../components/pc/accountKeyInfo'

type CurrentKeySubTabProps = {
    address: string
}

export const CurrentKeySubTab = ({ address }: CurrentKeySubTabProps) => {
    const { accountKey } = useAccount(address)

    if (!accountKey) {
        return null
    }

    return <AccountKeyInfo accountKey={accountKey} />
}
