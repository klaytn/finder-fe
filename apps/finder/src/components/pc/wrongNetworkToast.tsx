import { useMemo } from 'react'
import styled from 'styled-components'

import { colors, Toast, typos } from '@klaytn/slush'

import { useConfig } from '../../context/configProvider'
import { getThemeColor } from '../../functions/colorMap'
import { useWalletManager } from '../../hooks/useWalletManager'
import { useWalletConnectPopup } from './walletConnectPopup'

export const WrongNetworkToast = () => {
    const { isConnected, chainId, walletManager } = useWalletManager()
    const { network } = useConfig()
    const { isOpen } = useWalletConnectPopup()

    const isShow = useMemo(
        () => !!chainId && isConnected && walletManager.network !== network && !isOpen,
        [isConnected, chainId, walletManager, network, isOpen],
    )

    return <Toast message="" show={isShow} color="red" title="You are connected to wrong network" undo={ToastBody} />
}

const ToastBody = () => {
    const { open } = useWalletConnectPopup()

    return <DetailButton onClick={open}>more detail</DetailButton>
}

const DetailButton = styled.button`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)};
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    text-decoration: underline;
`
