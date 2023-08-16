import format from 'date-fns/esm/format'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import styled from 'styled-components'

import { colors } from '../../styles/colors'
import { typos } from '../../styles/typos'
import { Button } from '../button'
import { ChevronLeftIcon, ChevronRightIcon } from '../icon'

type DatePickerPopupHeaderProps = {
    onSelectToday: () => void
} & Pick<ReactDatePickerCustomHeaderProps, 'date' | 'decreaseMonth' | 'increaseMonth'>

export const DatePickerPopupHeader = ({
    onSelectToday,
    date,
    decreaseMonth,
    increaseMonth,
}: DatePickerPopupHeaderProps) => {
    return (
        <Container>
            <YearMonthContainer>
                <ChangeYearButton onClick={decreaseMonth}>
                    <ChevronLeftIcon size={16} color={colors.black[500]} />
                </ChangeYearButton>

                <YearMonthTextContainer>
                    {format(date, 'yyyy')}
                    &nbsp;&nbsp;&nbsp;
                    {format(date, 'MMMM')}
                </YearMonthTextContainer>

                <ChangeYearButton onClick={increaseMonth}>
                    <ChevronRightIcon size={16} color={colors.black[500]} />
                </ChangeYearButton>
            </YearMonthContainer>

            <Button buttonType="forth" size={32} onClick={onSelectToday}>
                Today
            </Button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    gap: 26px;
`

const YearMonthContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
`

const YearMonthTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    color: ${({ theme }) => theme.datePicker.month};
    ${typos.suit['14.18_400']};
`

const ChangeYearButton = styled.button`
    display: flex;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
`
