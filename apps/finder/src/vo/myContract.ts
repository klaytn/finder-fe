import { MyContractResponse } from '../api/my'

export class MyContractVO {
    readonly createdAt = new Date(this._rawData.createdAt)
    readonly updatedAt = new Date(this._rawData.updatedAt)

    constructor(private readonly _rawData: MyContractResponse) {}

    get address() {
        return this._rawData.address
    }

    get type() {
        return this._rawData.type
    }

    get name() {
        return this._rawData.name
    }

    get symbol() {
        return this._rawData.symbol
    }

    get icon() {
        return this._rawData.icon
    }

    get officialSite() {
        return this._rawData.officialSite
    }

    get officialEmailAddress() {
        return this._rawData.officialEmailAddress
    }

    get contractCreatorAddress() {
        return this._rawData.contractCreatorAddress
    }

    get contractCreatorTransactionHash() {
        return this._rawData.contractCreatorTransactionHash
    }

    get contractCreated() {
        return this._rawData.contractCreated
    }

    get isUpdated() {
        if (!this._rawData.updatedAt) {
            return false
        }

        if (this._rawData.updatedAt === this._rawData.createdAt) {
            return false
        }

        return true
    }
}
