import { EventLog } from '../api/transaction'

export class EventLogVO {
    constructor(private readonly _rawData: EventLog) {}

    get contractAddress() {
        return this._rawData.contractAddress
    }

    get contractAccount() {
        return this._rawData.contractAccount
    }

    get type() {
        return this._rawData.type
    }

    get isUnknownType() {
        return this.type === 'Unknown'
    }

    get items() {
        return this._rawData.items
    }

    get isEstimated() {
        return !!this._rawData.estimatedEventLog
    }

    get signature() {
        return this.topics[0]
    }

    get topics() {
        return this._rawData.topics
    }

    get data() {
        return this._rawData.data
    }

    get txHash() {
        return this._rawData.transactionHash
    }

    get blockNumber() {
        return this._rawData.blockNumber
    }

    get hasTxInfo() {
        return !!this.txHash && !!this.blockNumber
    }
}
