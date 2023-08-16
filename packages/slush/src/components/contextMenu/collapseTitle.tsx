import { forwardRef, ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'

import usePrevious from '../../hooks/usePrevious'
import { useToggle } from '../../hooks/useToggle'
import { typos } from '../../styles/typos'
import { useTheme } from '../../themes/provider'
import { setTransition } from '../../utils/animation'
import { Box, Flex } from '../box'
import { Divider } from '../divider'
import { ChevronBottomIcon, ChevronTopIcon } from '../icon'
import { ContextMenuItem } from './type'

type CollapseTitleProps = {
    item: ContextMenuItem
    children: ReactNode
}

export const CollapseTitle = forwardRef<HTMLDivElement, CollapseTitleProps>(
    ({ children, item }: CollapseTitleProps, ref) => {
        const { isShow, toggle } = useToggle(item.collapse === 'open')

        const itemsContainerRef = useRef<HTMLDivElement>(null)

        const prevIsShow = usePrevious(isShow)
        useEffect(() => {
            if (prevIsShow !== isShow && isShow) {
                itemsContainerRef.current?.firstElementChild?.scrollIntoView?.({
                    block: 'center',
                })
            }
        }, [isShow, prevIsShow])

        return (
            <Container>
                <CollapseButton ref={ref} isOpen={isShow} label={item.label} onClick={toggle} />
                <ItemsContainer ref={itemsContainerRef} isOpen={isShow}>
                    {children}
                </ItemsContainer>
            </Container>
        )
    },
)

CollapseTitle.displayName = 'CollapseTitle'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ItemsContainer = styled.div<{ isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: hidden;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    height: ${({ isOpen }) => (isOpen ? 'auto' : '0px')};
    ${setTransition('opacity')};
`

type CollapseButtonProps = {
    label: string
    isOpen: boolean
    onClick: () => void
}

const CollapseButton = forwardRef<HTMLDivElement, CollapseButtonProps>(({ label, isOpen, onClick }, ref) => {
    const { contextMenuItem } = useTheme()
    const { icon: iconSize } = MENU_ITEM_SIZE_TABLE

    const IconComponent = isOpen ? ChevronTopIcon : ChevronBottomIcon
    return (
        <HiddenButton tabIndex={-1} onClick={onClick}>
            <ItemContainer ref={ref} direction="row" tabIndex={0}>
                <ItemTextBox>{label}</ItemTextBox>
                <RightIconBox>
                    <IconComponent size={iconSize} color={contextMenuItem.chevronRight} />
                </RightIconBox>
            </ItemContainer>
            <Divider style={{ marginBottom: 6 }} />
        </HiddenButton>
    )
})

CollapseButton.displayName = 'CollapseButton'

const HiddenButton = styled.button`
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
`

const MENU_ITEM_SIZE_TABLE = {
    height: {
        normal: 44,
        title: 53,
    },
    typo: {
        bold: typos.suit['14.18_900'],
        normal: typos.suit['14.18_400'],
    },
    icon: 15,
    padding: {
        titleTop: 24,
        left: 24,
        otherwise: 14,
        noIcon: 12,
    },
    margin: {
        subitem: {
            left: 8,
            top: -15,
        },
    },
} as const

const ItemContainer = styled(Flex)<{ isTitle?: boolean; isSelected?: boolean; color?: string }>`
    align-items: center;
    gap: 8px;
    ${setTransition('background-color', 'color')};
    min-height: ${MENU_ITEM_SIZE_TABLE.height.normal - MENU_ITEM_SIZE_TABLE.padding.otherwise * 2}px;
    padding: ${MENU_ITEM_SIZE_TABLE.padding.otherwise}px ${MENU_ITEM_SIZE_TABLE.padding.otherwise}px
        ${MENU_ITEM_SIZE_TABLE.padding.otherwise}px ${MENU_ITEM_SIZE_TABLE.padding.left}px;
    color: ${({ theme, color }) => color || theme.contextMenuItem.unselected};
    ${MENU_ITEM_SIZE_TABLE.typo.normal};

    &:hover {
        background-color: ${({ theme }) => theme.contextMenuItem.hoverBackground};
    }
`

const ItemTextBox = styled(Box)`
    flex-grow: 1;
    text-align: left;
    padding-right: ${MENU_ITEM_SIZE_TABLE.padding.noIcon}px;
`

const RightIconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
