import BigNumber from 'bignumber.js'
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import { colors, GlobalEventHandlerManager, Tooltip, withRetry } from '@klaytn/slush'

import { extractThemeProp } from '../../functions/colorMap'
import { extractProp } from '../../functions/Functions'
import { DEFAULT_STRING_ELLIPSIS_RESULT, getEllipsisString, StringEllipsisResult } from '../../functions/number'
import useMountState from '../../hooks/useMountState'

const TOOLTIP_CLASS_NAME = 'ellipsis-tooltip'

const TooltipCss = css`
    border-radius: 12px;
`

const RETRY_MAX_COUNT = 10
const RETRY_INTERVAL_MS = 100

const globalResizeHandlerManager = new GlobalEventHandlerManager<RefObject<HTMLElement>>('resize')

type EllipsisNumberProps = {
    integerColor?: string
    fractionColor?: string
    additionalCss?: FlattenSimpleInterpolation
    value?: string | BigNumber | number
    noEllipsis?: boolean
    marginLeft?: number
    marginRight?: number
    alwaysShowFraction?: boolean
}

const EllipsisNumber = ({
    integerColor = colors.white,
    fractionColor = colors.black[400],
    additionalCss,
    value = '0',
    noEllipsis = false,
    marginLeft = 0,
    marginRight = 0,
    alwaysShowFraction = false,
}: EllipsisNumberProps) => {
    const ref = useRef<HTMLElement>(null)
    const isMountedRef = useMountState()

    const isInitRef = useRef(false)
    const [ellipsisStringResult, setEllipsisStringResult] =
        useState<StringEllipsisResult>(DEFAULT_STRING_ELLIPSIS_RESULT)

    const calculateNumbers = useMemo(
        () =>
            withRetry({
                checkNeedRetry: () => !ref.current?.parentElement?.scrollWidth,
                targetFn: () => {
                    if (!isMountedRef.current) {
                        return
                    }

                    if (!ref.current?.parentElement) {
                        return
                    }

                    if (isInitRef.current) {
                        return
                    }

                    isInitRef.current = true
                    const parentWidth = ref.current?.parentElement.scrollWidth
                    setEllipsisStringResult(getEllipsisString(value.toString(), parentWidth, { noEllipsis }))
                },
                retryCount: RETRY_MAX_COUNT,
                retryIntervalMs: RETRY_INTERVAL_MS,
            }),
        [value, noEllipsis, isMountedRef],
    )

    const handleResize = useCallback(() => {
        isInitRef.current = false
        calculateNumbers()
    }, [calculateNumbers])

    useEffect(() => {
        handleResize()

        if (!noEllipsis) {
            globalResizeHandlerManager.add(ref, handleResize)
        }

        return () => {
            globalResizeHandlerManager.remove(ref)
        }
    }, [noEllipsis, handleResize])

    const { integer, fraction, isZero, isZeroFraction, isEllipsis } = ellipsisStringResult

    const numberParts = (
        <>
            <Container
                color={isZero ? fractionColor : integerColor}
                additionalCss={additionalCss}
                ref={isEllipsis ? undefined : ref}
                style={{
                    marginLeft,
                }}
            >
                {integer}
                {fraction && '.'}
            </Container>
            {(fraction || alwaysShowFraction) && (
                <Container
                    color={fractionColor}
                    additionalCss={additionalCss}
                    style={{
                        marginRight,
                    }}
                >
                    {isZeroFraction ? '0' : fraction || '.0'}
                </Container>
            )}
        </>
    )

    if (isEllipsis) {
        return (
            <Tooltip message={value} ref={ref}>
                {numberParts}
            </Tooltip>
        )
    }

    return numberParts
}

const Container = styled.span<{ color: string; additionalCss?: FlattenSimpleInterpolation }>`
    color: ${extractThemeProp('color')};
    white-space: nowrap;
    ${extractProp('additionalCss')};

    & .${TOOLTIP_CLASS_NAME} {
        ${TooltipCss}
    }
`

export default EllipsisNumber
