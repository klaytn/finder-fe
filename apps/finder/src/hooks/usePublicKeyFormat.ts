import { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { LocalStorageKey } from '../constants/storage'
import { AccountKeyFormat, accountKeyFormatState } from '../states/accountKey'

const AccountKeyFormatOrder = [
    AccountKeyFormat.compressedPublicKey,
    AccountKeyFormat.publicKey,
    AccountKeyFormat.address,
] as const

export const usePublicKeyFormat = () => {
    const [accountKeyFormat, setAccountKeyFormat] = useRecoilState(accountKeyFormatState)

    const nextAccountKeyFormat = useMemo(() => {
        const currentOrder = AccountKeyFormatOrder.findIndex((order) => order === accountKeyFormat)
        const nextOrder = currentOrder === 2 ? 0 : currentOrder + 1
        return AccountKeyFormatOrder[nextOrder]
    }, [accountKeyFormat])

    const toggleAccountKeyFormat = useCallback(() => {
        setAccountKeyFormat(nextAccountKeyFormat)
        localStorage.setItem(LocalStorageKey.AccountKeyFormat, nextAccountKeyFormat)
    }, [nextAccountKeyFormat, setAccountKeyFormat])

    return {
        accountKeyFormat,
        nextAccountKeyFormat,
        toggleAccountKeyFormat,
    }
}
