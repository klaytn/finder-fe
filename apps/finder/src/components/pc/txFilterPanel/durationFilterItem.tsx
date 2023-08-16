import styled from 'styled-components'

import { CalendarNormalIcon, Check, colors, DatePicker, Input, Text, TimePicker, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import FilterItemBox from './filterItemBox'

type DurationFilterItemProps = {
    from?: Date
    to?: Date
    defaultFrom: Date
    defaultTo: Date
    onFromChange: (from: Date) => void
    onToChange: (to: Date) => void
    isValid: boolean
    setToCurrentTime: boolean
    onToggleCurrentTime: () => void
}

const DurationFilterItem = ({
    from,
    onFromChange,
    defaultFrom,
    to,
    onToChange,
    defaultTo,
    isValid,
    setToCurrentTime,
    onToggleCurrentTime,
}: DurationFilterItemProps) => {
    const checkLabelColor = useFinderThemeColor(colors.blue[400])

    return (
        <FilterItemBox
            title="Duration"
            description="Duration can be set up to a maximum of 31 days, and only data within the last year can be searched."
        >
            <Container>
                <DateTimePickerRow
                    isValid={isValid}
                    defaultValue={defaultFrom}
                    label="From"
                    value={from}
                    onChange={onFromChange}
                    setToCurrentTimePlaceholder={setToCurrentTime ? '24 Hours ago' : ''}
                />
                <DateTimePickerRow
                    isValid={isValid}
                    defaultValue={defaultTo}
                    label="To"
                    value={to}
                    onChange={onToChange}
                    setToCurrentTimePlaceholder={setToCurrentTime ? 'Current Time' : ''}
                />
                <CurrentTimeRow>
                    <Check
                        label="Set to Current Time"
                        checked={setToCurrentTime}
                        onChange={onToggleCurrentTime}
                        labelProps={{
                            typo: typos.suit['14.18_400'],
                            color: checkLabelColor,
                        }}
                    />
                </CurrentTimeRow>
            </Container>
        </FilterItemBox>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

type DateTimePickerRowProps = {
    label: string
    defaultValue: Date
    value?: Date
    onChange: (value: Date) => void
    isValid: boolean
    setToCurrentTimePlaceholder?: string
}

const DateTimePickerRow = ({
    label,
    value,
    onChange,
    defaultValue,
    isValid,
    setToCurrentTimePlaceholder,
}: DateTimePickerRowProps) => {
    return (
        <RowContainer>
            <RowLeft>
                <RowLabel>{label}</RowLabel>
            </RowLeft>
            <RowRight>
                {!setToCurrentTimePlaceholder ? (
                    <>
                        <DatePicker
                            value={value}
                            defaultValue={defaultValue}
                            onChange={onChange}
                            popupLeft={-175}
                            error={!isValid}
                        />
                        <TimePickerContainer>
                            <TimePicker
                                value={value}
                                defaultValue={defaultValue}
                                onChange={onChange}
                                popupLeft={-115}
                                error={!isValid}
                            />
                        </TimePickerContainer>
                    </>
                ) : (
                    <DisabledInput
                        disabled
                        placeholder={setToCurrentTimePlaceholder}
                        leftIcon={CalendarNormalIcon}
                        gap={0}
                        inputContainerStyle={{
                            paddingLeft: 4,
                        }}
                    />
                )}
            </RowRight>
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
`

const RowLeft = styled.div`
    display: flex;
    width: 95px;
    flex-shrink: 0;
`

const RowLabel = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.black[400],
        typo: typos.suit['14.18_400'],
    }),
)``

const RowRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
`

const TimePickerContainer = styled.div`
    display: flex;
    width: 93px;
    flex-shrink: 0;
`

const CurrentTimeRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
`

const DisabledInput = styled(Input)`
    width: 100%;
`

export default DurationFilterItem
