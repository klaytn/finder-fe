import BigNumber from 'bignumber.js'

import { InternalTx } from '../api/transaction'
import { getMethodName } from '../functions/Functions'
import { AddressVO } from './address'
import { InputDataVO } from './inputData'

export class InternalTransactionVO {
    readonly inputData = new InputDataVO(this._rawData.inputData)

    constructor(private readonly _rawData: InternalTx) {
        //
    }

    get type() {
        return this._rawData.type
    }

    get callId() {
        return this._rawData.callId
    }

    get from() {
        return new AddressVO(this._rawData?.from || {})
    }

    get to() {
        return new AddressVO(this._rawData?.to || {})
    }

    get amount() {
        return new BigNumber(this._rawData.amount)
    }

    get level() {
        return this._rawData.level
    }

    get input() {
        const { originalValue, decodedValue } = this._rawData.inputData
        if (!decodedValue) {
            return originalValue
        }

        const result: string[] = []

        result.push(`Function: ${decodedValue.signature}`)
        result.push('')

        result.push(`Method ID: ${decodedValue.methodId}`)
        result.push('')

        decodedValue.parameters.forEach(({ type, value }, index) => {
            result.push(`  [${index}] ${type} : ${value}`)
        })

        return result.join('\n')
    }

    get output() {
        return this._rawData.outputData || ''
    }

    get error() {
        return this._rawData.error
    }

    get errorMessage() {
        const { reverted, error } = this._rawData

        const results: string[] = []
        if (error) {
            results.push(error)
        }
        if (reverted?.contract) {
            results.push(`- contract: ${reverted.contract}`)
        }

        if (reverted?.message) {
            results.push(`- message: ${reverted.message}`)
        }

        return results.join('\n')
    }

    get hasError() {
        return !!this.error
    }

    get gasLimit() {
        return this._rawData.gasLimit
    }

    get methodName() {
        const {
            inputData: { decodedValue },
        } = this._rawData

        if (!decodedValue) {
            return ''
        }

        const { signature, methodId } = decodedValue
        return getMethodName(signature, methodId)
    }
}
