import { useCallback, useState } from 'react'
import styled from 'styled-components'

import { Button, CircleiconWarningOffIcon, colors, delay, ProgressInnerCircle, typos } from '@klaytn/slush'

import { useConfig } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'
import { toPascalCase } from '../../../functions/string'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

import { useWalletConnectPopup } from '.'

type SwitchNetworkStepProps = {
    onTryAgain(): void
}

export const SwitchNetworkStep = ({ onTryAgain }: SwitchNetworkStepProps) => {
    const iconColor = useFinderThemeColor(colors.yellow[500])
    const { close } = useWalletConnectPopup()
    const { network } = useConfig()
    const [isWaiting, setIsWaiting] = useState(false)

    const networkDisplay = network === 'cypress' ? `Main net(Cypress)` : toPascalCase(network)

    const handleTryAgain = useCallback(async () => {
        setIsWaiting(true)
        await delay(1000)
        setIsWaiting(false)
        onTryAgain()
    }, [onTryAgain])

    return (
        <Container>
            <TopContainer>
                <CircleiconWarningOffIcon size={64} color={iconColor} />
                <Title>
                    Please Switch
                    <br />
                    the Network
                </Title>
                <Description>
                    You are connected to wrong network.
                    <br />
                    Please switch the network
                    <br />
                    to {networkDisplay}.
                </Description>
            </TopContainer>
            <ButtonContainer>
                <Guide>Switched the network?</Guide>
                <StepButton onClick={handleTryAgain} buttonType="second" disabled={isWaiting}>
                    {isWaiting ? <ProgressInnerCircle size={50} /> : 'Try again'}
                </StepButton>
                <StepButton onClick={close} buttonType="forth">
                    Close
                </StepButton>
            </ButtonContainer>
        </Container>
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 8px;
`

const StepButton = styled(Button)`
    width: 100%;
    margin: 0;
`

const Guide = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: ${getThemeColor(colors.black[300])};
    ${typos.suit['12.16_400']};
`
