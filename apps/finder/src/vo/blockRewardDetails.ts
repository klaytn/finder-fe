import BigNumber from 'bignumber.js'

import { BlockRewardDetails, BlockRewardDistribution, BlockRewardRecipient } from '../api/block'

export class BlockRewardDetailsVO {
    readonly minted = new BigNumber(this._rawData.minted || 0)

    readonly totalFee = new BigNumber(this._rawData.totalFee || 0)

    readonly burntFee = new BigNumber(this._rawData.burntFee || 0)

    readonly distributions: ReadonlyArray<BlockRewardDistributionVO> = this._rawData.distributions.map(
        (item) => new BlockRewardDistributionVO(item),
    )

    readonly recipients: ReadonlyArray<BlockRewardRecipientVO>

    constructor(private readonly _rawData: BlockRewardDetails) {
        const proposerDistributionAmount = new BigNumber(
            this.distributions.find((distribution) => distribution.type === 'PROPOSER')?.amount || 0,
        )
        const proposerRecipientAmount = new BigNumber(
            _rawData.recipients.find((recipient) => recipient.type === 'PROPOSER')?.amount || 0,
        )

        const proposerAlphaAmount = proposerRecipientAmount.minus(proposerDistributionAmount)

        this.recipients = _rawData.recipients.map((item) => {
            if (item.type === 'PROPOSER') {
                return new BlockRewardRecipientVO(item, proposerAlphaAmount)
            }
            return new BlockRewardRecipientVO(item)
        })
    }

    get totalRewards() {
        return this.minted.plus(this.totalFee).minus(this.burntFee)
    }

    get stakerRecipients() {
        return this.recipients.filter((recipient) => recipient.type === 'STAKER')
    }

    get proposerRecipient() {
        return this.recipients.find((recipient) => recipient.type === 'PROPOSER')
    }

    get kgfRecipient() {
        return this.recipients.find((recipient) => recipient.type === 'KGF')
    }

    get kirRecipient() {
        return this.recipients.find((recipient) => recipient.type === 'KIR')
    }

    get stakersTotalAmount() {
        return new BigNumber(this.stakerRecipients.reduce((prev, { amount }) => prev.plus(amount), new BigNumber(0)))
    }
}

export class BlockRewardDistributionVO {
    readonly amount = new BigNumber(this._rawData.amount || 0)

    constructor(private readonly _rawData: BlockRewardDistribution) {}

    get type() {
        return this._rawData.type
    }
}

export class BlockRewardRecipientVO {
    readonly amount = new BigNumber(this._rawData.amount || 0).minus(this.alpha)

    constructor(private readonly _rawData: BlockRewardRecipient, public alpha = new BigNumber(0)) {}

    get type() {
        return this._rawData.type
    }

    get address() {
        return this._rawData.address
    }

    get hasAlpha() {
        return this.alpha.gt(0)
    }

    get totalAmount() {
        return this.amount.plus(this.alpha)
    }
}
