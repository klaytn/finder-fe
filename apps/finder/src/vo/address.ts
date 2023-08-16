import { AddressInfo, isAddressInfo } from '../api/api'
import ConsensusNodeIcon from '../components/commons/icons/address/consensusNodeIcon'
import ContractIcon from '../components/commons/icons/address/contractIcon'
import DeadIcon from '../components/commons/icons/address/deadIcon'
import NftIcon from '../components/commons/icons/address/nftIcon'
import TokenIcon from '../components/commons/icons/address/tokenIcon'
import UserIcon from '../components/commons/icons/address/userIcon'
import { DEAD_ADDRESS, NULL_ADDRESS } from '../constants/address'

const TOKEN_SPEC_LIST = ['KIP7', 'ERC20']
const NFT_SPEC_LIST = ['KIP17', 'KIP37', 'ERC1155']

export class AddressVO {
    readonly tags: ReadonlyArray<string> = this._rawData.tags || []

    constructor(private readonly _rawData: AddressInfo) {
        //
    }

    get address() {
        return this._rawData.address || ''
    }

    get accountType() {
        return this._rawData.accountType || ''
    }

    get contractType() {
        return this._rawData.contractType || ''
    }

    get symbol() {
        return this._rawData.symbol || ''
    }

    get name() {
        return this._rawData.name || ''
    }

    get label() {
        return this._rawData.addressLabel || ''
    }

    get knsDomain() {
        return this._rawData.knsDomain || ''
    }

    get displayName() {
        if (this.isVerified && this.name) {
            return this.name || ''
        }

        return this.knsDomain || this.label || this.address
    }

    get icon() {
        if (typeof this._rawData.icon === 'string') {
            return this._rawData.icon
        }
    }

    get displayIcon() {
        const { isConsensusNode, isDead, isNFT, isNull, isToken, accountType, _rawData } = this

        if (_rawData.icon && typeof _rawData.icon !== 'string') {
            return _rawData.icon
        }

        switch (true) {
            case isDead:
            case isNull:
                return DeadIcon

            case isToken:
                return TokenIcon

            case isNFT:
                return NftIcon

            case isConsensusNode:
                return ConsensusNodeIcon
        }

        if (accountType === 'EOA') {
            return UserIcon
        }

        return ContractIcon
    }

    get isNFT() {
        const { contractType } = this
        return contractType && NFT_SPEC_LIST.includes(contractType)
    }

    get isToken() {
        const { contractType } = this
        return contractType && TOKEN_SPEC_LIST.includes(contractType)
    }

    get isConsensusNode() {
        return this.contractType === 'CONSENSUS_NODE'
    }

    get isNull() {
        return this.address === NULL_ADDRESS
    }

    get isDead() {
        return this.address === DEAD_ADDRESS
    }

    get isVerified() {
        return !!this._rawData.verified
    }

    static from(value?: string | AddressInfo | AddressVO) {
        if (value instanceof AddressVO) {
            return value
        }

        if (isAddressInfo(value)) {
            return new AddressVO(value)
        }
    }
}
