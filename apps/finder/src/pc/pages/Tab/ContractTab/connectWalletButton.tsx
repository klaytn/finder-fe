import styled, { css } from 'styled-components'

import { colors, Flex, typos } from '@klaytn/slush'

import { useWalletConnectPopup } from '../../../../components/pc/walletConnectPopup'
import { getThemeColor } from '../../../../functions/colorMap'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import { useWalletManager } from '../../../../hooks/useWalletManager'

const ConnectWalletButton = () => {
    const { walletManager, isConnected, selectedAddress } = useWalletManager()
    const { open } = useWalletConnectPopup()

    if (isConnected) {
        const zippedSelectedAddress =
            selectedAddress.slice(0, 8) +
            '...' +
            selectedAddress.slice(selectedAddress.length - 6, selectedAddress.length)
        return (
            <Container>
                <Point isConnected={isConnected} />
                Connected to Web3 [{zippedSelectedAddress}] <Divider />
                <ConnectOrDisconnectButton onClick={() => walletManager.disconnect()}>
                    Disconnect
                </ConnectOrDisconnectButton>
            </Container>
        )
    }

    return (
        <Container>
            <Point isConnected={isConnected} />
            <ConnectOrDisconnectButton onClick={open}>Connect to Web3</ConnectOrDisconnectButton>
        </Container>
    )
}

const TextStyle = css`
    color: ${getThemeColor(colors.blue[400])};
    ${typos.suit['14.18_900']};
`

const Point = styled.div<{ isConnected: boolean }>`
    width: 8px;
    height: 8px;
    background: ${getThemeColor(({ isConnected }) => (isConnected ? colors.green[600] : colors.red[600]))};
    margin-right: 4px;
    border-radius: 50%;
`

const Container = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    ${TextStyle};
    align-items: center;
`

const ConnectOrDisconnectButton = styled.button`
    ${TextStyle};
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
`

const Divider = () => {
    const color = useFinderThemeColor(colors.white)

    return (
        <DividerSvg width="2" height="20" viewBox="0 0 2 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 20L1 8.90344e-07" stroke={color} strokeOpacity="0.1" />
        </DividerSvg>
    )
}

const DividerSvg = styled.svg`
    margin: 0px 12px;
`

export default ConnectWalletButton
