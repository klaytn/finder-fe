import { Menu } from '@headlessui/react'
import { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

import { colors } from '../styles/colors'
import { shadows } from '../styles/shadows'
import { typos } from '../styles/typos'
import { useTheme } from '../themes/provider'
import { Button } from './button'
import { ChevronBottomIcon, ChevronTopIcon } from './icon'
import { Text } from './text'

type DropdownProps = {
    buttonText: ReactNode
    align: 'left' | 'right'
    children: ReactNode
    hideArrow?: boolean
    buttonStyle?: CSSProperties
    disabled?: boolean
    listWidth?: number
}

const Dropdown = ({
    buttonText,
    align,
    children,
    hideArrow = false,
    buttonStyle = {},
    disabled = false,
    listWidth,
}: DropdownProps) => {
    const { dropdown } = useTheme()
    return (
        <Menu>
            {({ open }) => (
                <>
                    <Menu.Button as="span">
                        <DropdownButton
                            disabled={disabled}
                            open={open}
                            rightIcon={
                                hideArrow
                                    ? undefined
                                    : () =>
                                          open ? (
                                              <ChevronTopIcon size={16} color={dropdown.button.color} />
                                          ) : (
                                              <ChevronBottomIcon size={16} color={dropdown.button.color} />
                                          )
                            }
                            style={buttonStyle}
                        >
                            {buttonText}
                        </DropdownButton>
                    </Menu.Button>
                    <List width={listWidth} align={align}>
                        {children}
                    </List>
                </>
            )}
        </Menu>
    )
}

const DropdownItem = ({ children }: { children: ReactNode }) => {
    return <Menu.Item disabled>{children}</Menu.Item>
}

const DropdownTitle = ({ children }: { children: ReactNode }) => {
    return (
        <Menu.Item disabled>
            <Title>{children}</Title>
        </Menu.Item>
    )
}

Dropdown.Item = DropdownItem
Dropdown.Title = DropdownTitle

const DropdownButton = styled(Button).attrs({
    buttonType: 'third',
})<{ open: boolean }>`
    border: none;
    background: ${({ theme: { dropdown } }) => dropdown.button.background};
    outline: 2px solid ${({ open }) => (open ? colors.blue[600] : 'inherit')} !important;
    &:hover,
    &:active,
    &:focus {
        border: none;
        outline: 2px solid ${colors.blue[600]};
        background-color: ${({ theme: { dropdown } }) => dropdown.button.background};
    }
    user-select: none;
    margin: 0;
`

const List = styled(Menu.Items).attrs({
    unmount: false,
})<Pick<DropdownProps, 'align'> & { children: ReactNode; width?: number }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: ${({ theme: { dropdown } }) => dropdown.background};
    width: ${({ width }) => width || 220}px;
    border-radius: 14px;
    ${({ theme: { dropdown } }) => shadows[dropdown.shadow]}
    position: absolute;
    ${({ align }) => (align === 'right' ? 'right: 0' : 'left: 0')};
    text-align: left;
    margin-top: 12px;
`

const Title = styled(Text)`
    color: ${({ theme: { dropdown } }) => dropdown.title};
    padding: 14px 24px 12px;
    ${typos.suit['14.18_400']}
    border-bottom: 1px solid ${({ theme: { dropdown } }) => dropdown.divider};
    width: calc(100% - 48px);
    user-select: none;
`

export default Dropdown
