import { Fragment, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

import { flyIn, flyOut } from '../animations/fly'
import { Color } from '../styles/colors'
import { typos } from '../styles/typos'
import { ZIndex } from '../styles/zIndex'
import { useTheme } from '../themes/provider'
import { Flex } from './box'
import { ConfirmCircleIcon, Icon, MathCloseIcon } from './icon'
import { Portal } from './portal'
import { Text } from './text'

const DEFAULT_DURATION = 5000
const DURATION_THRESHOLD_CHAR_LENGTH = 35
const DURATION_DIVIDER_CHAR_LENGTH = 10
const DEFAULT_WIDTH = 300
const ICON_SIZE = 16

// Return the string length calculated by treating Hangul as two characters
const getTextWidth = (text = '') => text.replace(/[ㄱ-힣]/g, '  ').length

type ToastProps = {
    show: boolean
    onClose?: () => void
    title?: string
    message: string
    duration?: number
    width?: number
    color?: 'green' | 'blue' | 'red' | 'yellow'
    icon?: Icon
    top?: number
    extraText?({ color }: { color: Color }): JSX.Element
    undo?({ color }: { color: Color }): JSX.Element
}

export const Toast = ({
    show,
    onClose,
    title,
    message,
    width,
    duration,
    color = 'green',
    icon = ConfirmCircleIcon,
    top = 188,
    extraText,
    undo,
}: ToastProps) => {
    useEffect(() => {
        onClose?.()
    }, [onClose])

    const [disabled, setDisabled] = useState(!show)

    const calculatedDuration = useMemo(() => {
        if (typeof duration === 'number') {
            return duration
        }

        const length = getTextWidth(message) + getTextWidth(title)
        if (length <= DURATION_THRESHOLD_CHAR_LENGTH) {
            return DEFAULT_DURATION
        }

        const addedDuration = Math.ceil((length - DURATION_THRESHOLD_CHAR_LENGTH) / DURATION_DIVIDER_CHAR_LENGTH) * 1000
        return DEFAULT_DURATION + addedDuration
    }, [duration, message, title])

    useEffect(() => {
        if (show && onClose) {
            const key = setTimeout(onClose, calculatedDuration)
            return () => {
                clearTimeout(key)
            }
        }
    }, [show, onClose, calculatedDuration])

    useEffect(() => {
        if (show) {
            setDisabled(false)
        }
    }, [show])

    const handleTransitionEnd = () => {
        if (!show) {
            setDisabled(true)
        }
    }

    const IconComponent = icon

    const colorSet = useTheme().toast[color]

    const ExtraText = extraText
    const Undo = undo

    return (
        <Portal>
            <Container
                round={16}
                shadow={colorSet.shadow}
                backgroundColor={colorSet.fill}
                onAnimationEnd={handleTransitionEnd}
                disabled={disabled}
                show={show}
                customWidth={width}
                top={top}
            >
                <IconContainer>
                    <IconComponent size={ICON_SIZE} color={colorSet.contents} />
                </IconContainer>
                <TextContainer>
                    <Flex>
                        <Text color={colorSet.contents} typo={typos.suit['12.16_900']}>
                            {title}
                        </Text>
                    </Flex>
                    <Flex>
                        <Text color={colorSet.contents} typo={typos.suit['12.16_400']}>
                            {message.split('\n').map((line, index, { length }) => (
                                <Fragment key={index}>
                                    {line}
                                    {index < length - 1 && <br />}
                                </Fragment>
                            ))}
                        </Text>
                    </Flex>
                    {ExtraText && (
                        <ExtraContainer direction="row" opacity={0.5}>
                            <ExtraText color={colorSet.contents} />
                        </ExtraContainer>
                    )}
                    {Undo && (
                        <ExtraContainer direction="row">
                            <Undo color={colorSet.contents} />
                        </ExtraContainer>
                    )}
                </TextContainer>
                {onClose && (
                    <IconContainer>
                        <CloseButton onClick={onClose}>
                            <MathCloseIcon size={ICON_SIZE} color={colorSet.contents} />
                        </CloseButton>
                    </IconContainer>
                )}
            </Container>
        </Portal>
    )
}

type ContainerProps = {
    show: boolean
    disabled: boolean
    customWidth?: number
    top: number
}

const Container = styled(Flex)<ContainerProps>`
    position: fixed;
    margin: auto;
    left: 50%;
    transform: translateX(-50%);
    top: ${({ top }) => top}px;
    z-index: ${ZIndex.Toast};
    padding: 16px 17.5px 16px 19px;

    display: ${({ disabled }) => (disabled ? 'none' : 'flex')};
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: stretch;

    animation: ${({ show }) => (show ? flyIn : flyOut)} 200ms;
    animation-fill-mode: forwards;

    ${({ customWidth }) => {
        return customWidth !== undefined
            ? css`
                  width: ${customWidth}px;
              `
            : css`
                  min-width: ${DEFAULT_WIDTH}px;
              `
    }}
`

const IconContainer = styled.div`
    display: flex;
    flex-grow: 0;
    flex-shrink: 1;
`

const TextContainer = styled(IconContainer)`
    width: 100%;
    margin-left: 8px;
    margin-right: 8px;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
`

const ExtraContainer = styled(Flex).attrs({
    direction: 'row',
})<{ opacity?: number }>`
    align-items: flex-end;
    padding-top: 8px;
    margin-top: 4px;
    opacity: ${({ opacity }) => opacity || 1};
`
