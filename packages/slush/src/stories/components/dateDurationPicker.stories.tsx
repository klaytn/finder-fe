/* eslint-disable react/prop-types */

import { ComponentMeta } from '@storybook/react'
import { differenceInDays, format, isValid, sub } from 'date-fns'
import { ChangeEvent, KeyboardEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { Box } from '../../components/box'
import DateDurationPickerComponent, {
    DateRange,
    OptionPanelType,
} from '../../components/dateDurationPicker/dateDurationPicker'
import FormText from '../../components/formtext'
import { CalendarNormalIcon } from '../../components/icon'
import { Input } from '../../components/input'
import Popover from '../../components/popover'
import { useToggle } from '../../hooks/useToggle'
import { flexs } from '../../styles/flex'
import { isInDateRange, isSameOrAfter } from '../../utils/dateHelper'

const metaData: ComponentMeta<typeof DateDurationPickerComponent> = {
    title: 'Components/DateDurationPicker',
    component: DateDurationPickerComponent,
    argTypes: {
        dual: {
            default: false,
            type: 'boolean',
        },
        direction: {
            default: 'vertical',
            options: ['vertical', 'horizontal'],
            control: {
                type: 'radio',
            },
        },
        disableCustomDateButton: {
            default: false,
            type: 'boolean',
        },
        showDateDurationPicker: {
            default: false,
            type: 'boolean',
        },
        disableResetButton: {
            default: false,
            type: 'boolean',
        },
        period: {
            defaultValue: 12,
            type: 'number',
        },
    },
}
export default metaData

const OPTION_PANELS: OptionPanelType[] = [
    {
        text: 'All',
        duration: 'none',
        period: 0,
    },
    {
        text: 'Today',
        duration: 'days',
        period: 0,
    },
    {
        text: '1 week',
        duration: 'weeks',
        period: 1,
    },
    {
        text: '1 month',
        duration: 'months',
        period: 1,
    },
    {
        text: '3 months',
        duration: 'months',
        period: 3,
    },
    {
        text: '6 months',
        duration: 'months',
        period: 6,
    },
    {
        text: '1 year',
        duration: 'years',
        period: 1,
    },
]

const DEFAULT_PANEL = OPTION_PANELS[0]

enum VALIDATION_TYPE {
    VALID,
    WRONG_DATE,
    OUT_OF_RANGE,
    OUT_OF_TODAY,
}

const INVALID_MESSAGES = {
    [VALIDATION_TYPE.VALID]: '',
    [VALIDATION_TYPE.WRONG_DATE]: 'Please enter a vaild date.',
    [VALIDATION_TYPE.OUT_OF_RANGE]: 'You can search only the history of the last 1 year.',
    [VALIDATION_TYPE.OUT_OF_TODAY]: 'You can search up to today’s date.',
}

export const DateDurationPicker = ({
    dual,
    direction,
    disableCustomDateButton,
    showDateDurationPicker: showDateDurationPicker,
    disableResetButton,
    period,
}: Parameters<typeof DateDurationPickerComponent>[0]) => {
    const [dateRange, setDateRange] = useState<DateRange>([null, null])
    const [selectedPanel, setSelectedPanel] = useState<OptionPanelType | null>(null)
    const [value, setValue] = useState('')
    const [formValid, setFormValid] = useState(VALIDATION_TYPE.VALID)

    const handleChangeDate = (dateRange: DateRange) => {
        setDateRange(dateRange)
        setValue(getDateRangeString(dateRange))
    }

    const minDate = sub(new Date(), {
        months: 12,
    })
    const maxDate = new Date()

    const handleSelectPanel = (dateRange: DateRange, optionPanel: OptionPanelType) => {
        setSelectedPanel(optionPanel)
    }

    const isStartToSelect = useMemo(() => dateRange.some((date) => !!date), [dateRange])

    const formatDate = (date: Date | null) => (date ? format(date, 'yyyy.MM.dd') : '')

    const {
        popover: { color },
    } = useTheme()

    const getDateRangeString = useCallback((dateRange) => {
        const [startDate, endDate] = dateRange
        if (!startDate && !endDate) {
            return ''
        }
        return `${formatDate(startDate)} - ${formatDate(endDate)}`
    }, [])

    useEffect(() => {
        isStartToSelect && setValue(getDateRangeString(dateRange))
    }, [isStartToSelect, getDateRangeString, dateRange])

    const handleOpenPopover = useCallback(() => {
        if (formValid !== VALIDATION_TYPE.VALID) {
            setDateRange([null, null])
            return
        }
        if (value) {
            const [fromDate, toDate] = value.split('-').map((v) => v.trim())
            const newDateRange: DateRange = [null, null]
            if (checkFormat(fromDate)) {
                newDateRange[0] = new Date(fromDate)
            }
            if (checkFormat(toDate)) {
                newDateRange[1] = new Date(toDate)
            }
            setDateRange(newDateRange)
            setSelectedPanel(null)
        } else {
            setDateRange([null, null])
            setSelectedPanel(DEFAULT_PANEL)
        }
    }, [value, formValid])

    /**
     * check validation of input's value
     */
    useEffect(() => {
        const [fromDate, toDate] = value.split('-').map((v) => v.trim())

        if (checkFormat(fromDate) && !isInDateRange([minDate, maxDate], new Date(fromDate))) {
            setFormValid(VALIDATION_TYPE.OUT_OF_RANGE)
            return
        }
        if (checkFormat(toDate) && !isInDateRange([minDate, maxDate], new Date(toDate))) {
            setFormValid(VALIDATION_TYPE.OUT_OF_TODAY)
            return
        }

        if (checkFormat(fromDate) && !isValid(new Date(fromDate))) {
            setFormValid(VALIDATION_TYPE.WRONG_DATE)
            return
        }
        if (checkFormat(toDate) && !isValid(new Date(toDate))) {
            setFormValid(VALIDATION_TYPE.WRONG_DATE)
            return
        }

        if (checkFormat(fromDate) && checkFormat(toDate)) {
            const startDate = new Date(fromDate)
            const endDate = new Date(toDate)
            if (!isSameOrAfter(endDate, startDate)) {
                setFormValid(VALIDATION_TYPE.WRONG_DATE)
                return
            }
            if (Math.abs(differenceInDays(startDate, endDate)) > 365) {
                setFormValid(VALIDATION_TYPE.OUT_OF_RANGE)
                return
            }
        }

        setFormValid(VALIDATION_TYPE.VALID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Backspace') {
            const { value, selectionStart, selectionEnd } = e.target as HTMLInputElement

            const DATE_SEPERATOR = '.'

            const isOneCharaterDelete = selectionStart === selectionEnd

            if (isOneCharaterDelete && value[value.length - 1] === DATE_SEPERATOR) {
                setValue(value.substring(0, value.length - 1))
            }
            if (isOneCharaterDelete && value[value.length - 1] === ' ' && value[value.length - 2] === '-') {
                setValue(value.substring(0, value.length - 3))
            }
        }
    }

    const convertToDateFormat = (value: string) => {
        const YEAR_LENGTH = 4
        const MONTH_LENGTH = 6
        const DATE_LENGTH = 8

        const numberValue = value.split('.').join('')
        if (numberValue.length < YEAR_LENGTH) {
            return value
        } else if (numberValue.length >= YEAR_LENGTH && numberValue.length < MONTH_LENGTH) {
            const year = numberValue.substring(0, YEAR_LENGTH)
            const rest = numberValue.substring(YEAR_LENGTH, numberValue.length)

            return `${year}.${rest}`
        } else if (numberValue.length >= MONTH_LENGTH && numberValue.length <= DATE_LENGTH) {
            const year = numberValue.substring(0, YEAR_LENGTH)
            const month = numberValue.substring(YEAR_LENGTH, MONTH_LENGTH)
            const date = numberValue.substring(MONTH_LENGTH, numberValue.length)

            return `${year}.${month}.${date}`
        }
        return value
    }

    const checkFormat = (value: string) => {
        const dateFormatExp = /^([0-9]{4})\.([0-9]{2})\.([0-9]{2})$/g
        return dateFormatExp.test(value)
    }

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        const numberValue = value.replace(/[^0-9.-]/g, '')
        const [leftValue, rightValue] = numberValue.split('-').map((v) => v.trim())

        if (checkFormat(leftValue)) {
            if (rightValue) {
                const endDate = convertToDateFormat(rightValue)
                setValue(`${leftValue} - ${endDate}`)
            } else {
                setValue(`${leftValue} - `)
            }
        } else {
            const startDate = convertToDateFormat(leftValue)
            setValue(startDate)
        }
    }

    const isFormValid = formValid === VALIDATION_TYPE.VALID

    const { isShow, toggle } = useToggle(false)

    return (
        <Container>
            <Popover isShow={isShow} openPopover={toggle} onOpen={handleOpenPopover}>
                <Popover.Trigger isShow={isShow}>
                    <Input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="please select date"
                        leftIcon={CalendarNormalIcon}
                        iconSize={20}
                        iconColor={color}
                        style={{
                            color,
                            width: '180px',
                            padding: 0,
                        }}
                        outerStyle={{
                            padding: '12px',
                        }}
                        valid={isFormValid}
                        pattern="[0-9]+"
                    />
                </Popover.Trigger>
                <FormText
                    valid={isFormValid}
                    errorMessage={INVALID_MESSAGES[formValid]}
                    width={236}
                    style={{
                        padding: '4px 0 0 0',
                    }}
                />
                <Popover.Content align="end" side="bottom" sideOffset={24}>
                    <div>
                        <DateDurationPickerComponent
                            dual={dual}
                            direction={direction}
                            optionPanels={OPTION_PANELS}
                            defaultPanel={DEFAULT_PANEL}
                            selectedPanel={selectedPanel}
                            onSelectPanel={handleSelectPanel}
                            disableCustomDateButton={disableCustomDateButton}
                            disableResetButton={disableResetButton}
                            showDateDurationPicker={showDateDurationPicker}
                            dateRange={dateRange}
                            onChange={handleChangeDate}
                            onConfirm={(dateRange) => {
                                window.alert(dateRange)
                            }}
                            period={period}
                            showPreviousMonths
                            onReset={() => {
                                setValue('')
                            }}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                </Popover.Content>
            </Popover>
        </Container>
    )
}

const Container = styled(Box)`
    ${flexs.column.end}
    flex-direction: column;
    position: relative;
    padding: 12px 24px;
`

DateDurationPicker.storyName = 'DateDurationPicker'
