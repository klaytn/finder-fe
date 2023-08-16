import BigNumber from 'bignumber.js'

import { NftInventory } from '../api/nft'
import { AddressVO } from './address'

export class NftInventoryVO {
    constructor(private readonly _rawData: NftInventory) {}

    get contractType() {
        return this._rawData.contractType
    }

    get holder() {
        return new AddressVO(this._rawData.holder)
    }

    get tokenCount() {
        return new BigNumber(this._rawData.tokenCount)
    }

    get tokenId() {
        return this._rawData.tokenId
    }

    get tokenUri() {
        return this._rawData.tokenUri
    }
}
