import styled from 'styled-components'

import { typos } from '../../styles/typos'
import { zeroStyle } from '../../styles/zero'
import { useTheme } from '../../themes/provider'
import { Flex } from '../box'
import { RefreshIcon } from '../icon'
import ButtonArrow from './buttonArrow'
import { DateDurationPickerDirection } from './dateDurationPicker'

type ResetButtonProps = {
    onClick(): void
}

export const ResetButton = ({ onClick }: ResetButtonProps) => {
    const {
        dateDurationPicker: {
            button: { color },
        },
    } = useTheme()
    return (
        <DateDurationPickerButton onClick={onClick}>
            <RefreshIcon size={16} color={color} />
            Reset
        </DateDurationPickerButton>
    )
}

type CustomDateButtonProps = {
    showDateDurationPicker: boolean
    onClick(): void
    dateDurationPickerDirection: DateDurationPickerDirection
}

export const CustomDateButton = ({
    showDateDurationPicker,
    onClick,
    dateDurationPickerDirection,
}: CustomDateButtonProps) => {
    return (
        <CustomButtonContainer
            justifyContent="center"
            showDateDurationPicker={showDateDurationPicker}
            dateDurationPickerDirection={dateDurationPickerDirection}
        >
            <DateDurationPickerButton onClick={onClick} block>
                Custom date
                <ButtonArrow showDateDurationPicker={showDateDurationPicker} />
            </DateDurationPickerButton>
        </CustomButtonContainer>
    )
}

const CustomButtonContainer = styled(Flex)<{
    showDateDurationPicker: boolean
    dateDurationPickerDirection: DateDurationPickerDirection
}>`
    margin-bottom: ${({ showDateDurationPicker, dateDurationPickerDirection }) => {
        if (!showDateDurationPicker) {
            return 0
        }
        if (dateDurationPickerDirection === 'vertical') {
            return 28
        }
        return 24
    }}px;
    transition: margin-bottom 0.5s ease-out;
    align-items: center;
`

const DateDurationPickerButton = styled.button<{ block?: boolean }>`
    ${zeroStyle}
    ${typos.suit['14.18_400']}
    color: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.button.color};
    cursor: pointer;
    height: 26px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: ${({ block = false }) => (block ? '100%' : 'fit-content')};

    svg {
        margin: 0 5px;
    }
`
