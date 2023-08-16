import BigNumber from 'bignumber.js'

import { TokenVO } from '../vo/token'

export type TokenItem = {
    info: TokenVO
    totalSupply: BigNumber
    totalTransfers: number
}
