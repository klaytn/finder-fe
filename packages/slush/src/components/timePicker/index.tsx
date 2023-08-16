import { useCallback, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import { displayNoneOnAnimationEnd, useAnimationEnd } from '../../hooks/useAnimationEnd'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useRerenderOnScroll } from '../../hooks/useRerenderOnScroll'
import { useToggle } from '../../hooks/useToggle'
import { ZIndex } from '../../styles/zIndex'
import { useTheme } from '../../themes/provider'
import { Flex } from '../box'
import { Input } from '../input'
import { Portal } from '../portal'
import TimePickerPopup from './popup'

const dateToStr = (value: Date) => {
    const hour = value.getHours()
    const min = value.getMinutes().toString().padStart(2, '0')
    const isAM = hour < 12
    const prefix = isAM ? 'AM' : 'PM'
    const fixedHour = ((isAM ? hour : hour - 12) || 12).toString().padStart(2, '0')

    return `${prefix} ${fixedHour}:${min}`
}

const TEMP_DATE = new Date()

type TimePickerProps = {
    value?: Date
    defaultValue?: Date
    onChange: (value: Date) => void
    popupLeft?: number
    error?: boolean
}

const TimePicker = ({ value, defaultValue, onChange, popupLeft = 0, error = false }: TimePickerProps) => {
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
        timePicker: { shadow, background },
    } = useTheme()

    const [{ left, top, width, height } = { left: 0, top: 0, width: 0, height: 0 }] =
        inputRef.current?.getClientRects() || []

    return (
        <>
            <Input
                ref={inputRef}
                type="text"
                value={value ? dateToStr(value) : ''}
                placeholder={defaultValue ? dateToStr(defaultValue) : ''}
                outerStyle={{ textAlign: 'center' }}
                onClick={toggle}
                readOnly
                valid={!error}
            />
            <Portal>
                <PopupContainer
                    width={width}
                    style={{
                        transform: `translate(${left - 15 + popupLeft}px, ${top + height + 20}px)`,
                    }}
                    direction="column"
                    backgroundColor={background}
                    shadow={shadow}
                    round={16}
                    show={isShow}
                    disabled={disabled}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <TimePickerPopup
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
    width: 179px;
    height: 280px;
    padding: 16px;
    user-select: none;
    position: fixed;
    overflow-x: auto;
    animation-fill-mode: forwards;
    animation: ${({ show }) => (show ? showIn : showOut)} 100ms;
    ${displayNoneOnAnimationEnd};
`

export default TimePicker
