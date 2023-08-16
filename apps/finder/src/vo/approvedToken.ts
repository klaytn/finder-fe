import BigNumber from 'bignumber.js'

import { ApprovedNft, ApprovedToken, ApprovedTokenBase, ContractSummary, SpenderAccount } from '../api/my'

export class SpenderAccountVO {
    constructor(private readonly _rawData: SpenderAccount) {}

    get address() {
        return this._rawData.address
    }

    get accountType() {
        return this._rawData.accountType
    }

    get contractType() {
        return this._rawData.contractType
    }

    get symbol() {
        return this._rawData.symbol
    }

    get name() {
        return this._rawData.name
    }

    get icon() {
        return this._rawData.icon
    }

    get knsDomain() {
        return this._rawData.knsDomain
    }

    get label() {
        return this._rawData.addressLabel
    }
}

export class ContractSummaryVO {
    private readonly _totalSupply: BigNumber

    constructor(private readonly _rawData: ContractSummary) {
        this._totalSupply = new BigNumber(_rawData.totalSupply)
    }

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

    get implementationAddress() {
        return this._rawData.implementationAddress
    }

    get decimal() {
        return this._rawData.decimal
    }

    get totalSupply() {
        return this._totalSupply
    }
}

abstract class ApprovedTokenVOBase {
    private readonly _contractSummary: ContractSummaryVO
    private readonly _spenderAccount: SpenderAccountVO
    private readonly _timestamp: Date

    constructor(private readonly _rawData: ApprovedTokenBase) {
        this._contractSummary = new ContractSummaryVO(_rawData.contractSummary)
        this._spenderAccount = new SpenderAccountVO(_rawData.spenderAccount)
        this._timestamp = new Date(_rawData.timestamp)
    }

    get blockNumber() {
        return this._rawData.blockNumber
    }

    get txHash() {
        return this._rawData.transactionHash
    }

    get contractSummary() {
        return this._contractSummary
    }

    get spenderAccount() {
        return this._spenderAccount
    }

    get approvedTokenId() {
        return this._rawData.approvedTokenId || ''
    }

    get timestamp() {
        return this._timestamp
    }
}

const UNLIMITED_THRESHOLD = new BigNumber(
    '115339776388732929035197660848497720713218148788040405586178452820382218977280',
)

export class ApprovedTokenVO extends ApprovedTokenVOBase {
    private readonly _approvedAmount: BigNumber
    private readonly _approvedAmountForCompare: BigNumber

    constructor(private readonly _rawDataToken: ApprovedToken) {
        super(_rawDataToken)
        this._approvedAmount = new BigNumber(_rawDataToken.approvedAmount)
        this._approvedAmountForCompare = new BigNumber(_rawDataToken.approvedAmount.replace('.', ''))
    }

    get approvedAmount() {
        return this._approvedAmount
    }

    get isUnlimitedApproved() {
        return this._approvedAmountForCompare.comparedTo(UNLIMITED_THRESHOLD) > 0
    }
}

export class ApprovedNftVO extends ApprovedTokenVOBase {
    constructor(private readonly _rawDataNft: ApprovedNft) {
        super(_rawDataNft)
    }

    get approvedAll() {
        return this._rawDataNft.approvedAll
    }
}
