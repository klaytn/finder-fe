import BigNumber from 'bignumber.js'

import { Token, TokenInfo, TokenResponse } from '../api/token'
import { TokenItem } from '../types/tokenItem'
import { KeyCurrency } from '../variants/resource'

export class TokenVO {
    static From({ name, unit }: KeyCurrency) {
        return new TokenVO(
            {
                icon: '',
                name,
                symbol: unit,
                contractAddress: '',
                decimal: 0,
            },
            true,
        )
    }

    constructor(private readonly _rawData: TokenInfo, readonly isKeyCurrency = false) {}

    get name() {
        return this._rawData.name
    }

    get icon() {
        return this._rawData.icon
    }

    get symbol() {
        return this._rawData.symbol
    }

    get contractAddress() {
        return this._rawData.contractAddress
    }

    get decimal() {
        return this._rawData.decimal
    }

    get implementationAddress() {
        return this._rawData.implementationAddress
    }
}

export class TokenListItemVO implements TokenItem {
    constructor(private readonly _rawData: Token) {}

    get info() {
        return new TokenVO(this._rawData.info)
    }

    get totalSupply() {
        return new BigNumber(this._rawData.totalSupply)
    }

    get totalTransfers() {
        return this._rawData.totalTransfers
    }
}

export class TokenDetailVO {
    constructor(private readonly _rawData: TokenResponse) {}

    get info() {
        return new TokenVO(this._rawData.info)
    }

    get type() {
        return this._rawData.type
    }

    get totalSupply() {
        return new BigNumber(this._rawData.totalSupply)
    }

    get burnAmount() {
        return new BigNumber(this._rawData.burnAmount)
    }

    get totalTransfers() {
        return this._rawData.totalTransfers
    }

    get totalBurns() {
        return this._rawData.totalBurns
    }

    get officialSite() {
        return this._rawData.officialSite
    }
}
