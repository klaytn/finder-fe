import { forwardRef, MouseEventHandler, ReactNode, useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { useRerenderOnScroll } from '../../hooks/useRerenderOnScroll'
import { useToggle } from '../../hooks/useToggle'
import { Shadow } from '../../styles/shadows'
import { typos } from '../../styles/typos'
import { useTheme } from '../../themes/provider'
import { setTransition } from '../../utils/animation'
import { noop } from '../../utils/common'
import { Box, Flex } from '../box'
import { Divider } from '../divider'
import { ChevronRightIcon } from '../icon'
import Radio from '../radio'
import { ContextMenuItem } from './type'

import { ContextMenu } from '.'

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

type MenuItemProps = {
    item: ContextMenuItem
    selectedItems: ContextMenuItem[]
    onSelect?: (item: ContextMenuItem) => void
    onMouseOver?: (item: ContextMenuItem) => void
    mouseOverItem?: ContextMenuItem
    shadow?: Shadow
    checkable: boolean
    radio?: boolean
    children?: ReactNode
}
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
    (
        {
            item,
            item: { isTitle, label, subItems, indent = 0, isDivider, color, icon: IconComponent },
            selectedItems,
            onSelect,
            onMouseOver,
            mouseOverItem,
            shadow = 'black.900.40%',
            checkable,
            radio = false,
            children,
        },
        ref,
    ) => {
        const { contextMenuItem } = useTheme()
        const { on, off, isShow } = useToggle()
        useRerenderOnScroll(isShow)

        useEffect(() => {
            if (mouseOverItem !== item) {
                off()
            }
        }, [mouseOverItem, off, item])

        const buttonRef = useRef<HTMLButtonElement>(null)
        const inputRef = useRef<HTMLInputElement>(null)

        const handleClose = useCallback(
            (event: MouseEvent) => {
                if (buttonRef.current?.contains?.(event.target as Node)) {
                    return
                }

                off()
            },
            [off],
        )

        const handleSelect: MouseEventHandler = useCallback(
            (event) => {
                if (item.isTitle) {
                    event.stopPropagation()
                    return
                }

                if (event.target === inputRef.current) {
                    event.stopPropagation()
                    return
                }

                const hasSubItems = !!item.subItems?.length
                if (hasSubItems) {
                    on()
                    event.stopPropagation()
                    return
                }

                onSelect?.(item)
            },
            [onSelect, item, on],
        )

        const handleSubItemSelect = (item: ContextMenuItem) => {
            off()
            onSelect?.(item)
        }

        const handleMouseOver = () => {
            onMouseOver?.(item)
            on()
        }

        const hasSubItems = !!subItems?.length
        const isSelected = selectedItems.includes(item)

        const clientRect = buttonRef.current?.getClientRects()
        const left = clientRect?.[0]?.left ?? 0
        const top = clientRect?.[0]?.top ?? 0
        const width = clientRect?.[0]?.width ?? 0

        const { icon: iconSize, margin } = MENU_ITEM_SIZE_TABLE

        if (isDivider) {
            return <Divider style={{ margin: '12px 0px' }} />
        }

        const showCheckbox = !isTitle && !hasSubItems && checkable
        const showRadio = !showCheckbox && radio

        return (
            <>
                <HiddenButton
                    ref={buttonRef}
                    tabIndex={-1}
                    onMouseDown={handleSelect}
                    isTitle={isTitle}
                    onMouseOver={handleMouseOver}
                    checkable={checkable}
                >
                    <ItemContainer
                        ref={ref}
                        direction="row"
                        isTitle={isTitle}
                        isSelected={isSelected}
                        tabIndex={0}
                        color={color}
                    >
                        {indent > 0 && <Indent indent={indent} />}
                        {showCheckbox && <Checkbox checked={isSelected} />}
                        {showRadio && <Radio checked={isSelected} onChange={noop} inputMargin={0} />}
                        <ItemTextBox hasSubItems={hasSubItems}>{children || label}</ItemTextBox>
                        {(IconComponent || hasSubItems) && (
                            <RightIconBox>
                                {IconComponent ? (
                                    <IconComponent size={iconSize} color={color || contextMenuItem.chevronRight} />
                                ) : (
                                    <ChevronRightIcon size={iconSize} color={color || contextMenuItem.chevronRight} />
                                )}
                            </RightIconBox>
                        )}
                    </ItemContainer>
                    {isTitle && <Divider style={{ marginBottom: 6 }} />}
                </HiddenButton>
                {hasSubItems && (
                    <ContextMenu
                        left={left + width + margin.subitem.left}
                        top={top + margin.subitem.top}
                        show={isShow}
                        items={subItems}
                        onClose={handleClose}
                        onSelect={handleSubItemSelect}
                        selectedItems={selectedItems}
                        mouseOverItem={mouseOverItem}
                        shadow={shadow}
                    />
                )}
            </>
        )
    },
)

MenuItem.displayName = 'MenuItem'

const HiddenButton = styled.button<{ isTitle?: boolean; checkable: boolean }>`
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    cursor: ${({ isTitle, checkable }) => (isTitle || checkable ? 'auto' : 'pointer')};
`

const ItemContainer = styled(Flex)<{ isTitle?: boolean; isSelected?: boolean; color?: string }>`
    align-items: center;
    gap: 8px;
    ${setTransition('background-color', 'color')};
    min-height: ${({ isTitle }) =>
        isTitle
            ? MENU_ITEM_SIZE_TABLE.height.title -
              MENU_ITEM_SIZE_TABLE.padding.otherwise -
              MENU_ITEM_SIZE_TABLE.padding.titleTop
            : MENU_ITEM_SIZE_TABLE.height.normal - MENU_ITEM_SIZE_TABLE.padding.otherwise * 2}px;
    padding: ${({ isTitle }) =>
            isTitle ? MENU_ITEM_SIZE_TABLE.padding.titleTop : MENU_ITEM_SIZE_TABLE.padding.otherwise}px
        ${MENU_ITEM_SIZE_TABLE.padding.otherwise}px ${MENU_ITEM_SIZE_TABLE.padding.otherwise}px
        ${MENU_ITEM_SIZE_TABLE.padding.left}px;
    color: ${({ isSelected, theme, color }) =>
        color || (isSelected ? theme.contextMenuItem.selected : theme.contextMenuItem.unselected)};
    ${({ isTitle }) => (isTitle ? MENU_ITEM_SIZE_TABLE.typo.bold : MENU_ITEM_SIZE_TABLE.typo.normal)}

    ${({ isTitle, theme }) =>
        isTitle
            ? ''
            : css`
                  &:hover {
                      background-color: ${theme.contextMenuItem.hoverBackground};
                  }
              `}
`

const Indent = styled.div<{ indent: number }>`
    width: ${({ indent }) => indent * 8}px;
    flex-grow: 0;
    flex-shrink: 0;
`

const ItemTextBox = styled(Box)<{ hasSubItems: boolean }>`
    flex-grow: 1;
    text-align: left;
    padding-right: ${({ hasSubItems }) => (hasSubItems ? undefined : `${MENU_ITEM_SIZE_TABLE.padding.noIcon}px`)};
`

type CheckboxProps = {
    checked?: boolean
}
const Checkbox = ({ checked = false }: CheckboxProps) => {
    const {
        checkbox: { checkIcon },
    } = useTheme()
    return (
        <CheckboxContainer checked={checked}>
            <CheckboxIconContainer checked={checked}>
                <CheckboxIcon color={checkIcon} />
            </CheckboxIconContainer>
        </CheckboxContainer>
    )
}

const CheckboxContainer = styled.div<{ checked: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 14px;
    ${setTransition('background-color', 'border')};
    background-color: ${({
        checked,
        theme: {
            checkbox: { background },
        },
    }) => (checked ? background.checked : background.normal)};
    border: 1px solid
        ${({
            checked,
            theme: {
                checkbox: { border },
            },
        }) => (checked ? border.checked : border.normal)};
    border-radius: 5px;
    flex-shrink: 0;
`

type CheckboxIconProps = {
    color: string
}
const CheckboxIcon = ({ color }: CheckboxIconProps) => {
    return (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9 0.5C8.72 0.5 8.47 0.61 8.29 0.79L4 5.09L1.71 2.79C1.53 2.61 1.28 2.5 1 2.5C0.45 2.5 0 2.95 0 3.5C0 3.78 0.11 4.03 0.29 4.21L3.29 7.21C3.47 7.39 3.72 7.5 4 7.5C4.28 7.5 4.53 7.39 4.71 7.21L9.71 2.21C9.89 2.03 10 1.78 10 1.5C10 0.95 9.55 0.5 9 0.5Z"
                fill={color}
            />
        </svg>
    )
}

const CheckboxIconContainer = styled.div<{ checked: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    ${setTransition('opacity')};
`

const RightIconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
