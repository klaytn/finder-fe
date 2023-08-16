import { AbiItem } from 'web3-utils'

import { ObservableValue } from '../observableValue'
import { Wallet, WalletStatus } from './wallet'

function getCaver() {
    const { caver } = window
    if (!caver) {
        throw new Error('kaikas is not installed')
    }

    return caver
}

function getKlaytn() {
    const { klaytn } = window
    if (!klaytn) {
        throw new Error('kaikas is not installed')
    }

    return klaytn
}

export class KaikasWallet implements Wallet {
    static isAvailable() {
        try {
            getCaver()
            getKlaytn()
            return true
        } catch {
            return false
        }
    }

    private _isInit = false
    private _lockWatcherHandle = 0

    get selectedAddress() {
        return this._observableSelectedAddress.get()
    }

    async isReady() {
        const klaytn = getKlaytn()
        const { _kaikas } = klaytn
        const results = await Promise.all([
            _kaikas.isUnlocked(),
            _kaikas.isEnabled(),
            _kaikas.isApproved(),
            klaytn.isConnected,
        ])
        return results.every((result) => !!result)
    }

    constructor(
        private readonly _observableSelectedAddress: ObservableValue<string>,
        private readonly _observableChainId: ObservableValue<number>,
        private readonly _observableStatus: ObservableValue<WalletStatus>,
        private readonly _onDisconnect: () => void,
    ) {}

    async connect() {
        const [selectedAddress = ''] = await (getKlaytn().enable() || [])
        this.installOnceEventListeners()

        this._observableSelectedAddress.set(selectedAddress)
        this._observableChainId.set(getKlaytn().networkVersion || 0)
        this.installLockWatcher()
    }

    disconnect() {
        this.uninstallLockWatcher()
    }

    sign(message: string) {
        return getCaver().klay.sign(message, this.selectedAddress)
    }

    async executeSmartContract(jsonInterface: AbiItem, params: unknown, to: string): Promise<string> {
        const caver = getCaver()
        const { selectedAddress: from } = this

        const data = caver.abi.encodeFunctionCall(jsonInterface, params)
        const estimateGas = await caver.klay.estimateGas({
            from,
            to,
            data,
        })
        const gas = Math.ceil(estimateGas * 1.5).toString()

        return new Promise<string>((resolve, reject) => {
            caver.klay
                .sendTransaction({
                    type: 'SMART_CONTRACT_EXECUTION',
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

        const klaytn = getKlaytn()
        klaytn.on('accountsChanged', (accounts?: string[]) => {
            if (this._observableStatus.get() === 'connected') {
                this._observableSelectedAddress.set(accounts?.[0] || '')
            }
        })

        klaytn.on('networkChanged', (chainId: number) => {
            if (this._observableStatus.get() === 'connected') {
                this._observableChainId.set(chainId)
            }
        })
    }

    private installLockWatcher() {
        this._lockWatcherHandle = window.setInterval(async () => {
            const { _kaikas } = getKlaytn()
            const checkList = await Promise.all([_kaikas.isEnabled(), _kaikas.isUnlocked(), _kaikas.isApproved()])
            if (checkList.some((check) => !check)) {
                this._onDisconnect()
            }
        }, 500)
    }

    private uninstallLockWatcher() {
        if (this._lockWatcherHandle) {
            window.clearInterval(this._lockWatcherHandle)
        }
    }
}
