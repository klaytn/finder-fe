import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { ArrowLeftIcon, Button, ChevronRightIcon, colors, typos } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { useWalletConnectPopup } from '../walletConnectPopup'

const Disconnected = () => {
    const { open } = useWalletConnectPopup()
    const navigate = useNavigate()

    const handleBack = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        <OuterContainer>
            <Container>
                <Title>Please Connect a Wallet</Title>
                <Desc>
                    To access to the My Page on KlaytnFinder,
                    <br />
                    you need to connect a wallet.
                </Desc>
                <ConnectButton rightIcon={ChevronRightIcon} onClick={open}>
                    Connect a Wallet
                </ConnectButton>
                <BackButton leftIcon={ArrowLeftIcon} buttonType="forth" onClick={handleBack}>
                    Back
                </BackButton>
            </Container>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 379px;
    gap: 16px;
    align-items: center;
`

const Title = styled.div`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['32.44_900']};
    text-align: center;
`

const Desc = styled.div`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['20.28_400']};
    margin-bottom: 20px;
    text-align: center;
`

const ConnectButton = styled(Button)`
    width: 313px;
`

const BackButton = styled(Button)`
    width: 313px;
`

export default Disconnected
