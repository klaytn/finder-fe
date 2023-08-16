import { ChangeEventHandler, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { Button, colors, ContextMenuItem, FilterIcon, Input, Select, typos } from '@klaytn/slush'

import { useEventLogType } from '../../api/common'
import { getThemeColor } from '../../functions/colorMap'
import { toPascalCase } from '../../functions/string'
import useFormValue from '../../hooks/useFormValue'
import useQuery from '../../hooks/useQuery'

const ALL_ITEM_VALUE = 'ALL_ITEM_VALUE'
const CUSTOM_ITEM_VALUE = 'CUSTOM_ITEM_VALUE'

const ALL_ITEM = { label: 'All', value: ALL_ITEM_VALUE }
const CUSTOM_ITEM = { label: '', value: CUSTOM_ITEM_VALUE }

type EventLogTypeFilterProps = {
    resetQueryList?: string[]
}

export const EventLogTypeFilter = ({ resetQueryList }: EventLogTypeFilterProps) => {
    const query = useQuery()
    const navigate = useNavigate()
    const eventLogTypes = useEventLogType()
    const selectedType = query.get('eventLogType') || ''
    const prevSelectedTypeRef = useRef('')

    const eventLogTypeList: ContextMenuItem[] = useMemo(() => {
        const list = Object.entries(eventLogTypes).map(([label, value]) => ({
            label: label === 'uri' ? 'URI' : toPascalCase(label, false),
            value,
        }))
        return [
            { label: 'General event type', isTitle: true, collapse: 'open' },
            ALL_ITEM,
            ...list,
            { label: 'Custom', isTitle: true, collapse: 'close' },
            CUSTOM_ITEM,
        ]
    }, [eventLogTypes])

    const selectedItem = useMemo(() => {
        if (!selectedType) {
            return
        }

        const result = eventLogTypeList.find((item) => item.value === selectedType)

        if (result) {
            return result
        }

        return CUSTOM_ITEM
    }, [eventLogTypeList, selectedType])

    const [customValue, onCustomValueChange, , , setCustomValue] = useFormValue()

    useEffect(() => {
        if (
            prevSelectedTypeRef.current !== selectedType &&
            selectedItem?.value === CUSTOM_ITEM_VALUE &&
            customValue !== selectedType
        ) {
            setCustomValue(selectedType)
        }

        prevSelectedTypeRef.current = selectedType
    }, [selectedItem?.value, selectedType, setCustomValue, customValue])

    const handleChange = useCallback(
        (...items: ContextMenuItem[]) => {
            const [item] = items
            if (!item?.value) {
                return
            }

            resetQueryList?.forEach((resetQuery) => {
                query.delete(resetQuery)
            })

            if (item.value === ALL_ITEM_VALUE) {
                query.delete('eventLogType')
                navigate('?' + query.toString())
            } else if (item.value === CUSTOM_ITEM_VALUE) {
                query.set('eventLogType', customValue)
                navigate('?' + query.toString())
            } else {
                query.set('eventLogType', item.value)
                navigate('?' + query.toString())
            }
        },
        [navigate, query, resetQueryList, customValue],
    )

    return (
        <EventTypeFilterContainer>
            <Select
                items={eventLogTypeList}
                value={selectedItem}
                onChange={handleChange}
                placeholder="Select event types"
                leftIcon={FilterIcon}
                childKey={CUSTOM_ITEM_VALUE}
                childValue={customValue}
                child={<CustomInputItem value={customValue} onChange={onCustomValueChange} />}
                maxHeight={312}
                minHeight={312}
            />
        </EventTypeFilterContainer>
    )
}

const EventTypeFilterContainer = styled.div`
    width: 300px;
`

type CustomInputItemProps = {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
}
const CustomInputItem = ({ value, onChange }: CustomInputItemProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (event.target === buttonRef.current || buttonRef.current?.contains(event.target as Node)) {
            return
        }

        event.stopPropagation()
    }, [])

    return (
        <CustomInputItemContainer onMouseDown={handleMouseDown}>
            <Input
                value={value}
                onChange={onChange}
                hasRightDivider={false}
                rightButton={
                    <CustomInputApplyButton ref={buttonRef} size={28}>
                        Apply
                    </CustomInputApplyButton>
                }
            />
            <CustomInputItemDesc>Enter an event type in hexacode.</CustomInputItemDesc>
        </CustomInputItemContainer>
    )
}

const CustomInputItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const CustomInputItemDesc = styled.div`
    color: ${getThemeColor(colors.black[500])};
    ${typos.suit['12.16_400']};
`

const CustomInputApplyButton = styled(Button)`
    margin: 0;
    width: 54px;
`
