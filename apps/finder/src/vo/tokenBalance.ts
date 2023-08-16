import { TokenBalanceResponse } from '../api/account'
import { TokenVO } from './token'

export class TokenBalanceVO {
    constructor(private readonly _rawData: TokenBalanceResponse) {}

    get info() {
        return new TokenVO(this._rawData.info)
    }

    get balance() {
        return this._rawData.balance
    }

    get latestTransactionDateTime() {
        return new Date(this._rawData.latestTransactionDateTime)
    }
}
