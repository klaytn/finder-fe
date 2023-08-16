import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { ObservableValue } from '../observableValue'
import { Wallet, WalletStatus } from './wallet'

function getEthereum() {
    const { ethereum } = window
    if (!ethereum) {
        throw new Error('metamask is not installed')
    }

    return ethereum
}

export class MetamaskWallet implements Wallet {
    static isAvailable() {
        try {
            getEthereum()
            return true
        } catch {
            return false
        }
    }

    private _isInit = false

    async isReady() {
        const ethereum = getEthereum()
        const { _metamask } = ethereum
        const results = await Promise.all([ethereum.isConnected, _metamask.isUnlocked()])
        return results.every((result) => !!result)
    }

    private readonly web3 = new Web3(getEthereum())

    private get selectedAddress() {
        return this._observableSelectedAddress.get()
    }

    constructor(
        private readonly _observableSelectedAddress: ObservableValue<string>,
        private readonly _observableChainId: ObservableValue<number>,
        private readonly _observableStatus: ObservableValue<WalletStatus>,
        private readonly _onDisconnect: () => void,
    ) {}

    async connect() {
        this.installOnceEventListeners()
        const [selectedAddress = ''] = await (getEthereum().request?.({ method: 'eth_requestAccounts' }) || [])
        this._observableChainId.set(parseInt(getEthereum().networkVersion || '') || 0)
        this._observableSelectedAddress.set(selectedAddress)
    }

    disconnect() {
        // do nothing
    }

    sign(message: string) {
        return this.web3.eth.personal.sign(message, this.selectedAddress, '')
    }

    async executeSmartContract(jsonInterface: AbiItem, params: string[], to: string): Promise<string> {
        const { web3, selectedAddress: from } = this

        const data = web3.eth.abi.encodeFunctionCall(jsonInterface, params)
        const estimateGas = await web3.eth.estimateGas({
            from,
            data,
            to,
        })
        const gas = Math.ceil(estimateGas * 1.5).toString()

        return new Promise<string>((resolve, reject) => {
            web3.eth
                .sendTransaction({
                    from,
                    to,
                    data,
                    gas,
                })
                .on('transactionHash', (transactionHash) => {
                    resolve(transactionHash)
                })
                .on('error', (error) => {
                    reject(error)
                })
        })
    }

    private installOnceEventListeners() {
        if (this._isInit) {
            return
        }

        this._isInit = true

        const ethereum = getEthereum()
        ethereum.on('accountsChanged', (accounts?: string[]) => {
            if (!accounts?.length || !accounts?.[0]?.length) {
                this._onDisconnect()
            }
            if (this._observableStatus.get() === 'connected') {
                this._observableSelectedAddress.set(accounts?.[0] || '')
            }
        })

        ethereum.on('chainChanged', (chainId: string) => {
            if (this._observableStatus.get() === 'connected') {
                this._observableChainId.set(parseInt(chainId, 16))
            }
        })
    }
}
