import { GovernanceCouncil } from '../api/account'

export class GovernanceCouncilVO {
    readonly joinedAt = new Date(this._rawData.joinedAt)

    constructor(private readonly _rawData: GovernanceCouncil, private readonly _address: string) {}

    get name() {
        return this._rawData.name
    }

    get squareLink() {
        return this._rawData.squareLink
    }

    get thumbnail() {
        return this._rawData.thumbnail
    }

    get website() {
        return this._rawData.website
    }

    get nodeContracts() {
        return this._rawData.contracts.node || []
    }

    get stakingContracts() {
        return this._rawData.contracts.staking || []
    }

    get rewardContracts() {
        return this._rawData.contracts.reward || []
    }

    get isNodeContract() {
        return this.contractType === 'NODE'
    }

    get contractType() {
        if (this.stakingContracts.includes(this._address)) {
            return 'STAKING'
        }

        if (this.rewardContracts.includes(this._address)) {
            return 'REWARD'
        }

        return 'NODE'
    }
}
