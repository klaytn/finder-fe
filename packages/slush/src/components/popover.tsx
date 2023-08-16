import * as RadixPopover from '@radix-ui/react-popover'
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'

import { colors } from '../styles/colors'
import { useTheme } from '../themes/provider'
import { noop } from '../utils/common'
import { Box } from './box'

const Popover = ({
    isShow,
    openPopover,
    children,
    onOpen = noop,
}: {
    isShow: boolean
    openPopover(): void
    children: ReactNode
    onOpen?(): void
}) => {
    useEffect(() => {
        isShow && onOpen()
    }, [isShow, onOpen])

    return (
        <RadixPopover.Root open={isShow} onOpenChange={openPopover}>
            {children}
        </RadixPopover.Root>
    )
}

const PopoverButton = ({
    isShow,
    children,
}: {
    isShow: boolean
    children: JSX.Element | JSX.Element[]
    open?: boolean
}) => {
    return (
        <RadixPopover.Trigger asChild>
            <TriggerBox open={isShow}>{children}</TriggerBox>
        </RadixPopover.Trigger>
    )
}

const TriggerBox = styled(Box)<{ open?: boolean }>`
    border-radius: 14px;
    outline: ${({ open }) => (open ? `2px solid ${colors.blue[600]}` : 'none')};
`

const PopoverContent = ({ children, ...props }: { children: ReactNode } & RadixPopover.PopoverContentProps) => {
    const {
        popover: { background, shadow, color },
    } = useTheme()
    return (
        <RadixPopover.Content portalled asChild {...props}>
            <ContentBox backgroundColor={background} shadow={shadow} color={color}>
                {children}
            </ContentBox>
        </RadixPopover.Content>
    )
}

const ContentBox = styled(Box)`
    border-radius: 14px;
    border: none;
    z-index: 1;
`

Popover.Trigger = PopoverButton
Popover.Content = PopoverContent

export default Popover
