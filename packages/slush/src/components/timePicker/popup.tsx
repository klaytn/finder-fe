import { forwardRef, useCallback, useMemo } from 'react'
import styled, { css } from 'styled-components'

import useCircularList from '../../hooks/useCircularList'
import { typos } from '../../styles/typos'
import { setTransition } from '../../utils/animation'

const HOURS = Array.from({ length: 12 }).map((_, index) => index + 1)
const MINS = Array.from({ length: 60 }).map((_, index) => index)

type DateDurationPickerPopupProps = {
    isShow: boolean
    value: Date
    onChange: (value: Date) => void
}

const DateDurationPickerPopup = forwardRef<HTMLDivElement, DateDurationPickerPopupProps>(
    ({ value, onChange, isShow }, ref) => {
        const { hour, min, isAM } = useMemo(() => {
            const hour = value.getHours()
            const min = value.getMinutes()
            const isAM = hour < 12
            const halfHour = isAM ? hour : hour - 12
            const fixedHour = halfHour === 0 ? 12 : halfHour
            return {
                hour: fixedHour,
                min,
                isAM,
            }
        }, [value])

        const { containerRef: hourContainerRef, itemRefs: hourRefs } = useCircularList<
            HTMLDivElement,
            HTMLButtonElement
        >(HOURS.length, isShow, hour)
        const { containerRef: minContainerRef, itemRefs: minRefs } = useCircularList<HTMLDivElement, HTMLButtonElement>(
            MINS.length,
            isShow,
            min + 1,
        )

        const handleSelectAM = useCallback(() => {
            const nextDate = new Date(value)
            nextDate.setHours(value.getHours() - 12)
            onChange(nextDate)
        }, [value, onChange])

        const handleSelectPM = useCallback(() => {
            const nextDate = new Date(value)
            nextDate.setHours(value.getHours() + 12)
            onChange(nextDate)
        }, [value, onChange])

        const handleHourMap = useMemo(() => {
            const createHourHandler = (hour: number) => () => {
                const nextDate = new Date(value)
                if (isAM) {
                    if (hour === 12) {
                        nextDate.setHours(0)
                    } else {
                        nextDate.setHours(hour)
                    }
                } else {
                    if (hour === 12) {
                        nextDate.setHours(12)
                    } else {
                        nextDate.setHours(hour + 12)
                    }
                }
                onChange(nextDate)
            }

            return new Map(HOURS.map((value) => [value, createHourHandler(value)]))
        }, [value, onChange, isAM])

        const handleMinMap = useMemo(() => {
            const createMinHandler = (min: number) => () => {
                const nextDate = new Date(value)
                nextDate.setMinutes(min)
                onChange(nextDate)
            }

            return new Map(MINS.map((value) => [value, createMinHandler(value)]))
        }, [value, onChange])

        return (
            <Container ref={ref}>
                <PrefixColumn>
                    <Item selected={isAM} onClick={handleSelectAM}>
                        AM
                    </Item>
                    <Item selected={!isAM} onClick={handleSelectPM}>
                        PM
                    </Item>
                </PrefixColumn>
                <HourColumn ref={hourContainerRef}>
                    {HOURS.map((value, index) => (
                        <Item
                            key={value}
                            selected={hour === value}
                            onClick={handleHourMap.get(value)}
                            ref={hourRefs[index]}
                        >
                            {value.toString().padStart(2, '0')}
                        </Item>
                    ))}
                    {HOURS.map((value, index) => (
                        <Item
                            key={`${value}-next`}
                            selected={hour === value}
                            onClick={handleHourMap.get(value)}
                            ref={hourRefs[index + HOURS.length]}
                        >
                            {value.toString().padStart(2, '0')}
                        </Item>
                    ))}
                </HourColumn>
                <ColonColumn>:</ColonColumn>
                <MinColumn ref={minContainerRef}>
                    {MINS.map((value, index) => (
                        <Item
                            key={value}
                            selected={min === value}
                            onClick={handleMinMap.get(value)}
                            ref={minRefs[index]}
                        >
                            {value.toString().padStart(2, '0')}
                        </Item>
                    ))}
                    {MINS.map((value, index) => (
                        <Item
                            key={`${value}-next`}
                            selected={min === value}
                            onClick={handleMinMap.get(value)}
                            ref={minRefs[index + MINS.length]}
                        >
                            {value.toString().padStart(2, '0')}
                        </Item>
                    ))}
                </MinColumn>
            </Container>
        )
    },
)

DateDurationPickerPopup.displayName = 'DateDurationPickerPopup'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-items: stretch;
    height: 100%;
    gap: 16px;
`

const PrefixColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TimeColumStyle = css`
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
        display: none;
    }
`

const HourColumn = styled.div`
    ${TimeColumStyle};
`

const MinColumn = styled.div`
    ${TimeColumStyle};
`

const ColonColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.timePicker.text.selected};
    ${typos.suit['18.24_400']};
    margin: 0 -8px;
`

type ItemProps = {
    selected: boolean
}

const Item = styled.button.attrs<ItemProps>(({ selected }) => ({
    disabled: selected,
}))<ItemProps>`
    cursor: pointer;
    border: none;
    background: none;
    padding: 11px 14px;
    color: ${({ theme }) => theme.timePicker.text.unselected};
    border-radius: 14px;
    ${typos.suit['14.18_400']}
    ${setTransition('background-color', 'color')};

    &:disabled {
        background: ${({ theme }) => theme.timePicker.button.selected};
        color: ${({ theme }) => theme.timePicker.text.selected};
        cursor: default;
    }
`

export default DateDurationPickerPopup
