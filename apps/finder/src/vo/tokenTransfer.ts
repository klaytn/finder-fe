import BigNumber from 'bignumber.js'

import { TokenTransfer } from '../api/transaction'
import { TransactionItem } from '../types/transactionItem'
import { AddressVO } from './address'
import { TokenVO } from './token'

export class TokenTransferVO implements TransactionItem {
    constructor(private readonly _rawData: TokenTransfer) {}

    get amount() {
        return new BigNumber(this._rawData.amount)
    }

    get token() {
        return new TokenVO(this._rawData.token)
    }

    get from() {
        return new AddressVO(this._rawData.from)
    }

    get to() {
        if (this._rawData.to) {
            return new AddressVO(this._rawData.to)
        }
    }

    get txHash() {
        return this._rawData.transactionHash
    }

    get blockId() {
        return this._rawData.blockId
    }

    get datetime() {
        return new Date(this._rawData.datetime)
    }

    get isSuccess() {
        return true
    }
}
