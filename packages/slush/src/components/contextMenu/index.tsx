import { createRef, MouseEvent as ReactMouseEvent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import styled, { CSSProperties, keyframes } from 'styled-components'

import { displayNoneOnAnimationEnd, useAnimationEnd } from '../../hooks/useAnimationEnd'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { Shadow } from '../../styles/shadows'
import { Size } from '../../styles/size'
import { ZIndex } from '../../styles/zIndex'
import { useTheme } from '../../themes/provider'
import { Flex } from '../box'
import { Portal } from '../portal'
import { CollapseTitle } from './collapseTitle'
import { MenuItem } from './menuItem'
import { ContextMenuItem } from './type'

export { ContextMenuItem }

function splitItemsByCollapse(items: ContextMenuItem[]) {
    return items.reduce((result, item) => {
        const list = result.pop() || []
        if (item.isTitle && item.collapse) {
            return [...result, list, [item]]
        }

        return [...result, [...list, item]]
    }, [] as ContextMenuItem[][])
}

type ContextMenuProps = {
    show: boolean
    items: ContextMenuItem[]
    selectedItem?: ContextMenuItem
    selectedItems?: ContextMenuItem[]
    onClose: (event: MouseEvent) => void
    onSelect?: (item: ContextMenuItem) => void
    left: number
    top: number
    width?: number
    maxHeight?: number
    minHeight?: number
    mouseOverItem?: ContextMenuItem
    size?: Size
    shadow?: Shadow
    multiple?: boolean
    radio?: boolean
    child?: ReactNode
    childKey?: string
}

export const ContextMenu = ({
    items,
    show,
    onClose,
    selectedItem,
    onSelect,
    left,
    top,
    width,
    maxHeight,
    minHeight,
    mouseOverItem,
    shadow = 'black.900.40%',
    selectedItems = [],
    multiple = false,
    radio = false,
    child,
    childKey,
}: ContextMenuProps) => {
    const { contextMenu } = useTheme()
    const { ref } = useOutsideClick<HTMLDivElement>(onClose)

    const itemRefs = useMemo(() => {
        return items.map(() => createRef<HTMLDivElement>())
    }, [items])

    const [innerMouseOverItem, setMouseOverItem] = useState<ContextMenuItem>()

    const { disabled, handleAnimationEnd } = useAnimationEnd(show)

    useEffect(() => {
        if (show && selectedItem) {
            const selectedIndex = items.findIndex((item) => selectedItem === item)
            if (selectedIndex !== -1) {
                setTimeout(() => {
                    itemRefs[selectedIndex]?.current?.focus?.()
                }, 0)
            }
        }
    }, [show, items, itemRefs, selectedItem])

    const itemsByGroups = useMemo(() => splitItemsByCollapse(items), [items])

    const selectedItemsMemo = useMemo(() => {
        return selectedItem ? [selectedItem] : selectedItems
    }, [selectedItem, selectedItems])

    const handleMouseDown = useCallback(
        (event: ReactMouseEvent<HTMLDivElement>) => {
            if (multiple) {
                return
            }

            if (ref.current?.contains?.(event.target as Node)) {
                return
            }

            // React.MouseEvent and MouseEvent have different types, so we cast them as any
            // Event objects in React have different types because React wraps them once and uses them, but they have the same properties that we need, so any is fine.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClose(event as any)
        },
        [onClose, multiple, ref],
    )

    let itemRenderCount = 0

    return (
        <Portal>
            <PopupContainer
                onMouseDown={handleMouseDown}
                width={width}
                maxHeight={maxHeight}
                minHeight={minHeight}
                style={{
                    transform: `translate(${left}px, ${top}px)`,
                }}
                direction="column"
                ref={ref}
                backgroundColor={contextMenu.background}
                shadow={shadow}
                round={14}
                show={show}
                displayOnNormal={width === undefined ? 'inline-flex' : 'flex'}
                disabled={disabled}
                onAnimationEnd={handleAnimationEnd}
            >
                {itemsByGroups.map((group, groupIndex) => {
                    const [titleItem, ...subItems] = group

                    if (!titleItem) {
                        return null
                    }

                    if (titleItem.isTitle && titleItem.collapse) {
                        return (
                            <CollapseTitle
                                ref={itemRefs[itemRenderCount++]}
                                key={`${groupIndex}-title}`}
                                item={titleItem}
                            >
                                {subItems.map((item, itemIndex) => (
                                    <MenuItem
                                        shadow={shadow}
                                        ref={itemRefs[itemRenderCount++]}
                                        key={`${groupIndex}-${itemIndex}`}
                                        item={item}
                                        selectedItems={selectedItemsMemo}
                                        onSelect={onSelect}
                                        onMouseOver={setMouseOverItem}
                                        mouseOverItem={mouseOverItem || innerMouseOverItem}
                                        checkable={multiple}
                                        radio={radio}
                                    >
                                        {item.value === childKey && child}
                                    </MenuItem>
                                ))}
                            </CollapseTitle>
                        )
                    } else {
                        return group.map((item, itemIndex) => (
                            <MenuItem
                                shadow={shadow}
                                ref={itemRefs[itemRenderCount++]}
                                key={`${groupIndex}-${itemIndex}`}
                                item={item}
                                selectedItems={selectedItemsMemo}
                                onSelect={onSelect}
                                onMouseOver={setMouseOverItem}
                                mouseOverItem={mouseOverItem || innerMouseOverItem}
                                checkable={multiple}
                                radio={radio}
                            >
                                {item.value === childKey && child}
                            </MenuItem>
                        ))
                    }
                })}
            </PopupContainer>
        </Portal>
    )
}

const showIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const showOut = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`

const PopupContainer = styled(Flex)<{
    show: boolean
    width?: number
    maxHeight?: number
    minHeight?: number
    disabled: boolean
    displayOnNormal?: CSSProperties['display']
}>`
    z-index: ${ZIndex.ContextMenu};
    padding: 14px 0px;
    user-select: none;
    position: fixed;
    width: ${({ width }) => (width ? width + 'px' : undefined)};
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight + 'px' : undefined)};
    min-height: ${({ minHeight }) => (minHeight ? minHeight + 'px' : undefined)};
    overflow-x: auto;
    animation-fill-mode: forwards;
    animation: ${({ show }) => (show ? showIn : showOut)} 100ms;
    ${displayNoneOnAnimationEnd}
`
