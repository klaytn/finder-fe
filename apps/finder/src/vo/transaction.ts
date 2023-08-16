import BigNumber from 'bignumber.js'

import { Transaction, TransactionResponse } from '../api/transaction'
import { createVoIfExist, getMethodName } from '../functions/Functions'
import { TransactionItem } from '../types/transactionItem'
import { KeyCurrency } from '../variants/resource'
import { AddressVO } from './address'
import { TokenVO } from './token'

export class TransactionVO implements TransactionItem {
    readonly from = new AddressVO(this._rawData.from)
    readonly to = createVoIfExist(this._rawData.to, AddressVO)
    readonly feePayer = createVoIfExist(this._rawData.feePayerAccount, AddressVO)
    readonly createdContract = createVoIfExist(this._rawData.createdContractAccount, AddressVO)

    readonly gasPrice = new BigNumber(this._rawData.gasPrice)
    readonly gasLimit = new BigNumber(this._rawData.gasLimit)
    readonly gasUsed = new BigNumber(this._rawData.gasUsed)
    readonly fee = new BigNumber(this._rawData.transactionFee)
    readonly amount = new BigNumber(this._rawData.amount)
    readonly tokenTransfer = new BigNumber(this._rawData.tokenTransfer)
    readonly nftTransfer = new BigNumber(this._rawData.nftTransfer)

    readonly effectiveGasPrice = createVoIfExist(this._rawData.effectiveGasPrice, BigNumber)
    readonly burntFees = createVoIfExist(this._rawData.burntFees, BigNumber)

    readonly datetime = new Date(this._rawData.datetime)

    readonly token = TokenVO.From(this._keyCurrency)

    constructor(private _rawData: TransactionResponse, private readonly _keyCurrency: KeyCurrency) {}

    get hash() {
        return this._rawData.transactionHash
    }

    get txHash() {
        return this.hash
    }

    get status() {
        return this._rawData.status
    }

    get isSuccess() {
        return this._rawData.status === 'Success'
    }

    get type() {
        return this._rawData.transactionType
    }

    get hasTokenTransfer() {
        return this._rawData.tokenTransfer > 0
    }

    get hasNftTransfer() {
        return this._rawData.nftTransfer > 0
    }

    get feeRation() {
        if (this._rawData.feeRation !== undefined) {
            return this._rawData.feeRation / 100
        }
    }

    get hasFeeRation() {
        return this.feeRation !== undefined && this.feeRation !== 1
    }

    get feePayerAmount() {
        if (this.feeRation !== undefined) {
            return this.fee.multipliedBy(this.feeRation)
        }
    }

    get feeFromAmount() {
        if (this.feeRation !== undefined) {
            return this.fee.multipliedBy(1 - this.feeRation)
        }
    }

    get blockId() {
        return this._rawData.blockId
    }

    get nonce() {
        return this._rawData.nonce
    }

    get hasEffectiveGasPrice() {
        return this._rawData.effectiveGasPrice !== undefined
    }

    get failMessage() {
        return this._rawData.failMessage
    }

    get methodId() {
        return this._rawData.methodId
    }

    get signature() {
        return this._rawData.signature
    }

    get accountKey() {
        return this._rawData.accountKey
    }

    get key() {
        return this._rawData.key
    }
}

export class TransactionListItemVO implements TransactionItem {
    readonly from = new AddressVO(this._rawData.from)
    readonly to = createVoIfExist(this._rawData.to, AddressVO)

    readonly amount = new BigNumber(this._rawData.amount)
    readonly fee = new BigNumber(this._rawData.transactionFee)

    readonly datetime = new Date(this._rawData.datetime)

    readonly token = TokenVO.From(this._keyCurrency)

    constructor(private readonly _rawData: Transaction, private readonly _keyCurrency: KeyCurrency) {}

    get txHash() {
        return this._rawData.transactionHash
    }

    get blockId() {
        return this._rawData.blockId
    }

    get type() {
        return this._rawData.transactionType
    }

    get isSuccess() {
        return (this._rawData.success === undefined || !!this._rawData.success) && !this._rawData.error
    }

    get failMessage() {
        return this._rawData.error || this._rawData.failMessage
    }

    get method() {
        const { signature, methodId } = this._rawData
        return getMethodName(signature, methodId)
    }
}
