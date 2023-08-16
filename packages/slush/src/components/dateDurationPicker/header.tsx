import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import styled from 'styled-components'

import { typos } from '../../styles/typos'
import { zeroStyle } from '../../styles/zero'
import { Box, Flex } from '../box'
import Switch from '../logic/switch'
import { Text } from '../text'
import { CALENDAR_NOTATION } from './dateDurationPicker'
import HeaderIndicator from './headerIndicator'

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export type HeaderProps = ReactDatePickerCustomHeaderProps & {
    useYearIndicator?: boolean
    useMonthIndicator?: boolean
    showYearPicker: boolean
    onClickYearPicker(): void
    onClickMonthPicker(): void
    showMonthPicker: boolean
    notation: CALENDAR_NOTATION
    disabledIndicator: boolean
    hideLeftIndicator: boolean
    hideRightIndicator: boolean
    showYearIndicator: boolean
    showMonthIndicator: boolean
}

export const Header = (props: HeaderProps) => {
    const {
        date,
        monthDate = new Date(),
        showYearPicker,
        onClickYearPicker,
        showMonthPicker,
        onClickMonthPicker,
        notation,
        disabledIndicator,
        hideLeftIndicator,
        hideRightIndicator,
        showYearIndicator,
        showMonthIndicator,
    } = props

    const seledtedMonth = date.getMonth()
    const selectedYear = date.getFullYear()
    const calendarMonth = monthDate?.getMonth()
    const calendarYear = monthDate?.getFullYear()

    const month = MONTHS[calendarMonth]

    const isMonthPickerView = notation === CALENDAR_NOTATION.MONTH

    const determineJustifyContent = () => {
        if (isMonthPickerView || disabledIndicator) {
            return 'center'
        }
        return 'space-between'
    }
    return (
        <Container direction="row" justifyContent={determineJustifyContent()}>
            <HeaderIndicator
                {...props}
                useYearIndicator={showYearIndicator}
                useMonthIndicator={showMonthIndicator}
                hideLeftIndicator={hideLeftIndicator}
                hideRightIndicator={hideRightIndicator}
                disabledIndicator={disabledIndicator}
            >
                <DateBox>
                    <Switch variable={notation}>
                        <Switch.Case value={CALENDAR_NOTATION.YEAR}>
                            <CurrentDateText minWidth={126}>
                                <Picker onClick={onClickYearPicker}>{selectedYear}</Picker>
                            </CurrentDateText>
                        </Switch.Case>
                        <Switch.Case value={CALENDAR_NOTATION.MONTH}>
                            <CurrentDateText minWidth={126}>
                                <Picker onClick={onClickMonthPicker}>{MONTHS[seledtedMonth]}</Picker>
                            </CurrentDateText>
                        </Switch.Case>
                        <Switch.Case value={CALENDAR_NOTATION.DATE}>
                            <CurrentDateText minWidth={52}>
                                {showYearPicker ? (
                                    <Picker onClick={onClickYearPicker}>{calendarYear}</Picker>
                                ) : (
                                    calendarYear
                                )}
                            </CurrentDateText>
                            <CurrentDateText minWidth={74}>
                                {showMonthPicker ? <Picker onClick={onClickMonthPicker}>{month}</Picker> : month}
                            </CurrentDateText>
                        </Switch.Case>
                    </Switch>
                </DateBox>
            </HeaderIndicator>
        </Container>
    )
}

const Picker = styled.button`
    ${zeroStyle}
    ${typos.suit['14.18_400']}
    cursor: pointer;
    width: 100%;
    height: 100%;

    &:hover {
        background-color: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.header.hoverBackground};
        border-radius: 13px;
    }
`

const Container = styled(Flex)`
    background: none;
    margin-bottom: 28px;
    align-items: center;
    padding: 0 6px;
`

const DateBox = styled(Box)`
    height: 38px;
    line-height: 38px;
    background: none;
`

const CurrentDateText = styled(Text).attrs({
    typo: typos.suit['14.18_400'],
})<{ minWidth: number }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: ${({ minWidth }) => minWidth}px;
    height: 38px;
    color: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.header.color};
`

export default Header
