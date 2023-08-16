import BigNumber from 'bignumber.js'

import { BlockTransaction } from '../api/block'
import { getMethodName } from '../functions/Functions'
import { TransactionItem } from '../types/transactionItem'
import { KeyCurrency } from '../variants/resource'
import { AddressVO } from './address'
import { TokenVO } from './token'

export class BlockTransactionVO implements TransactionItem {
    readonly token = TokenVO.From(this._keyCurrency)

    constructor(private readonly _rawData: BlockTransaction, private readonly _keyCurrency: KeyCurrency) {}

    get amount() {
        return new BigNumber(this._rawData.amount)
    }

    get fee() {
        return new BigNumber(this._rawData.transactionFee)
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

    get from() {
        return new AddressVO(this._rawData.from)
    }

    get to() {
        if (this._rawData.to) {
            return new AddressVO(this._rawData.to)
        }
    }

    get type() {
        return this._rawData.transactionType
    }

    get isSuccess() {
        return this._rawData.success
    }

    get failMessage() {
        return this._rawData.failMessage
    }

    get method() {
        const { signature, methodId } = this._rawData
        return getMethodName(signature, methodId)
    }
}
