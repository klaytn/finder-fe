import { atom } from 'recoil'

import { LocalStorageKey } from '../constants/storage'

export enum AccountKeyFormat {
    compressedPublicKey = 'compressedPublicKey',
    publicKey = 'publicKey',
    address = 'address',
}

const getSavedPublicKeyFormat = () => {
    const savedFormat = localStorage.getItem(LocalStorageKey.AccountKeyFormat) as AccountKeyFormat | null
    return savedFormat || AccountKeyFormat.compressedPublicKey
}

export const accountKeyFormatState = atom<AccountKeyFormat>({
    key: 'accountKeyFormat',
    default: getSavedPublicKeyFormat(),
})
