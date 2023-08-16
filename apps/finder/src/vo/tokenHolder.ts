import BigNumber from 'bignumber.js'

import { TokenHolder } from '../api/token'
import { HolderItem } from '../types/holderItem'
import { AddressVO } from './address'

export class TokenHolderVO implements HolderItem {
    constructor(private readonly _rawData: TokenHolder) {}

    get amount() {
        return new BigNumber(this._rawData.amount)
    }

    get percentage() {
        return this._rawData.percentage
    }

    get holder() {
        return new AddressVO(this._rawData.holder)
    }
}
