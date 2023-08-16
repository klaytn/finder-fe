import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { Dialog } from '@klaytn/slush'

import { useConfig } from '../../../context/configProvider'
import { useWalletManager } from '../../../hooks/useWalletManager'
import { walletPopupState, WalletType } from '../../../states/wallet'
import { ConnectFailStep } from './connectFailStep'
import { ConnectingStep } from './connectingStep'
import { NotInstalledStep } from './notInstalledStep'
import { SelectWalletStep } from './selectWalletStep'
import { SwitchNetworkStep } from './switchNetworkStep'
import { TestWalletStep } from './testWalletStep'

export const useWalletConnectPopup = () => {
    const [isOpen, setIsOpen] = useRecoilState(walletPopupState)

    const open = useCallback(() => {
        setIsOpen(true)
    }, [setIsOpen])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [setIsOpen])

    return {
        isOpen,
        open,
        close,
        toggle,
    }
}

const DialogOverride = {
    width: 320,
    padding: '8px 24px 24px 24px',
}

enum WalletConnectStep {
    SelectWallet,
    Connecting,
    Error,
    NotInstalled,
    WrongNetwork,
    TestWallet,
}

export const WalletConnectPopup = () => {
    const { isOpen, close } = useWalletConnectPopup()
    const { walletManager } = useWalletManager()
    const [step, setStep] = useState(WalletConnectStep.SelectWallet)
    const [selectedType, setSelectedType] = useState<WalletType>('NONE')
    const { network } = useConfig()

    const handleSelectWallet = useCallback(
        (walletType: WalletType) => {
            setSelectedType(walletType)

            if (walletManager.isAvailableWalletType(walletType)) {
                setStep(WalletConnectStep.Connecting)
            } else {
                setStep(WalletConnectStep.NotInstalled)
            }
        },
        [walletManager],
    )

    const handleError = useCallback(() => {
        setStep(WalletConnectStep.Error)
    }, [])

    const handleGoToSelectWallet = useCallback(() => {
        setStep(WalletConnectStep.SelectWallet)
        setSelectedType('NONE')
    }, [])

    const checkWrongNetwork = useCallback(() => {
        if (network !== walletManager.network) {
            setStep(WalletConnectStep.WrongNetwork)
            return false
        }
        return true
    }, [network, walletManager])

    const handleTryAgainConnect = useCallback(async () => {
        if (checkWrongNetwork()) {
            close()
        }
    }, [checkWrongNetwork, close])

    const handleSelectTestWallet = useCallback(() => {
        setStep(WalletConnectStep.TestWallet)
    }, [])

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(WalletConnectStep.SelectWallet)
                setSelectedType('NONE')
            }, 300)
        } else {
            if (walletManager.status === 'connected' && !checkWrongNetwork()) {
                setStep(WalletConnectStep.WrongNetwork)
                setSelectedType(walletManager.type)
            }
        }
    }, [isOpen, checkWrongNetwork, walletManager])

    return (
        <Dialog show={isOpen} onClose={close} title="" override={DialogOverride}>
            {step === WalletConnectStep.SelectWallet && (
                <SelectWalletStep onSelect={handleSelectWallet} onSelectTestWallet={handleSelectTestWallet} />
            )}
            {step === WalletConnectStep.Connecting && (
                <ConnectingStep
                    selectedType={selectedType}
                    onError={handleError}
                    checkWrongNetwork={checkWrongNetwork}
                />
            )}
            {step === WalletConnectStep.NotInstalled && <NotInstalledStep selectedType={selectedType} />}
            {step === WalletConnectStep.Error && <ConnectFailStep onTryAgain={handleGoToSelectWallet} />}
            {step === WalletConnectStep.WrongNetwork && <SwitchNetworkStep onTryAgain={handleTryAgainConnect} />}
            {step === WalletConnectStep.TestWallet && <TestWalletStep />}
        </Dialog>
    )
}
