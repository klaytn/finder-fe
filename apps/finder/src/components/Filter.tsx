import { useRef } from 'react'
import styled from 'styled-components'

import { colors, ContextMenu, ContextMenuItem, FilterIcon, typos, useRerenderOnScroll } from '@klaytn/slush'

import { getThemeColor } from '../functions/colorMap'
import { useFinderThemeColor } from '../hooks/useFinderThemeColor'
import { useToggle } from '../hooks/useToggle'

interface FilterProps {
    title: string
    items: ContextMenuItem[]
    selectedItem?: ContextMenuItem
    onSelect(item: ContextMenuItem): void
}

const Filter = ({ title, items, onSelect, selectedItem }: FilterProps) => {
    const filterIconColor = useFinderThemeColor(colors.white)
    const toggleState = useToggle()
    useRerenderOnScroll(toggleState.isShow)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const clientRect = buttonRef.current?.getClientRects()
    const left = clientRect?.[0]?.left ?? 0
    const top = (clientRect?.[0]?.bottom ?? 0) + 10

    if (items.length === 0) {
        return <>{title}</>
    }

    return (
        <>
            <FilterButton ref={buttonRef} onClick={toggleState.on}>
                {selectedItem?.label || title}
                <FilterIcon size={16} color={filterIconColor} />
            </FilterButton>
            <ContextMenu
                items={items}
                show={toggleState.isShow}
                left={left}
                top={top}
                onClose={toggleState.off}
                width={200}
                shadow="blue.600.15%"
                onSelect={onSelect}
                maxHeight={400}
            />
        </>
    )
}

const FilterButton = styled.button`
    background: transparent;
    margin: 0;
    padding: 0;
    border: none;
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.white)};
    display: flex;
    cursor: pointer;
    align-items: left;
    text-align: left;
    justify-content: baseline;
    gap: 10px;
    width: 100%;
`

export default Filter
