import { EventEmitter } from 'events'

import type Caver from 'caver-js'

type On = typeof EventEmitter.prototype.on
type RemoveListener = typeof EventEmitter.prototype.removeListener

interface Dcent {
    isEnabled(): boolean
    isApproved(): Promise<boolean>
    isUnlocked(): Promise<boolean>
}

interface Kaikas {
    isEnabled(): boolean
    isApproved(): Promise<boolean>
    isUnlocked(): Promise<boolean>
}

interface Klaytn {
    readonly networkVersion?: number
    readonly selectedAddress?: string

    readonly isKaikas: boolean
    readonly isDcentWallet: boolean
    readonly isTokenPocket: boolean

    autoRefreshOnNetworkChange: boolean

    enable(): Promise<string[]>
    isConnected(): boolean
    supportsSubscriptions(): boolean

    sendAsync<T>(payload: JsonRpcRequest<T>, callback: () => void): void
    send<T>(payload: JsonRpcRequest<T>, callback: () => void): void
    request<T>(payload: JsonRpcRequest<T>, callback: () => void): void

    readonly on: on
    readonly removeListener: RemoveListener

    _dcent: Dcent
    _kaikas: Kaikas
}

export declare global {
    interface Window {
        klaytn?: Klaytn
        caver?: Caver
    }
}
