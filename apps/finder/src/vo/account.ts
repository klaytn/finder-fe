import BigNumber from 'bignumber.js'

import { AccountResponse, isTokenInfo } from '../api/account'
import { DEAD_ADDRESS, NULL_ADDRESS } from '../constants/address'
import { createVoIfExist } from '../functions/Functions'
import { isNft } from '../functions/nft'
import { isToken } from '../functions/token'
import { AddressVO } from './address'
import { GovernanceCouncilVO } from './governanceCouncil'
import { NftVO } from './nft'
import { TokenVO } from './token'

const NULL_ADDRESS_MEMO =
    'This address is not owned by any user, is often associated with token burn & mint / genesis events and used as a generic null address.'
const DEAD_ADDRESS_MEMO = 'This address is commonly used by projects to burn tokens (reducing total supply).'
const UNSUBMITTED_CONTRACT_MEMO = 'This Contract is not submitted.Contract information is unavailable.'

const KNS_LINK_PREFIX = 'https://app.klaytn.domains/domains/'

export const SIMPLE_KEY_LIST = ['AccountKeyLegacy', 'AccountKeyFail']

export class AccountVO {
    readonly balance = new BigNumber(this._rawData.balance)

    readonly contractCreator = createVoIfExist(this._rawData.contractCreator, AddressVO)

    readonly governanceCouncil = createVoIfExist(
        this._rawData.governanceCouncil,
        GovernanceCouncilVO,
        this._rawData.address,
    )

    readonly info?: NftVO | TokenVO

    readonly tags: ReadonlyArray<string> = this._rawData.tags || []

    constructor(private readonly _rawData: AccountResponse) {
        const { info } = _rawData
        if (info) {
            this.info = isTokenInfo(info) ? new TokenVO(info) : new NftVO(info)
        }
    }

    get accountType() {
        return this._rawData.accountType
    }

    get contractType() {
        return this._rawData.contractType
    }

    get title() {
        const { accountType, contractType } = this

        if (contractType === 'CONSENSUS_NODE') {
            return 'Consensus Node'
        }

        return accountType === 'SCA' ? 'Contract' : 'Account'
    }

    get displayTitle() {
        const { accountType, contractType, governanceCouncil } = this

        if (governanceCouncil) {
            return `${governanceCouncil.name} (GovernanceCouncil)`
        }

        if (contractType === 'CONSENSUS_NODE') {
            return 'Account (Consensus Node)'
        }

        if (accountType === 'SCA') {
            return 'Account (Contract)'
        }

        return 'Account'
    }

    get subType() {
        const { accountType, contractType } = this

        if (accountType === 'EOA') {
            return
        }

        if (isToken(contractType)) {
            return 'Token'
        }

        if (isNft(contractType)) {
            return 'NFT'
        }

        return
    }

    get address() {
        return this._rawData.address
    }

    get totalTransactionCount() {
        return this._rawData.totalTransactionCount
    }

    get contractCreatorAddress() {
        return this._rawData.contractCreatorAddress
    }

    get contractCreatorTransactionHash() {
        return this._rawData.contractCreatorTransactionHash
    }

    get hasName() {
        return !!this.info?.name
    }

    get tokenLink() {
        if (!this.subType) {
            return ''
        }

        return `/${this.subType.toLowerCase()}/${this.address}`
    }

    get isNullAccount() {
        return this.address === NULL_ADDRESS
    }

    get isDeadAddress() {
        return this.address === DEAD_ADDRESS
    }

    get memo() {
        if (this.isNullAccount) {
            return NULL_ADDRESS_MEMO
        }

        if (this.isDeadAddress) {
            return DEAD_ADDRESS_MEMO
        }

        if (this.contractCreateFailed) {
            return UNSUBMITTED_CONTRACT_MEMO
        }
    }

    get label() {
        return this._rawData.addressLabel
    }

    get knsDomain() {
        return this._rawData.knsDomain
    }

    get knsLink() {
        if (this.knsDomain) {
            return `${KNS_LINK_PREFIX}${this.knsDomain.replace('.klay', '')}`
        }
    }

    get displayNameTitle() {
        if (this.knsDomain) {
            return 'KNS Address'
        }

        if (this.label) {
            return 'Label'
        }
    }

    get displayName() {
        return this.knsDomain || this.label
    }

    get associatedInfos() {
        return this._rawData.associatedInfos
    }

    get contractCreateFailed() {
        return this.accountType === 'SCA' && this._rawData.contractCreated === false
    }

    get accountKey() {
        return this._rawData.accountKey
    }

    get shouldShowKeyDetails() {
        const { accountType, accountKey, associatedInfos } = this

        if (accountType !== 'EOA') {
            return false
        }

        const accountKeyType = accountKey?.type
        if (!accountKeyType) {
            return false
        }

        if (SIMPLE_KEY_LIST.includes(accountKeyType) && !associatedInfos.accountKey) {
            return false
        }

        return true
    }
}
