/* eslint-disable import/no-duplicates */
import getHours from 'date-fns/esm/getHours'
import getMinutes from 'date-fns/esm/getMinutes'
import isSameMonth from 'date-fns/esm/isSameMonth'
import setHours from 'date-fns/esm/setHours'
import setMinutes from 'date-fns/esm/setMinutes'
import { forwardRef, useCallback, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'

import { typos } from '../../styles/typos'
import { setTransition } from '../../utils/animation'
import { Text } from '../text'
import { DatePickerPopupHeader } from './datePickerPopupHeader'

type DatePickerPopupProps = {
    isShow: boolean
    value: Date
    onChange: (value: Date) => void
}

export const DatePickerPopup = forwardRef<HTMLDivElement, DatePickerPopupProps>(
    ({ value, onChange }: DatePickerPopupProps, ref) => {
        const handleChange = useCallback(
            (newValue: Date) => {
                setSelectedMonth(newValue)
                onChange(newValue)
            },
            [onChange],
        )

        const handleToday = useCallback(() => {
            let today = new Date()
            today = setHours(today, getHours(value))
            today = setMinutes(today, getMinutes(value))

            setSelectedMonth(today)
            onChange(today)
        }, [onChange, value])

        const [selectedMonth, setSelectedMonth] = useState(value)

        return (
            <OuterContainer ref={ref}>
                <ReactDatePicker
                    adjustDateOnChange
                    selected={value}
                    onChange={handleChange}
                    shouldCloseOnSelect={false}
                    inline
                    renderCustomHeader={(props) => {
                        return <DatePickerPopupHeader {...props} onSelectToday={handleToday} />
                    }}
                    renderDayContents={(number, date = new Date()) => {
                        const isThisMonth = isSameMonth(date, selectedMonth)
                        return <Day isThisMonth={isThisMonth}>{number}</Day>
                    }}
                    formatWeekDay={(formattedDate) => <WeekName>{formattedDate.substring(0, 3)}</WeekName>}
                />
            </OuterContainer>
        )
    },
)

const OuterContainer = styled.div`
    display: flex;

    & > div {
        width: 272px;
        min-height: 312px;
    }

    & .react-datepicker {
        border: none;
        background: none;
        border-radius: 0;
        width: 272px;
        min-height: 312px;
    }

    & .react-datepicker__month-container {
        display: flex;
        flex-direction: column;
        width: 272px;
        min-height: 312px;
    }

    & .react-datepicker__header--custom {
        display: flex;
        flex-direction: column;
        padding: 0;
        background: none;
        border: none;
    }

    & .react-datepicker__day-names {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 31px;
        margin-bottom: 8px;
    }

    & .react-datepicker__day-name {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 38px;
    }

    & .react-datepicker__day {
        cursor: pointer;
        ${setTransition('background-color')};
    }

    & .react-datepicker__day:hover {
        background-color: ${({ theme }) => theme.datePicker.days.background.hover};
    }

    & .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.datePicker.days.background.selected} !important;
    }

    & .react-datepicker__month {
        display: flex;
        flex-direction: column;
        margin: 0;
        gap: 8px;
    }

    & .react-datepicker__week {
        display: flex;
        flex-direction: row;
        margin: 0;
        justify-content: space-between;
    }

    & .react-datepicker__day {
        display: flex;
        margin: 0;
        padding: 0;
        width: 38px;
        height: 38px;
        text-align: center;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
`

const WeekName = styled(Text).attrs(({ theme }) => ({
    typo: typos.suit['12.16_400'],
    color: theme.datePicker.weekName,
}))``

const Day = styled(Text).attrs<{ isThisMonth: boolean }>(
    ({
        theme: {
            datePicker: {
                days: { text },
            },
        },
        isThisMonth,
    }) => ({
        typo: typos.suit['14.18_400'],
        color: isThisMonth ? text.normal : text.notThisMonth,
    }),
)<{ isThisMonth: boolean }>`
    ${setTransition('color')};
`

DatePickerPopup.displayName = 'DatePickerPopup'
