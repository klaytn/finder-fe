import styled from 'styled-components'

import { Button, CircleiconWarningOffIcon, colors, typos } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

import { useWalletConnectPopup } from '.'

type ConnectFailStepProps = {
    onTryAgain(): void
}

export const ConnectFailStep = ({ onTryAgain }: ConnectFailStepProps) => {
    const iconColor = useFinderThemeColor(colors.red[500])
    const { close } = useWalletConnectPopup()

    return (
        <Container>
            <TopContainer>
                <CircleiconWarningOffIcon size={64} color={iconColor} />
                <Title>Failed to Connect</Title>
                <Description>
                    Sorry, there is something wrong.
                    <br />
                    Please try again.
                </Description>
            </TopContainer>
            <ButtonContainer>
                <StepButton onClick={onTryAgain} buttonType="first">
                    Try again
                </StepButton>
                <StepButton onClick={close} buttonType="second">
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
