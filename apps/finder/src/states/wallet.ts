import { atom } from 'recoil'

import { WalletStatus } from '../utils/wallet/wallet'

export type SelectableWalletType = 'KAIKAS' | 'METAMASK' | 'KLIP'

export type WalletType = SelectableWalletType | 'NONE'

export const statusState = atom<WalletStatus>({
    key: 'wallet:status',
    default: 'disconnected',
})

export const typeState = atom<WalletType>({
    key: 'wallet:type',
    default: 'NONE',
})

export const selectedAddressState = atom<string>({
    key: 'wallet:selectedAddress',
    default: '',
})

export const chainIdState = atom<number>({
    key: 'wallet:chainId',
    default: 0,
})

export const walletPopupState = atom({
    key: 'wallet:popup',
    default: false,
})

export type KlipRequestKey = {
    key: string
    expirationTime: number
}
export const walletKlipRequestKeyState = atom<KlipRequestKey>({
    key: 'wallet:klipRequestKey',
    default: {
        key: '',
        expirationTime: 0,
    },
})
