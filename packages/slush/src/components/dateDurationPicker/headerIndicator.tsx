import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'

import { colors } from '../../styles/colors'
import { noop } from '../../utils/common'
import { ChevrondoubleLeftIcon, ChevrondoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '../icon'
import { CALENDAR_NOTATION } from './dateDurationPicker'
import { HeaderProps } from './header'

type HeaderIndicatorProps = PropsWithChildren<HeaderProps>

const ICON_PROPS = {
    size: 16,
    color: colors.black[500],
}

function HeaderIndicator({
    children,
    useYearIndicator,
    useMonthIndicator,
    decreaseYear,
    decreaseMonth,
    increaseMonth,
    increaseYear,
    notation,
    disabledIndicator,
    hideLeftIndicator,
    hideRightIndicator,
}: HeaderIndicatorProps) {
    const useDoubleIcon = notation === CALENDAR_NOTATION.DATE

    if (disabledIndicator) {
        return <>{children}</>
    }

    return (
        <>
            <IconBox
                className="year-dec-indicator"
                disabled={!useYearIndicator || hideLeftIndicator}
                onClick={useYearIndicator && !hideLeftIndicator ? decreaseYear : noop}
            >
                {useYearIndicator && !hideLeftIndicator && (
                    <>
                        {useDoubleIcon ? (
                            <ChevrondoubleLeftIcon {...ICON_PROPS} />
                        ) : (
                            <ChevronLeftIcon {...ICON_PROPS} />
                        )}
                    </>
                )}
            </IconBox>
            <IconBox
                className="month-dec-indicator"
                disabled={!useMonthIndicator || hideLeftIndicator}
                onClick={useMonthIndicator && !hideLeftIndicator ? decreaseMonth : noop}
            >
                {useMonthIndicator && !hideLeftIndicator && <ChevronLeftIcon {...ICON_PROPS} />}
            </IconBox>
            {children}
            <IconBox
                className="month-inc-indicator"
                disabled={!useMonthIndicator || hideRightIndicator}
                onClick={useMonthIndicator && !hideRightIndicator ? increaseMonth : noop}
            >
                {useMonthIndicator && !hideRightIndicator && <ChevronRightIcon {...ICON_PROPS} />}
            </IconBox>
            <IconBox
                className="year-inc-indicator"
                disabled={!useYearIndicator || hideRightIndicator}
                onClick={useYearIndicator && !hideRightIndicator ? increaseYear : noop}
            >
                {useYearIndicator && !hideRightIndicator && (
                    <>
                        {useDoubleIcon ? (
                            <ChevrondoubleRightIcon {...ICON_PROPS} />
                        ) : (
                            <ChevronRightIcon {...ICON_PROPS} />
                        )}
                    </>
                )}
            </IconBox>
        </>
    )
}

const IconBox = styled.span<{ disabled: boolean }>`
    width: 16px;
    height: 16px;
    padding: 8px;

    ${({ disabled }) =>
        !disabled &&
        css`
            &:hover {
                cursor: pointer;
                background-color: ${({ theme: { dateDurationPicker: datepicker } }) =>
                    datepicker.header.hoverBackground};
                border-radius: 13px;
            }
        `}
`

export default HeaderIndicator
