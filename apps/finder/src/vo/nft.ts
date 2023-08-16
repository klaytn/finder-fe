import BigNumber from 'bignumber.js'

import { Nft, NftInfo, NftItem, NftResponse } from '../api/nft'
import { createVoIfExist } from '../functions/Functions'
import { TokenItem } from '../types/tokenItem'
import { AddressVO } from './address'
import { TokenVO } from './token'

export class NftVO {
    constructor(private readonly _rawData: NftInfo) {}

    get symbol() {
        return this._rawData.symbol
    }

    get name() {
        return this._rawData.name
    }

    get icon() {
        return this._rawData.icon
    }

    get contractAddress() {
        return this._rawData.contractAddress
    }

    get hasSymbol() {
        return !!this.symbol && this.symbol !== '-'
    }

    get hasIcon() {
        return !!this.icon
    }

    get hasName() {
        return !!this.name && this.name !== this.contractAddress
    }

    get implementationAddress() {
        return this._rawData.implementationAddress
    }
}

export class NftListItemVO implements TokenItem {
    readonly info = new TokenVO({ ...this._rawData.info, decimal: 0 })
    readonly totalSupply = createVoIfExist(this._rawData.totalSupply, BigNumber)

    constructor(private readonly _rawData: Nft) {}

    get totalTransfers() {
        return this._rawData.totalTransfers
    }
}

const LIGHT_TYPE_LIST = ['ERC1155', 'KIP37']
export class NftDetailVO {
    readonly info = createVoIfExist(this._rawData.info, NftVO)
    readonly totalSupply = createVoIfExist(this._rawData.totalSupply, BigNumber)
    readonly isLightType = LIGHT_TYPE_LIST.includes(this.type)

    constructor(private readonly _rawData: NftResponse) {}

    get type() {
        return this._rawData.type
    }

    get totalTransfers() {
        return this._rawData.totalTransfers
    }

    get holderCount() {
        return this._rawData.holderCount
    }

    get officialSite() {
        return this._rawData.officialSite
    }
}

export class NftItemDetailVO {
    readonly info = createVoIfExist(this._rawData.info, NftVO)
    readonly holder = createVoIfExist(this._rawData.holder, AddressVO)
    readonly totalSupply = createVoIfExist(this._rawData.totalSupply, BigNumber)
    readonly burnAmount = createVoIfExist(this._rawData.burnAmount, BigNumber)
    readonly tokenUriUpdatedAt = createVoIfExist(this._rawData.tokenUriUpdatedAt, Date)

    constructor(private readonly _rawData: NftItem) {}

    get id() {
        return this._rawData.tokenId
    }

    get type() {
        return this._rawData.contractType
    }

    get uri() {
        return this._rawData.tokenUri
    }

    get isLightType() {
        return LIGHT_TYPE_LIST.includes(this.type) && !this.info.hasName && !this.info.hasSymbol
    }

    get hasHolders() {
        return LIGHT_TYPE_LIST.includes(this.type)
    }

    get tokenUriRefreshable() {
        return this._rawData.tokenUriRefreshable
    }
}
