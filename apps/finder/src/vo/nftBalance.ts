import BigNumber from 'bignumber.js'

import { NftBalanceResponse } from '../api/account'
import { TokenVO } from './token'

export class NftBalanceVO {
    constructor(private readonly _rawData: NftBalanceResponse) {}

    get contractType() {
        return this._rawData.contractType
    }

    get info() {
        return new TokenVO(this._rawData.info)
    }

    get latestTransactionDateTime() {
        return new Date(this._rawData.latestTransaction)
    }

    get tokenCount() {
        return new BigNumber(this._rawData.tokenCount)
    }

    get tokenId() {
        return this._rawData.tokenId
    }
}
