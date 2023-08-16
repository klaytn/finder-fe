import { CSSProperties, FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { Shadow } from '../styles/shadows'
import { typos } from '../styles/typos'
import { ZIndex } from '../styles/zIndex'
import { useTheme } from '../themes/provider'
import { Box } from './box'
import { Text } from './text'

type FixedTooltipOverrideProps = {
    color?: {
        text?: string
        background?: string
    }
    shadow?: Shadow
}

type Direction = 'top' | 'bottom'
type CursorPosition = 'left' | 'center' | 'right'

type FixedTooltipProps = {
    message: ReactNode
    show: boolean
    override?: FixedTooltipOverrideProps
    direction?: Direction
    cursorPosition?: CursorPosition
    margin?: number
    width?: number
}

const RE_ADJUST_DURATION_MS = 100
const MAX_ADJUST_COUNT = 10
const CURSOR_POSITION_MAP = {
    left: 20,
    center: 50,
    right: 80,
}

export const FixedTooltip: FC<FixedTooltipProps> = ({
    message,
    override,
    show,
    direction = 'bottom',
    cursorPosition = 'center',
    margin = 14,
    width,
    children,
}) => {
    const hoverRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const adjustCountRef = useRef(0)
    const [center, setCenter] = useState(0)
    const [top, setTop] = useState(0)

    const adjustCenter = useCallback(() => {
        if (!hoverRef.current || !tooltipRef.current) {
            setTimeout(adjustCenter, RE_ADJUST_DURATION_MS)
            return
        }

        const hoverLeft = hoverRef.current.offsetLeft
        const hoverWidth = hoverRef.current.offsetWidth
        const hoverHeight = hoverRef.current.offsetHeight
        const tooltipWidth = tooltipRef.current.offsetWidth
        const tooltipHeight = tooltipRef.current.offsetHeight

        const centerRate = (CURSOR_POSITION_MAP[cursorPosition] / 100) * tooltipWidth
        const nextCenter = hoverLeft + hoverWidth / 2 - centerRate
        const nextTop = direction === 'top' ? hoverHeight + tooltipHeight : 0

        if (nextCenter) {
            setCenter(nextCenter)
            setTop(nextTop)
        } else {
            // If it hasn't finished rendering yet, the calculation will return zero, so try to recalculate it
            if (adjustCountRef.current < MAX_ADJUST_COUNT) {
                adjustCountRef.current++
                setTimeout(adjustCenter, RE_ADJUST_DURATION_MS)
            }
        }
    }, [cursorPosition, direction])

    useEffect(() => {
        if (!message) {
            return
        }

        adjustCenter()
    }, [message, adjustCenter])

    const { tooltip } = useTheme()

    const style: CSSProperties = {
        left: center,
    }
    if (direction === 'bottom') {
        style.marginTop = margin
    } else {
        style.marginTop = -margin
        style.transform = `translateY(-${top}px)`
    }

    return (
        <OuterContainer>
            <HoverArea ref={hoverRef} show={show}>
                {children}
            </HoverArea>
            {!!message && (
                <Container
                    direction={direction}
                    cursorPosition={cursorPosition}
                    width={width}
                    round={12}
                    backgroundColor={override?.color?.background || tooltip.background}
                    className="tooltip"
                    shadow={override?.shadow || tooltip.shadow}
                    ref={tooltipRef}
                    style={style}
                >
                    <TextBox typo={typos.suit['10.14_400']} color={override?.color?.text || tooltip.text}>
                        {message}
                    </TextBox>
                </Container>
            )}
        </OuterContainer>
    )
}

const OuterContainer = styled.div``

type ContainerProps = {
    direction: Direction
    cursorPosition: CursorPosition
    width?: number
}

const Container = styled(Box)<ContainerProps>`
    width: ${({ width }) => width}px;
    z-index: ${ZIndex.Tooltip};
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    padding: 10px 12px 10px 16px;

    text-align: center;
    pointer-events: none;

    &::after {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        ${({ direction, theme }) =>
            direction === 'bottom'
                ? css`
                      border-bottom: 9px solid ${theme.tooltip.background};
                      top: -9px;
                  `
                : css`
                      border-top: 9px solid ${theme.tooltip.background};
                      bottom: -9px;
                  `}
        left: ${({ cursorPosition }) => CURSOR_POSITION_MAP[cursorPosition]}%;
        transform: translateX(-50%);
        content: '';
        width: 0;
        height: 0;
        position: absolute;
    }
`

const TextBox = styled(Text)`
    margin: 0;
    padding: 0;
    min-width: 84px;
`

const HoverArea = styled.div<{ show?: boolean }>`
    margin: 0;
    padding: 0;
    & + .tooltip {
        transition: opacity 150ms ease-out;
        opacity: 0;
    }

    ${({ show }) => {
        if (show === undefined) {
            return css`
                &:hover ~ .tooltip {
                    opacity: 1;
                }
            `
        }

        return css`
            & ~ .tooltip {
                opacity: ${show === true ? 1 : 0};
            }
        `
    }}
`
