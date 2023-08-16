import BigNumber from 'bignumber.js'

import { AddressVO } from '../vo/address'
import { TokenVO } from '../vo/token'

export type TransactionItem = {
    amount: BigNumber
    txHash: string
    blockId: number | string
    datetime: Date
    from: AddressVO
    to?: AddressVO
    token: TokenVO
    type?: string
    isSuccess: boolean
    failMessage?: string
}
