import { InputDataResponse } from '../api/transaction'

export class InputDataVO {
    constructor(private readonly _rawData: InputDataResponse) {}

    get originalValue() {
        return this._rawData.originalValue
    }

    get decodedValue() {
        return this._rawData.decodedValue
    }

    get formattedDecodedValue() {
        const { decodedValue } = this

        if (!decodedValue) {
            return this.originalValue
        }

        const result: string[] = []

        result.push(`function ${decodedValue.signature}`)
        result.push('')
        result.push(`Method ID : ${decodedValue.methodId}`)
        decodedValue.parameters.forEach(({ type, value }, index) => {
            result.push(`[${index}] ${type} : ${value}`)
        })

        return result.join('\n')
    }

    get uft8Value() {
        return this._rawData.utf8Value
    }

    get methodName() {
        const { signature, methodId } = this.decodedValue || {}

        if (signature) {
            const [, methodName] = /^([^(]+)/.exec(signature) || []
            return methodName || ''
        }

        return methodId || ''
    }
}
