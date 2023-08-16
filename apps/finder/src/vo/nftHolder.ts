import BigNumber from 'bignumber.js'

import { NftHolder } from '../api/nft'
import { HolderItem } from '../types/holderItem'
import { AddressVO } from './address'

export class NftHolderVO implements HolderItem {
    constructor(private readonly _rawData: NftHolder) {}
    get contractType() {
        return this._rawData.contractType
    }

    get holder() {
        return new AddressVO(this._rawData.holder)
    }

    get percentage() {
        return this._rawData.percentage
    }

    get tokenCount() {
        return new BigNumber(this._rawData.tokenCount)
    }

    get tokenId() {
        return this._rawData.tokenId
    }

    get amount() {
        return this.tokenCount
    }
}
