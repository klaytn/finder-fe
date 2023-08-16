import BigNumber from 'bignumber.js'

import { AddressVO } from '../vo/address'

export type HolderItem = {
    holder: AddressVO
    tokenId?: string
    amount: BigNumber
    percentage: number
}
