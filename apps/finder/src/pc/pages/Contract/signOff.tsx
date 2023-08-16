import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { ArrowLeftIcon, Button, ChevronRightIcon, Flex } from '@klaytn/slush'

import { useWalletConnectPopup } from '../../../components/pc/walletConnectPopup'

const SignOff = () => {
    const { open } = useWalletConnectPopup()

    const navigate = useNavigate()
    const handleBack = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        <>
            <Container>
                <SignUpButton buttonType="first" onClick={open} rightIcon={ChevronRightIcon}>
                    Connect a Wallet
                </SignUpButton>
                <BackButton onClick={handleBack} leftIcon={ArrowLeftIcon} buttonType="third">
                    Back
                </BackButton>
            </Container>
        </>
    )
}

const Container = styled(Flex).attrs({
    direction: 'column',
})``

const SignUpButton = styled(Button)`
    width: 360px;
`

const BackButton = styled(Button)`
    width: 142px;
    margin-top: 180px;
`

export default SignOff
