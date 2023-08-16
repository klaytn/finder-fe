import { LocalStorageKey } from '../../constants/storage'
import { KlipRequestKey, SelectableWalletType, WalletType } from '../../states/wallet'
import { ObservableValue, ValueObserver } from '../observableValue'
import { DisconnectedWallet } from './disconnectedWallet'
import { KaikasWallet } from './kaikasWallet'
import { KlipWallet } from './klipWallet'
import { MetamaskWallet } from './metamaskWallet'
import { Wallet, WalletStatus } from './wallet'

const NetworkByChainId: Record<number, string> = {
    8217: 'cypress',
    1001: 'baobab',
}

export class WalletManager {
    private _observableStatus = new ObservableValue<WalletStatus>('disconnected')
    private _observableSelectedAddress = new ObservableValue('')
    private _observableRequestKey = new ObservableValue<KlipRequestKey>({
        key: '',
        expirationTime: 0,
    })
    private _observableType = new ObservableValue<WalletType>('NONE')
    private _observableChainId = new ObservableValue<number>(0)

    constructor(private readonly _network: string) {}

    private get prevConnectedType(): WalletType {
        return (localStorage.getItem(LocalStorageKey.ConnectedWalletType) || 'NONE') as WalletType
    }

    private _availableWallets = this.getAvailableWalletList()

    get status() {
        return this._observableStatus.get()
    }

    get selectedAddress() {
        return this._observableSelectedAddress.get()
    }

    get type() {
        return this._observableType.get()
    }

    get chainId() {
        return this._observableChainId.get()
    }

    get network() {
        return NetworkByChainId[this.chainId] || ''
    }

    get selectedWallet() {
        const selectedWallet = this._availableWallets.get(this.type)
        if (!selectedWallet) {
            throw new Error('type error')
        }
        return selectedWallet
    }

    get availableWalletTypes() {
        return [...this._availableWallets.keys()]
    }

    async autoConnect() {
        const { status, prevConnectedType } = this

        if (status !== 'disconnected') {
            return
        }

        if (prevConnectedType === 'NONE') {
            return
        }

        if (!(await this.isReady(prevConnectedType))) {
            return
        }

        this.selectAndConnect(prevConnectedType)
    }

    async selectAndConnect(type: SelectableWalletType) {
        if (this.status !== 'disconnected' || !this.isAvailableWalletType(type)) {
            this.disconnect()
        }

        try {
            this._observableStatus.set('connecting')

            this._observableType.set(type)
            await this.selectedWallet.connect()
            this._observableStatus.set('connected')
            localStorage.setItem(LocalStorageKey.ConnectedWalletType, type)
        } catch (err) {
            this.disconnect()
            throw err
        }
    }

    isAvailableWalletType(type: WalletType) {
        return this._availableWallets.has(type)
    }

    async isReady(type: WalletType) {
        if (!this.isAvailableWalletType(type)) {
            return false
        }

        return this._availableWallets.get(type)?.isReady() || false
    }

    disconnect() {
        try {
            this.selectedWallet.disconnect()
        } finally {
            this._observableStatus.set('disconnected')
            this._observableSelectedAddress.set('')
            this._observableType.set('NONE')
            this._observableChainId.set(0)
            localStorage.removeItem(LocalStorageKey.ConnectedWalletType)
        }
    }

    private getAvailableWalletList() {
        const result = new Map<WalletType, Wallet>()
        result.set('NONE', new DisconnectedWallet())

        const onDisconnect = () => this.disconnect()

        if (KaikasWallet.isAvailable()) {
            result.set(
                'KAIKAS',
                new KaikasWallet(
                    this._observableSelectedAddress,
                    this._observableChainId,
                    this._observableStatus,
                    onDisconnect,
                ),
            )
        }

        if (MetamaskWallet.isAvailable()) {
            result.set(
                'METAMASK',
                new MetamaskWallet(
                    this._observableSelectedAddress,
                    this._observableChainId,
                    this._observableStatus,
                    onDisconnect,
                ),
            )
        }

        if (KlipWallet.isAvailable(this._network)) {
            result.set(
                'KLIP',
                new KlipWallet(this._observableSelectedAddress, this._observableChainId, this._observableRequestKey),
            )
        }

        return result
    }

    observeStatus(observer: ValueObserver<WalletStatus>) {
        this._observableStatus.observe(observer)
    }

    observeSelectedAddress(observer: ValueObserver<string>) {
        this._observableSelectedAddress.observe(observer)
    }

    observeType(observer: ValueObserver<WalletType>) {
        this._observableType.observe(observer)
    }

    observeChainId(observer: ValueObserver<number>) {
        this._observableChainId.observe(observer)
    }

    observeRequestKey(observer: ValueObserver<KlipRequestKey>) {
        this._observableRequestKey.observe(observer)
    }

    clearRequestKey() {
        this._observableRequestKey.set({
            key: '',
            expirationTime: 0,
        })
    }
}
