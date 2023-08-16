import { useEffect } from 'react'
import styled from 'styled-components'

import { colors, ProgressInnerCircle, typos } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { toPascalCase } from '../../../functions/string'
import { useWalletManager } from '../../../hooks/useWalletManager'
import { WalletType } from '../../../states/wallet'

import { useWalletConnectPopup } from '.'

type ConnectingStepProps = {
    selectedType: WalletType
    onError(): void
    checkWrongNetwork(): boolean
}

export const ConnectingStep = ({ selectedType, onError, checkWrongNetwork }: ConnectingStepProps) => {
    const { walletManager } = useWalletManager()
    const { close } = useWalletConnectPopup()

    useEffect(() => {
        if (selectedType === 'NONE') {
            return
        }

        ;(async () => {
            try {
                await walletManager.selectAndConnect(selectedType)
                if (walletManager.status === 'connected') {
                    if (checkWrongNetwork()) {
                        close()
                    }
                } else {
                    // handled in the catch clause immediately below
                    throw new Error()
                }
            } catch {
                walletManager.disconnect()
                onError()
            }
        })()
    }, [selectedType, walletManager, onError, close, checkWrongNetwork])

    return (
        <Container>
            <ProgressContainer>
                <ProgressInnerCircle size={200} />
            </ProgressContainer>
            <Title>Connecting to {toPascalCase(selectedType)}...</Title>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    margin: 16px 0px;
`

const ProgressContainer = styled.div`
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['18.24_900']};
`
