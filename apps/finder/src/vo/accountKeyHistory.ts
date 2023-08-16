import { AccountKeyHistory } from '../api/account'
import { SIMPLE_KEY_LIST } from './account'

export class AccountKeyHistoryVO {
    constructor(private readonly _rawData: AccountKeyHistory) {}

    readonly datetime = new Date(this._rawData.datetime)

    get blockNumber() {
        return this._rawData.blockNumber
    }

    get transactionHash() {
        return this._rawData.transactionHash
    }

    get transactionType() {
        return this._rawData.transactionType
    }

    get accountAddress() {
        return this._rawData.accountAddress
    }

    get accountKeyType() {
        return this._rawData.accountKeyType
    }

    get key() {
        return this._rawData.key
    }

    get accountKey() {
        return this._rawData.accountKey
    }

    get shouldShowKeyDetails() {
        return !SIMPLE_KEY_LIST.includes(this.accountKey.type)
    }
}
