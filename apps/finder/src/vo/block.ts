import BigNumber from 'bignumber.js'

import { Block, BlockCommittee, BlockCommitteeAddress, BlockResponse } from '../api/block'
import { createVoIfExist } from '../functions/Functions'
import { GenesisBlock } from '../variants/resource'

export class BlockListItemVO {
    constructor(private readonly _rawData: Block) {}

    get id() {
        return new BigNumber(this._rawData.blockId)
    }

    get datetime() {
        return new Date(this._rawData.datetime)
    }

    get rewardKlay() {
        return new BigNumber(this._rawData.rewardKlay)
    }

    get size() {
        return this._rawData.blockSize
    }

    get proposer() {
        return this._rawData.blockProposer
    }

    get label() {
        return this._rawData.blockProposerLabel
    }

    get totalTransactionCount() {
        return this._rawData.totalTransactionCount
    }

    get displayName() {
        return this.label || this.proposer
    }

    get baseFeePerGas() {
        return new BigNumber(this._rawData.baseFeePerGas)
    }

    get burntFees() {
        if (this._rawData.burntFees !== undefined) {
            return new BigNumber(this._rawData.burntFees)
        }
    }
}

export class BlockVO {
    static from({ blockSize, datetime, hash, proposerNames }: GenesisBlock) {
        return new BlockVO({
            blockId: 0,
            blockReward: {
                mintedKlay: '0',
                transactionFee: '0',
                totalFee: '0',
            },
            blockSize,
            blockCommittee: {
                blockProposer: { address: '', label: proposerNames },
                validators: [],
            },
            datetime,
            hash,
            parentHash: '',
            totalTransactionCount: 0,
            baseFeePerGas: '0',
        })
    }

    readonly id = new BigNumber(this._rawData.blockId)

    readonly datetime = new Date(this._rawData.datetime)

    readonly mintedRewards = new BigNumber(this._rawData.blockReward.mintedKlay)

    readonly totalFee = new BigNumber(this._rawData.blockReward.totalFee)

    readonly burntFee = new BigNumber(this._rawData.blockReward.burntFee || 0)

    readonly transactionFee = new BigNumber(this._rawData.blockReward.transactionFee)

    readonly committee = new BlockCommitteeVO(this._rawData.blockCommittee)

    readonly baseFeePerGas = new BigNumber(this._rawData.baseFeePerGas)

    readonly burntFees = createVoIfExist(this._rawData.burntFees, BigNumber)

    constructor(private readonly _rawData: BlockResponse) {}

    get hash() {
        return this._rawData.hash
    }

    get parentHash() {
        return this._rawData.parentHash
    }

    get size() {
        return this._rawData.blockSize
    }

    get totalTransactionCount() {
        return this._rawData.totalTransactionCount
    }

    get totalRewards() {
        return this.mintedRewards.plus(this.totalFee).minus(this.burntFee)
    }

    get isGenesisBlock() {
        return this._rawData.blockId === 0
    }

    get hasValidators() {
        return this.committee.validators.length > 0
    }
}

export class BlockCommitteeVO {
    constructor(private readonly _rawData: BlockCommittee) {}

    get blockProposer() {
        return new BlockCommitteeAddressVO(this._rawData.blockProposer)
    }

    get validators() {
        return this._rawData.validators.map((validator) => new BlockCommitteeAddressVO(validator))
    }
}

export class BlockCommitteeAddressVO {
    constructor(private readonly _rawData: BlockCommitteeAddress) {}

    get address() {
        return this._rawData.address
    }

    get label() {
        return this._rawData.label
    }

    get displayName() {
        return this.label || this.address
    }
}
