/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { add, Duration, isSameMonth, isSunday, sub } from 'date-fns'
import { isSaturday } from 'date-fns/esm'
import { useEffect, useMemo, useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled, { css, DefaultTheme } from 'styled-components'

import 'react-datepicker/dist/react-datepicker.css'
import { useToggle } from '../../hooks/useToggle'
import { colors, withAlpha } from '../../styles/colors'
import { flexs } from '../../styles/flex'
import { gridLayout } from '../../styles/grid'
import { typos } from '../../styles/typos'
import { zeroStyle } from '../../styles/zero'
import { useTheme } from '../../themes/provider'
import { noop } from '../../utils/common'
import {
    isInDateRange,
    isEndOfMonth,
    isStartOfMonth,
    isEqualDate,
    isBeforeDate,
    isAfterDate,
} from '../../utils/dateHelper'
import { Box, Flex } from '../box'
import { Button } from '../button'
import { DoneIcon } from '../icon'
import { Text } from '../text'
import AnimatedCollapse, { Size } from './animatedCollapse'
import DateItem from './dateItem'
import Header from './header'
import { ResetButton } from './panelButtons'
import SidePanel from './sidePanel'

export enum CALENDAR_NOTATION {
    DATE,
    MONTH,
    YEAR,
}

export type OptionPanelType = {
    text: string
    duration: keyof Duration | 'none'
    period: number
}

export type DateDurationPickerDirection = 'vertical' | 'horizontal'

export type DateRange = [Date | null, Date | null]

type CustomOptions = {
    disableCustomDateButton?: boolean
    disableResetButton?: boolean
    showDateDurationPicker?: boolean
}
export type DateDurationPickerProps = CustomOptions & {
    direction?: DateDurationPickerDirection
    optionPanels?: OptionPanelType[]
    dual?: boolean
    selectedPanel: OptionPanelType | null
    defaultPanel?: OptionPanelType | null
    dateRange: DateRange
    onChange(dateRange: DateRange): void
    onSelectPanel?(dateRange: DateRange, selectedPanel: OptionPanelType | null): void
    onConfirm(dateRange: DateRange): void
    period?: number | null
    minDate?: Date
    maxDate?: Date
    showPreviousMonths?: boolean
    onReset?(): void
}

function DateDurationPicker({
    direction = 'vertical',
    optionPanels = [],
    dual = false,
    disableCustomDateButton = false,
    disableResetButton = false,
    showDateDurationPicker = false,
    selectedPanel,
    defaultPanel = null,
    dateRange,
    onChange,
    onSelectPanel,
    onConfirm,
    period,
    minDate,
    maxDate,
    showPreviousMonths = false,
    onReset = noop,
}: DateDurationPickerProps) {
    const today = new Date()

    const [dateDurationPickerSize, setDateDurationPickerSize] = useState<Size>(showDateDurationPicker ? 'auto' : 0)

    const { isShow, toggle: toggleDateDurationPicker } = useToggle(showDateDurationPicker)
    const { isShow: isShowYearPicker, off: closeYearPicker, toggle: toggleYearPicker } = useToggle(false)
    const { isShow: isShowMonthPicker, off: closeMonthPicker, toggle: toggleMonthPicker } = useToggle(false)

    const [startDate, endDate] = dateRange

    const isOnSelectPanelFunction = typeof onSelectPanel === 'function'

    const calendarType = {
        horizontal: direction === 'horizontal',
        vertical: direction === 'vertical',
        dualHorizontal: direction === 'horizontal' && dual,
        dualVertical: direction === 'vertical' && dual,
    }

    // set animated height on toggle --------
    useEffect(() => {
        if (isShow) {
            setDateDurationPickerSize('auto')
        } else {
            setDateDurationPickerSize(0)
        }
    }, [isShow])

    const renderDayContents = (_dayOfMonth: number, date: Date) => {
        const isInRange = startDate && endDate ? isInDateRange([startDate, endDate], date) : false
        const isStartDate = isInRange && isEqualDate(date, startDate)
        const isEndDate = isInRange && isEqualDate(date, endDate)
        const isEndpoint = isStartDate || isEndDate
        const isSundayInRange = isInRange && isSunday(date)
        const isSaturdayInRange = isInRange && isSaturday(date)
        const isSelected = !!startDate && isEqualDate(date, startDate)
        const isTodayOnly = startDate && endDate ? isEqualDate(startDate, endDate) : false

        const selectable = (!maxDate || !isAfterDate(date, maxDate)) && (!minDate || !isBeforeDate(date, minDate))

        return (
            <DateItem
                date={date.getDate()}
                isInRange={isInRange}
                isSundayInRange={isSundayInRange}
                isSaturdayInRange={isSaturdayInRange}
                isEndpoint={isEndpoint}
                isStartDate={isStartDate}
                isEndDate={isEndDate}
                dual={dual}
                isSelected={isSelected}
                isStartOfMonth={isInRange && isStartOfMonth(date)}
                isEndOfMonth={isInRange && isEndOfMonth(date)}
                isTodayOnly={isTodayOnly}
                selectable={selectable}
            />
        )
    }

    const setDateRangeByPanel = (optionPanel: OptionPanelType) => {
        const { duration, period } = optionPanel
        const today = new Date()
        let dateRange: DateRange = [null, null]
        if (duration !== 'none') {
            const endDate = today
            const pastDate = sub(today, { [duration]: period })
            const startDate = duration === 'months' || duration === 'years' ? add(pastDate, { days: 1 }) : pastDate
            dateRange = [startDate, endDate]
        }
        onChange(dateRange)
        return dateRange
    }

    const onClickPanel = (optionPanel: OptionPanelType) => {
        const dateRange = setDateRangeByPanel(optionPanel)
        isOnSelectPanelFunction && onSelectPanel(dateRange, optionPanel)
        onSelectPanel?.(dateRange, optionPanel)
    }

    const resetDateRange = () => {
        const defaultDateRange: DateRange = [null, null]
        onChange(defaultDateRange)
        defaultPanel && setDateRangeByPanel(defaultPanel)
        onSelectPanel?.(defaultDateRange, defaultPanel)
        onReset()
    }

    const isDateRangeSelected = useMemo(() => dateRange.every((date) => !!date), [dateRange])

    // initialize selected opionPanel -------
    useEffect(() => {
        if (isDateRangeSelected) {
            return
        }
        if (!selectedPanel && !defaultPanel) {
            onChange([null, null])
            return
        }
        selectedPanel ? setDateRangeByPanel(selectedPanel) : defaultPanel && setDateRangeByPanel(defaultPanel)
    }, [])

    const getNotation = () => {
        if (isShowYearPicker) {
            return CALENDAR_NOTATION.YEAR
        }
        if (isShowMonthPicker) {
            return CALENDAR_NOTATION.MONTH
        }
        return CALENDAR_NOTATION.DATE
    }

    /**
     * Event objects in React have different types because React wraps them once and uses them, but they have the same properties that we need, so any is fine.
     * So YearPicker, MonthPicker, and DateDurationPicker will all run when the date changes.
     */
    const onPickDate = (dateRange: [Date | null, Date | null]) => {
        if (isShowYearPicker) {
            closeYearPicker()
            return
        }
        if (isShowMonthPicker) {
            closeMonthPicker()
            return
        }
        onChange(dateRange)
    }

    const calendarContainerRef = useRef<HTMLDivElement>(null)

    const [monthsShown] = useState(() => {
        if (calendarType.dualVertical && period) {
            return period + 1
        }
        return dual ? 2 : 1
    })

    const { dateDurationPicker: datepicker } = useTheme()

    const periodLimitProps = period
        ? {
              minDate,
              maxDate,
          }
        : {}

    const [monthViewState, setMonthViewState] = useState(showPreviousMonths)

    useEffect(() => {
        if (calendarType.dualVertical && startDate && !endDate) {
            setMonthViewState(false)
            return
        }
        if (calendarType.dualHorizontal && startDate && !endDate && minDate) {
            setMonthViewState(false)
            return
        }
    }, [startDate])

    return (
        <Container direction={direction} dual={dual}>
            <SidePanel
                showDateDurationPicker={isShow}
                optionPanels={optionPanels}
                disableCustomDateButton={disableCustomDateButton}
                onSelect={onClickPanel}
                selectedPanel={selectedPanel}
                onClickCustomDate={toggleDateDurationPicker}
                direction={direction}
            />
            <AnimatedCollapse
                size={dateDurationPickerSize}
                style={
                    isShow && calendarType.dualHorizontal
                        ? {
                              boxShadow: `0 0 0 transparent, 0 -1px 0 ${withAlpha(
                                  datepicker.divider,
                                  10,
                              )}, 0 0 0 transparent`,
                              paddingTop: '24px',
                          }
                        : {}
                }
            >
                <DateDurationPickerWrapper direction={direction} dual={dual} ref={calendarContainerRef}>
                    <ReactDatePicker
                        selected={today}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        isClearable
                        onChange={onPickDate}
                        inline
                        calendarContainer={(props) => (
                            <CalendarContainer show={isShow} direction={direction} dual={dual} {...props} />
                        )}
                        renderDayContents={renderDayContents}
                        renderCustomHeader={(props) => {
                            const isLeftHeader = calendarType.dualHorizontal && props.customHeaderCount === 0
                            const isRightHeader = calendarType.dualHorizontal && props.customHeaderCount === 1
                            const disabledIndicator = calendarType.dualVertical
                            const isMaximumMonth = !!maxDate && isSameMonth(maxDate, props.monthDate)
                            const isMinimumMonth = !!minDate && isSameMonth(minDate, props.monthDate)
                            const notation = getNotation()
                            const showYearIndicator = notation === CALENDAR_NOTATION.YEAR || !period
                            const showMonthIndicator = notation === CALENDAR_NOTATION.DATE
                            return (
                                <Header
                                    {...props}
                                    disabledIndicator={disabledIndicator}
                                    hideLeftIndicator={isRightHeader || isMinimumMonth}
                                    hideRightIndicator={isLeftHeader || isMaximumMonth}
                                    showYearPicker={!dual && !period}
                                    showMonthPicker={!dual && !period}
                                    onClickYearPicker={toggleYearPicker}
                                    onClickMonthPicker={toggleMonthPicker}
                                    notation={notation}
                                    showYearIndicator={showYearIndicator}
                                    showMonthIndicator={showMonthIndicator}
                                />
                            )
                        }}
                        formatWeekDay={(formattedDate) => (
                            <WeekDayText typo={typos.suit['12.16_400']} color={datepicker.calendar.weekday}>
                                {formattedDate.substring(0, 3)}
                            </WeekDayText>
                        )}
                        monthsShown={monthsShown}
                        showYearPicker={isShowYearPicker}
                        showMonthYearPicker={isShowMonthPicker}
                        showPreviousMonths={monthViewState}
                        {...periodLimitProps}
                    />
                </DateDurationPickerWrapper>
                <BottomButtonContainer justifyContent={disableResetButton ? 'flex-end' : 'space-between'}>
                    {!disableResetButton && <ResetButton onClick={resetDateRange} />}
                    <Flex
                        style={{
                            width: 'fit-content',
                        }}
                    >
                        <ApplyButton
                            leftIcon={() => <DoneIcon size={16} color={colors.white} />}
                            onClick={() => onConfirm(dateRange)}
                            style={{
                                padding: '9px 18px',
                            }}
                        >
                            <Text typo={typos.suit['14.18_400']} color={colors.white}>
                                Apply
                            </Text>
                        </ApplyButton>
                    </Flex>
                </BottomButtonContainer>
            </AnimatedCollapse>
        </Container>
    )
}

const ApplyButton = styled(Button).attrs({
    buttonType: 'first',
    size: 36,
})`
    border-radius: 12px;
`

const BottomButtonContainer = styled(Flex).attrs({
    direction: 'row',
})`
    margin-top: 24px;
    align-items: center;
`

const WeekDayText = styled(Text)`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 16px;
    text-align: center;
    line-height: 0 !important;
`

type CalendarType = {
    ['horizontal']: string
    ['vertical']: string
    ['single-horizontal']: string
    ['dual-horizontal']: string
    ['single-vertical']: string
    ['dual-vertical']: string
}

const setStyleByCalendarType =
    (style: Partial<CalendarType>) =>
    ({ direction, dual }: { direction: DateDurationPickerDirection; dual?: boolean }) => {
        if (typeof dual === 'undefined') {
            return direction === 'horizontal' ? style['horizontal'] || '' : style['vertical'] || ''
        }
        if (direction === 'horizontal' && !dual) {
            return style['horizontal'] && style['single-horizontal']
                ? `
                ${style['horizontal']}
                ${style['single-horizontal']}
            `
                : style['single-horizontal'] || style['horizontal'] || ''
        }
        if (direction === 'horizontal' && dual) {
            return style['horizontal'] && style['dual-horizontal']
                ? `
                ${style['horizontal']}
                ${style['dual-horizontal']}
            `
                : style['dual-horizontal'] || style['horizontal'] || ''
        }
        if (direction === 'vertical' && !dual) {
            return style['vertical'] && style['single-vertical']
                ? `
                ${style['vertical']}
                ${style['single-vertical']}
            `
                : style['single-vertical'] || style['vertical'] || ''
        }
        if (direction === 'vertical' && dual) {
            return style['vertical'] && style['dual-vertical']
                ? `
                ${style['vertical']}
                ${style['dual-vertical']}
            `
                : style['dual-vertical'] || style['vertical'] || ''
        }
        return ''
    }

const DateDurationPickerWrapper = styled(Box)<Required<Pick<DateDurationPickerProps, 'dual' | 'direction'>>>`
    ${setStyleByCalendarType({
        horizontal: `
                    overflow: hidden;
                    max-height: 358px;
                `,
        'dual-horizontal': `
                    width: 584px;
                `,
        'single-horizontal': `
                    width: 272px;
                `,
        vertical: `
                    width: 100%;
                    overflow: scroll;
                `,
        'dual-vertical': `
                max-height: 447px;
            `,
        'single-vertical': `
                max-height: 358px;
            `,
    })}
`

const Container = styled.div<Required<Pick<DateDurationPickerProps, 'direction' | 'dual'>>>`
    padding: 24px 24px 20px 24px;
    overflow: auto;
    ${setStyleByCalendarType({
        'dual-horizontal': `
            width: 584px;
        `,
        horizontal: `
        width: 272px;
        `,
        vertical: `
            width: 272px;
        `,
    })}
`

const definePicker = (classPrefix: string, theme: DefaultTheme) => css`
    .${classPrefix}-wrapper {
        ${gridLayout(3)}
        .${classPrefix}-text {
            ${typos.suit['14.18_400']}
            width: 86px;
            height: 38px;
            color: ${theme.dateDurationPicker.calendar.picker.color};
            line-height: 38px;
            margin-bottom: 20px;

            &:hover {
                background-color: ${theme.dateDurationPicker.calendar.picker.hoverBackground};
                border-radius: 13px;
            }

            &:nth-child(3n + 2) {
                margin: 0 7px;
            }
        }
    }
`

const CalendarContainer = styled.div<{ show: boolean } & Required<Pick<DateDurationPickerProps, 'dual' | 'direction'>>>`
    background-color: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.background};
    border: none;
    border-radius: 0;
    user-select: none;
    height: auto;
    width: 100%;

    div[class^='react-datepicker__'] {
        ${zeroStyle}
    }

    .react-datepicker__year--container {
        width: 100%;
        height: 100%;

        .react-datepicker__year {
            overflow-y: auto;
            ${({ theme }) => definePicker('react-datepicker__year', theme)}
        }
    }

    .react-datepicker__month-container {
        float: ${({ direction }) => (direction === 'vertical' ? 'none' : 'left')};

        ${setStyleByCalendarType({
            'dual-vertical': `
                    margin-bottom: 28px !important;
                `,
        })}

        &:first-child {
            ${setStyleByCalendarType({
                'dual-horizontal': `
                    margin-right: 40px;
                `,
            })}
        }

        &:last-child {
            ${setStyleByCalendarType({
                'dual-vertical': `
                    margin-bottom: 0 !important;
                `,
            })}
        }

        .react-datepicker__month,
        .react-datepicker__day-names {
            padding: 0 3px;
            &.react-datepicker__monthPicker {
                padding: 0;
                ${({ theme }) => definePicker('react-datepicker__month', theme)}
            }
        }

        .react-datepicker__day,
        .react-datepicker__day-name,
        .react-datepicker__time-name {
            width: fit-content;
            line-height: 0;
            position: relative;
        }

        .react-datepicker__day-names,
        .react-datepicker__week {
            ${flexs.row.between}
            margin-bottom: 8px !important;
        }

        .react-datepicker__week {
            &:last-child {
                margin-bottom: 0 !important;
            }

            .react-datepicker__day {
                width: 38px;
                height: 38px;

                &[class^='react-datepicker__day'],
                &:hover {
                    ${zeroStyle}
                }

                &.react-datepicker__day--outside-month {
                    visibility: ${({ dual }) => (dual ? 'hidden' : 'visible')};
                }
            }
        }
    }
`

export default DateDurationPicker
