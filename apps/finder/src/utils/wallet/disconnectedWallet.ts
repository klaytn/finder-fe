import { Wallet } from './wallet'

export class DisconnectedWallet implements Wallet {
    async connect() {
        return
    }

    disconnect() {
        return
    }

    async isReady() {
        return false
    }

    encodeFunctionCall() {
        return ''
    }

    async estimateGas() {
        return 0
    }

    async sign() {
        return ''
    }

    async executeSmartContract() {
        return ''
    }
}
