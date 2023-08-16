import QRCode from 'qrcode'
import { useCallback, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { CameraNormalIcon, colors, Dialog, Text, typos } from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useTimer from '../../../hooks/useTimer'
import { useWalletManager } from '../../../hooks/useWalletManager'
import { walletKlipRequestKeyState } from '../../../states/wallet'

const KLIP_QR_CODE_URL = 'https://klipwallet.com/?target=/a2a'

const DialogOverride = {
    width: 320,
    padding: '8px 24px 24px 24px',
}

export const KlipQRCodePopup = () => {
    const iconColor = useFinderThemeColor(colors.white)
    const requestKey = useRecoilValue(walletKlipRequestKeyState)
    const { walletManager } = useWalletManager()
    const now = useTimer()

    const handleClose = useCallback(() => {
        walletManager.clearRequestKey()
    }, [walletManager])

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const leftSec = requestKey.expirationTime === 0 ? 1 : Math.floor((requestKey.expirationTime * 1000 - now) / 1000)
    const isShow = !!requestKey.key && leftSec > 0

    useEffect(() => {
        if (!requestKey.key || !canvasRef.current) {
            return
        }

        QRCode.toCanvas(canvasRef.current, `${KLIP_QR_CODE_URL}?request_key=${requestKey.key}`, {
            margin: 2.5,
            width: 188,
        })
    }, [requestKey.key])

    return (
        <Dialog title="" show={isShow} onClose={handleClose} override={DialogOverride}>
            <Container>
                <TopContainer>
                    <CameraNormalIcon size={64} color={iconColor} />
                    <Title>Scan the QR Code</Title>
                    <Description>
                        Please scan the QR code with
                        <br />a QR code reader or KakaoTalk app.
                    </Description>
                </TopContainer>

                <QRCodeContainer>
                    <QRCodeCanvas ref={canvasRef} />
                    <LeftSecRow>
                        <LeftSec>{leftSec}</LeftSec>
                        seconds left
                    </LeftSecRow>
                </QRCodeContainer>
            </Container>
        </Dialog>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
`

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
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

const Description = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${getThemeColor(colors.black[300])};
    ${typos.suit['14.18_400']};
`

const QRCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 12px;
    margin-bottom: 12px;
`

const QRCodeCanvas = styled.canvas`
    width: 188px;
    height: 188px;
    background-color: ${colors.white};
    border: 1px solid ${colors.black[300]};
`

const LeftSecRow = styled.div`
    color: ${getThemeColor(colors.black[400])};
    ${typos.suit['14.18_400']};
`

const LeftSec = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.red[500],
        typo: typos.suit['14.18_400'],
    }),
)`
    margin-right: 4px;
`
