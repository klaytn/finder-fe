import { NftTransfer } from '../api/transaction'
import { AddressVO } from './address'
import { NftVO } from './nft'

export class NftTransferVO {
    constructor(private readonly _rawData: NftTransfer) {}

    get tokenId() {
        return this._rawData.tokenId
    }

    get tokenCount() {
        return this._rawData.tokenCount
    }

    get nft() {
        return new NftVO(this._rawData.nft)
    }

    get from() {
        return new AddressVO(this._rawData.from)
    }

    get to() {
        return new AddressVO(this._rawData.to)
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
}
