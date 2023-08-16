import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { memoize, singletonResolver } from '@klaytn/slush'

import { useConfig } from '../context/configProvider'
import {
    chainIdState,
    KlipRequestKey,
    selectedAddressState,
    statusState,
    typeState,
    walletKlipRequestKeyState,
    WalletType,
} from '../states/wallet'
import { ValueObserver } from '../utils/observableValue'
import { WalletStatus } from '../utils/wallet/wallet'
import { WalletManager } from '../utils/wallet/walletManager'

const getWalletManager = memoize((network: string) => new WalletManager(network), singletonResolver)

let isInit = false

const initWalletManager = (
    walletManager: WalletManager,
    setStatus: (status: WalletStatus) => void,
    setType: (type: WalletType) => void,
    setSelectedAddress: (selectedAddress: string) => void,
    setChainId: (chainId: number) => void,
    setRequestKey: (requestKey: KlipRequestKey) => void,
) => {
    if (isInit) {
        return
    }

    isInit = true
    walletManager.observeStatus(new ValueObserver(setStatus))
    walletManager.observeType(new ValueObserver(setType))
    walletManager.observeSelectedAddress(new ValueObserver(setSelectedAddress))
    walletManager.observeChainId(new ValueObserver(setChainId))
    walletManager.observeRequestKey(new ValueObserver(setRequestKey))
}

export function useWalletManager() {
    const { network } = useConfig()
    const walletManager = getWalletManager(network)

    const [status, setStatus] = useRecoilState(statusState)
    const [type, setType] = useRecoilState(typeState)
    const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressState)
    const [chainId, setChainId] = useRecoilState(chainIdState)
    const [requestKey, setRequestKey] = useRecoilState(walletKlipRequestKeyState)

    useEffect(() => {
        initWalletManager(walletManager, setStatus, setType, setSelectedAddress, setChainId, setRequestKey)
    }, [walletManager, setStatus, setType, setSelectedAddress, setChainId, setRequestKey])

    return {
        walletManager,
        status,
        isConnected: status === 'connected',
        type,
        selectedAddress,
        chainId,
        requestKey,
    }
}
