import { ReactNode, useCallback, useMemo, useRef } from 'react'
import styled, { CSSProperties } from 'styled-components'

import { useRerenderOnScroll } from '../hooks/useRerenderOnScroll'
import { useToggle } from '../hooks/useToggle'
import { noop } from '../utils/common'
import { getContextMenuPosition } from '../utils/contextMenu'
import { ContextMenu, ContextMenuItem } from './contextMenu'
import { ChevronBottomIcon } from './icon'
import { IconProps } from './icon/type'
import { Input } from './input'

function sortContextMenuItem(item1: ContextMenuItem, item2: ContextMenuItem) {
    if (item1.sortOrder !== undefined && item2.sortOrder !== undefined) {
        return item1.sortOrder - item2.sortOrder
    }

    return item1.label < item2.label ? -1 : 1
}

type SelectProps = {
    placeholder?: string
    active?: boolean
    leftIcon?: (props: IconProps) => JSX.Element
    disabled?: boolean
    items: ContextMenuItem[]
    onChange: (...items: ContextMenuItem[]) => void
    value?: ContextMenuItem
    values?: ContextMenuItem[]
    style?: CSSProperties
    valid?: boolean
    multiple?: boolean
    hideChevronIcon?: boolean
    gap?: number
    radio?: boolean
    child?: ReactNode
    childKey?: string
    childValue?: string
    maxHeight?: number
    minHeight?: number
}

export const Select = ({
    leftIcon,
    placeholder = 'Select',
    disabled,
    items,
    onChange,
    value,
    style,
    valid = true,
    values = [],
    multiple = false,
    hideChevronIcon = false,
    gap,
    radio = false,
    child,
    childKey,
    childValue,
    maxHeight,
    minHeight,
}: SelectProps) => {
    const { isShow, off, toggle } = useToggle()
    const containerRef = useRef<HTMLDivElement | null>(null)
    useRerenderOnScroll(isShow)

    const handleClose = useCallback(
        (event: MouseEvent) => {
            if (containerRef.current?.contains?.(event.target as Node)) {
                return
            }

            off()
        },
        [off],
    )

    const handleSelect = useCallback(
        (item: ContextMenuItem) => {
            if (multiple) {
                let nextValues: ContextMenuItem[]

                if (values.includes(item)) {
                    nextValues = values.filter((i) => i !== item)
                } else {
                    nextValues = [...values, item].sort(sortContextMenuItem)
                }
                onChange(...nextValues)
            } else {
                onChange(item)
                off()
            }
        },
        [onChange, off, multiple, values],
    )

    const label = useMemo(() => {
        if (value?.value && childKey === value?.value) {
            return childValue
        }

        return value?.fullLabel || value?.label || values.map(({ fullLabel, label }) => fullLabel || label).join(', ')
    }, [value, values, childValue, childKey])

    const [parentDomRect] = containerRef.current?.getClientRects() || []
    const width = parentDomRect?.width ?? 0
    const { left, top } = getContextMenuPosition({
        position: 'left',
        contextMenuWidth: width,
        margin: 8,
        parentDomRect,
    })

    return (
        <>
            <Container ref={containerRef} onClick={toggle}>
                <Input
                    leftIcon={leftIcon}
                    value={label}
                    placeholder={placeholder}
                    disabled={disabled}
                    rightIcon={hideChevronIcon ? undefined : ChevronBottomIcon}
                    valid={valid}
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    outerStyle={{ cursor: 'pointer', ...style }}
                    hasRightDivider={false}
                    readOnly
                    gap={gap}
                />
            </Container>
            <ContextMenu
                maxHeight={maxHeight || 280}
                left={left}
                top={top}
                width={width}
                show={isShow}
                items={items}
                onClose={handleClose}
                onSelect={handleSelect}
                selectedItem={value}
                selectedItems={values}
                multiple={multiple}
                radio={radio}
                child={child}
                childKey={childKey}
                minHeight={minHeight}
            />
            <HiddenSelect value={value?.value} onChange={noop}></HiddenSelect>
        </>
    )
}

const Container = styled.div`
    cursor: pointer;
`

const HiddenSelect = styled.select`
    display: none;
`
