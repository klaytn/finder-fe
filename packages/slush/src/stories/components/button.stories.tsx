import { ComponentMeta } from '@storybook/react'
import styled from 'styled-components'

import { Flex } from '../../components/box'
import { Button as ButtonComponent, ButtonSize, ButtonType } from '../../components/button'
import { ChevronRightIcon, SearchIcon } from '../../components/icon'
import { WalletButton as WalletButtonComponent } from '../../components/walletButton'
import { noop } from '../../utils/common'

const metaData: ComponentMeta<typeof ButtonComponent> = {
    title: 'Components/Button',
    component: ButtonComponent,
    argTypes: {
        children: {
            defaultValue: 'Text',
            type: 'string',
        },
    },
}
export default metaData

const types: ButtonType[] = ['first', 'second', 'third', 'forth']
const sizes: ButtonSize[] = [44, 40, 36, 32, 28]

export const Button = ({ children }: Parameters<typeof ButtonComponent>[0]) => {
    return types.map((type) =>
        sizes.map((size) => (
            <Flex key={`${type}-${size}`} style={{ margin: 10 }} justifyContent="flex-start" direction="row">
                <>
                    <ButtonComponent buttonType={type} size={size} leftIcon={SearchIcon} rightIcon={ChevronRightIcon}>
                        {children}
                    </ButtonComponent>
                    <ButtonComponent buttonType={type} size={size} disabled>
                        {children}
                    </ButtonComponent>
                    <ButtonComponent buttonType={type} size={size} leftIcon={SearchIcon} />
                </>
            </Flex>
        )),
    )
}

export const WalletButton = () => {
    const props = {
        onClick: noop,
        address: '0x19914f539b1424b1675270002bd9e4ce8e91fc21',
    }
    return (
        <Container>
            <WalletButtonComponent status="disconnected" walletIcon {...props} />
            <WalletButtonComponent status="disconnected" walletIcon {...props} disabled />
            <WalletButtonComponent status="disconnected" {...props} />
            <WalletButtonComponent status="connecting" {...props} />
            <WalletButtonComponent status="connected" {...props} />
            <WalletButtonComponent status="connected" decorator="My Page" {...props} />
        </Container>
    )
}

const Container = styled.div`
    width: 268px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
`
