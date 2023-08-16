import { HTMLAttributes, ReactNode, useMemo } from 'react'
import styled, { css } from 'styled-components'

import { Button } from './button'
import { VerticalDivider } from './divider'
import { ChevronRightIcon, ConfirmNormalIcon, Icon, WalletIcon } from './icon'
import { ProgressInnerCircle } from './progress/progressCircle'

type WalletButtonStatus = 'disconnected' | 'connecting' | 'connected'

const getLeftIcon = (walletIcon: boolean, status: WalletButtonStatus, connectedWalletIcon?: Icon) => {
    switch (status) {
        case 'disconnected': {
            if (walletIcon) {
                return WalletIcon
            }
            return
        }

        case 'connected':
            return connectedWalletIcon || ConfirmNormalIcon

        default:
            return
    }
}

const getRightIcon = (status: WalletButtonStatus) => {
    switch (status) {
        case 'disconnected':
            return ChevronRightIcon
        default:
            return
    }
}

const getContents = (status: WalletButtonStatus, address: string) => {
    switch (status) {
        case 'disconnected':
            return 'Connect Wallet'
        case 'connecting':
            return (
                <ContentsContainer>
                    Connecting... <ProgressInnerCircle size={40} />
                </ContentsContainer>
            )
        case 'connected':
            return address.slice(0, 8) + '...' + address.slice(address.length - 4, address.length)
    }
}

const ContentsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: inherit;
`

type WalletButtonProps = {
    walletIcon?: boolean
    connectedWalletIcon?: Icon
    onClick: () => void
    status: WalletButtonStatus
    address?: string
    disabled?: boolean
    decorator?: ReactNode
} & HTMLAttributes<HTMLButtonElement>

export const WalletButton = ({
    onClick,
    status,
    address = '',
    connectedWalletIcon,
    walletIcon = false,
    disabled,
    decorator,
    ...buttonProps
}: WalletButtonProps) => {
    const leftIcon = useMemo(
        () => getLeftIcon(walletIcon, status, connectedWalletIcon),
        [walletIcon, status, connectedWalletIcon],
    )
    const rightIcon = useMemo(() => getRightIcon(status), [status])
    const contents = useMemo(() => getContents(status, address), [status, address])

    return (
        <CustomButton
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            onClick={onClick}
            disabled={disabled}
            size={40}
            isConnected={status === 'connected'}
            {...buttonProps}
        >
            <InnerRow>
                {contents}
                {decorator && (
                    <>
                        <VerticalDivider /> {decorator}
                    </>
                )}
            </InnerRow>
        </CustomButton>
    )
}

const CustomButton = styled(Button)<{ isConnected: boolean }>`
    margin: 0;

    ${({
        isConnected,
        theme: {
            button: { wallet, walletConnected },
        },
    }) => {
        const { background, outline, text, border } = isConnected ? walletConnected : wallet
        return css`
            background-color: ${background.normal};
            border: ${border?.normal};
            color: ${text.normal};
            fill: ${text.normal};
            outline: ${outline.normal};

            &:hover,
            &:focus {
                background-color: ${background.hover};
                border: ${border?.hover};
                color: ${text.hover};
                fill: ${text.hover};
                outline: ${outline.hover};
            }

            &:active {
                background-color: ${background.active};
                border: ${border?.active};
                color: ${text.active};
                fill: ${text.active};
            }

            &:disabled {
                background-color: ${background.disable};
                border: ${border?.disable};
                color: ${text.disable};
                fill: ${text.disable};
                outline: ${outline.normal};
            }
        `
    }}
`

const InnerRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`
