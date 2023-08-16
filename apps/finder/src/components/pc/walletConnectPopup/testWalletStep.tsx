import { KeyboardEvent, useCallback } from 'react'
import styled from 'styled-components'

import { Button, colors, Input, typos } from '@klaytn/slush'

import { LocalStorageKey } from '../../../constants/storage'
import { getThemeColor } from '../../../functions/colorMap'
import useFormValue from '../../../hooks/useFormValue'

export const TestWalletStep = () => {
    const [address, handleAddressChange, handleAddressClear] = useFormValue()

    const trimAddress = address.trim()

    const handleConnect = useCallback(() => {
        localStorage.setItem(LocalStorageKey.KlipAddress, trimAddress)
        localStorage.setItem(LocalStorageKey.ConnectedWalletType, 'KLIP')
        window.location.reload()
    }, [trimAddress])

    const handleKeyPress = useCallback(
        ({ key }: KeyboardEvent<HTMLInputElement>) => {
            if (key === 'Enter') {
                handleConnect()
            }
        },
        [handleConnect],
    )

    return (
        <Container>
            <Title>Input address to connect</Title>

            <FormContainer>
                <AddressInput
                    value={address}
                    onChange={handleAddressChange}
                    onClear={handleAddressClear}
                    hasClearButton
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
                <ConnectButton disabled={!address} onClick={handleConnect}>
                    Connect
                </ConnectButton>
            </FormContainer>
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

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 12px;
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

const AddressInput = styled(Input)`
    width: 250px;
`

const ConnectButton = styled(Button)`
    width: 270px;
`
