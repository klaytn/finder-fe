import { useEffect, useRef, useState } from 'react'
import styled, { css, useTheme } from 'styled-components'

import { linearGradient } from '../../styles/colors'
import { typos } from '../../styles/typos'

type DateItemProps = {
    date: number
    dual: boolean
    isInRange: boolean
    isSundayInRange: boolean
    isSaturdayInRange: boolean
    isEndpoint: boolean
    isStartDate: boolean
    isEndDate: boolean
    isSelected: boolean
    isStartOfMonth: boolean
    isEndOfMonth: boolean
    isTodayOnly: boolean
    selectable: boolean
}

function DateItem({ date, ...props }: DateItemProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const [isPrevMonthDate, setIsPrevMonthDate] = useState(false)

    const checkPrevDate = () => {
        return Array.from(ref.current?.parentElement?.classList || []).includes('react-datepicker__day--outside-month')
    }

    const itemProps = {
        isPrevDate: isPrevMonthDate,
        ...props,
    }

    const { isEndpoint } = props

    useEffect(() => {
        if (ref.current) {
            setIsPrevMonthDate(checkPrevDate())
        }
    }, [ref])

    const theme = useTheme()

    return (
        <>
            <Item theme={theme} ref={ref} {...itemProps}>
                {date}
            </Item>
            {isEndpoint && <CircleItem {...itemProps}>{date}</CircleItem>}
        </>
    )
}

const CircleItem = styled.span<Required<Omit<DateItemProps, 'date'>>>`
    position: absolute;
    top: 0;
    right: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    background-color: ${({ theme: { dateDurationPicker: datepicker }, isEndpoint, isSelected }) => {
        if (isEndpoint || isSelected) {
            return `${datepicker.calendar.range.endpoint} !important`
        }
        return datepicker.calendar.range.default
    }};
    color: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.calendar.day.color};
    ${typos.suit['14.18_400']};
    border-radius: 50%;
`

const Item = styled.span<
    {
        isPrevDate?: boolean
    } & Required<Omit<DateItemProps, 'date'>>
>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    color: ${({
        isPrevDate,
        isInRange,
        selectable,
        theme: {
            dateDurationPicker: { calendar },
        },
    }) => ((isPrevDate && !isInRange) || !selectable ? calendar.day.dim : calendar.day.color)};
    ${typos.suit['14.18_400']};

    background: ${({
        dual,
        isInRange,
        isStartOfMonth,
        isEndOfMonth,
        isSelected,
        isStartDate,
        theme: {
            dateDurationPicker: { calendar },
        },
    }) => {
        if (isStartOfMonth && dual) {
            return linearGradient(90, [
                ['transparent', 0],
                [calendar.range.default, 75],
            ])
        }

        if (isEndOfMonth && dual) {
            return linearGradient(270, [
                ['transparent', 0],
                [calendar.range.default, 35],
            ])
        }

        if (isSelected && !isStartDate) {
            return calendar.range.endpoint
        }

        return isInRange ? calendar.range.default : 'transparent'
    }};

    ${({
        isSundayInRange,
        isSaturdayInRange,
        isStartDate,
        isEndDate,
        isSelected,
        isEndpoint,
        isStartOfMonth,
        isEndOfMonth,
        isTodayOnly,
    }) => {
        if (isTodayOnly) {
            return css`
                border-radius: 50%;
            `
        }
        if (isSaturdayInRange && isStartDate) {
            return css`
                border-radius: 50%;
            `
        }
        if (isSundayInRange && isEndDate) {
            return css`
                border-radius: 50%;
            `
        }
        if (isSaturdayInRange && isEndOfMonth) {
            return css`
                border-radius: 0;
            `
        }
        if (isSundayInRange && isStartOfMonth) {
            return css`
                border-radius: 0;
            `
        }
        if (isSundayInRange || isStartDate) {
            return css`
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                border-top-left-radius: 50%;
                border-bottom-left-radius: 50%;
            `
        }
        if (isSaturdayInRange || isEndDate) {
            return css`
                border-top-right-radius: 50%;
                border-bottom-right-radius: 50%;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            `
        }
        if (isEndpoint && (isStartOfMonth || isEndOfMonth)) {
            return css`
                border-radius: 50%;
            `
        }
        if (isSelected) {
            return css`
                border-radius: 50%;
            `
        }

        return css`
            border-radius: 0;
        `
    }};

    &:hover {
        ${({
            isStartDate,
            isSaturdayInRange,
            isEndDate,
            isSundayInRange,
            isEndpoint,
            selectable,
            theme: {
                dateDurationPicker: { calendar },
            },
        }) => {
            if (!selectable) {
                return css`
                    cursor: default;
                `
            }
            if ((isStartDate && !isSaturdayInRange) || (isEndDate && !isSundayInRange)) {
                return ''
            }
            return css`
                background-color: ${isEndpoint ? calendar.range.endpoint : calendar.day.hoverBackground} !important;
                border-radius: 50%;
                background: none;
            `
        }}
    }
`

export default DateItem
