import format from 'date-fns/esm/format'
import { useCallback, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import { displayNoneOnAnimationEnd, useAnimationEnd } from '../../hooks/useAnimationEnd'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useRerenderOnScroll } from '../../hooks/useRerenderOnScroll'
import { useToggle } from '../../hooks/useToggle'
import { ZIndex } from '../../styles/zIndex'
import { useTheme } from '../../themes/provider'
import { Flex } from '../box'
import { CalendarNormalIcon } from '../icon'
import { Input } from '../input'
import { Portal } from '../portal'
import { DatePickerPopup } from './datePickerPopup'

type DatePickerValueProps = {
    value: Date
    defaultValue?: Date
    onChange: (value: Date) => void
    popupLeft?: number
    error?: boolean
}

type DatePickerDefaultValueProps = {
    value?: Date
    defaultValue: Date
    onChange: (value: Date) => void
    popupLeft?: number
    error?: boolean
}

type DatePickerProps = DatePickerValueProps | DatePickerDefaultValueProps

const TEMP_DATE = new Date()

export function DatePicker(props: DatePickerValueProps): JSX.Element
export function DatePicker(props: DatePickerDefaultValueProps): JSX.Element
export function DatePicker({ value, defaultValue, onChange, popupLeft = 0, error = false }: DatePickerProps) {
    const { isShow, off, toggle } = useToggle()
    const { disabled, handleAnimationEnd } = useAnimationEnd(isShow)

    const { ref: popupRef } = useOutsideClick<HTMLDivElement>(off)
    const inputRef = useRef<HTMLInputElement>(null)
    useRerenderOnScroll(isShow)

    const handleChange = useCallback(
        (newValue: Date) => {
            onChange(newValue)
            inputRef.current?.focus()
        },
        [onChange],
    )

    const {
        datePicker: { shadow, background },
    } = useTheme()

    const [{ left, top, width, height } = { left: 0, top: 0, width: 0, height: 0 }] =
        inputRef.current?.getClientRects() || []

    return (
        <>
            <Input
                ref={inputRef}
                leftIcon={CalendarNormalIcon}
                type="text"
                value={value ? format(value, 'yyyy.MM.dd') : ''}
                placeholder={defaultValue ? format(defaultValue, 'yyyy.MM.dd') : ''}
                outerStyle={{ textAlign: 'center' }}
                onClick={toggle}
                readOnly
                valid={!error}
                gap={0}
                inputContainerStyle={{
                    paddingLeft: 4,
                }}
            />
            <Portal>
                <PopupContainer
                    width={width}
                    style={{
                        transform: `translate(${left - 40 + popupLeft}px, ${top + height + 20}px)`,
                    }}
                    direction="column"
                    backgroundColor={background}
                    shadow={shadow}
                    round={16}
                    show={isShow}
                    disabled={disabled}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <DatePickerPopup
                        isShow={isShow}
                        ref={popupRef}
                        value={value || defaultValue || TEMP_DATE}
                        onChange={handleChange}
                    />
                </PopupContainer>
            </Portal>
        </>
    )
}

const showIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const showOut = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`

const PopupContainer = styled(Flex)<{
    show: boolean
    disabled: boolean
}>`
    z-index: ${ZIndex.ContextMenu};
    width: 272px;
    min-height: 312px;
    padding: 24px 24px 20px;
    user-select: none;
    position: fixed;
    overflow-x: auto;
    animation-fill-mode: forwards;
    animation: ${({ show }) => (show ? showIn : showOut)} 100ms;
    ${displayNoneOnAnimationEnd};
`
