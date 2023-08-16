import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import styled, { CSSProperties, keyframes } from 'styled-components'

import { displayNoneOnAnimationEnd, useAnimationEnd } from '../hooks/useAnimationEnd'
import { Color, colors } from '../styles/colors'
import { Shadow } from '../styles/shadows'
import { Typo, typos } from '../styles/typos'
import { ZIndex } from '../styles/zIndex'
import { useTheme } from '../themes/provider'
import { Box, Flex } from './box'
import { MathCloseIcon } from './icon'
import { Overlay } from './overlay'
import { Portal } from './portal'
import { Text } from './text'

/**
 * Struct for managing multiple dialogs so that only the last one is visible when they are opened.
 */
class DialogStack {
    private reorderStack: (() => void)[] = []

    private reorderAll() {
        this.reorderStack.forEach((reorder) => reorder())
    }

    isTop(id: number) {
        return this.reorderStack.length - 1 === id
    }

    push(reorder: () => void) {
        const id = this.reorderStack.length
        this.reorderStack.push(reorder)
        this.reorderAll()
        return id
    }

    pop() {
        if (this.reorderStack.length > 0) {
            this.reorderStack.pop()
            this.reorderAll()
        }
    }

    has(id: number) {
        return this.reorderStack.length > id
    }
}

const dialogStack = new DialogStack()

type DialogProps = {
    title: ReactNode
    subtitle?: string
    show: boolean
    onClose: () => void
    shadow?: Shadow
    onAnimationEnd?: () => void
    size?: 'sm' | 'lg'
    align?: 'left' | 'center'
    preventCloseOnOutsideClick?: boolean
    override?: {
        titleTypo?: Typo
        padding?: CSSProperties['padding']
        width?: number
    }
}

const SIZE_MAP = {
    sm: {
        typo: typos.suit['18.24_900'],
    },
    lg: {
        typo: typos.suit['20.28_900'],
    },
}

export const Dialog: FC<DialogProps> = ({
    show,
    title,
    subtitle,
    onClose,
    children,
    shadow,
    onAnimationEnd,
    size = 'sm',
    align = 'left',
    preventCloseOnOutsideClick = false,
    override = {},
}) => {
    const { disabled, handleAnimationEnd } = useAnimationEnd(show, onAnimationEnd)
    const { dialog } = useTheme()

    const handleBackgroundClick = useCallback(() => {
        if (preventCloseOnOutsideClick) {
            return
        }

        onClose()
    }, [preventCloseOnOutsideClick, onClose])

    const idRef = useRef(-1)
    const [isTop, setIsTop] = useState(false)

    const [, setReorderCount] = useState(0)
    const reorder = useCallback(() => {
        setReorderCount((prev) => prev + 1)
        setIsTop(dialogStack.isTop(idRef.current))
    }, [])

    useEffect(() => {
        if (show) {
            const nextId = dialogStack.push(reorder)
            idRef.current = nextId
            setIsTop(true)
        } else {
            dialogStack.pop()
            idRef.current = -1
            setIsTop(false)
        }
    }, [show, reorder])

    return (
        <>
            <Overlay show={show && isTop} onClick={handleBackgroundClick} />
            <Portal>
                <Container
                    show={show}
                    disabled={disabled}
                    onAnimationEnd={handleAnimationEnd}
                    width={override.width}
                    isTop={isTop}
                >
                    <ContentWrapper
                        shadow={shadow}
                        backgroundColor={dialog.background}
                        padding={override.padding || '32px'}
                        isTop={isTop}
                    >
                        {!!subtitle && (
                            <Flex
                                direction="row"
                                justifyContent={align === 'center' ? align : `flex-start`}
                                style={{ margin: 8 }}
                            >
                                <Box>
                                    <Text typo={typos.suit['18.24_400']} color={colors.black[500]}>
                                        {subtitle}
                                    </Text>
                                </Box>
                            </Flex>
                        )}
                        <Flex direction="row" justifyContent={align === 'center' ? align : `flex-start`}>
                            <Box>
                                <Text typo={override.titleTypo || SIZE_MAP[size].typo} color={dialog.title}>
                                    {title}
                                </Text>
                            </Box>
                            <IconBox onClick={onClose}>
                                <MathCloseIcon size={18} color={dialog.title} />
                            </IconBox>
                        </Flex>
                        <Contents color={dialog.content} align={align}>
                            {children}
                        </Contents>
                    </ContentWrapper>
                </Container>
            </Portal>
        </>
    )
}

type DialogButtonsProps = {
    gap?: number
    children: ReactNode
}
export const DialogButtons = ({ children, gap = 0 }: DialogButtonsProps) => {
    return (
        <Buttons direction="row" justifyContent="center" gap={gap}>
            {children}
        </Buttons>
    )
}

export const DIALOG_WIDTH = 512

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`
const fadeOut = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`

const flyIn = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -5%);
    }

    to {
        opacity: 1;
        transform: translate(-50%, 0%);
    }
`

const flyOut = keyframes`
    from {
        opacity: 1;
        transform: translate(-50%, 0%);
    }

    to {
        opacity: 0;
        transform: translate(-50%, 2%);
    }
`

const ContentWrapper = styled(Flex).attrs({
    round: 20,
})<{ isTop: boolean }>`
    position: relative;

    animation: ${({ isTop }) => (isTop ? fadeIn : fadeOut)} 200ms ease forwards;
`

const Container = styled(Box)<{ show: boolean; disabled: boolean; width?: number; isTop: boolean }>`
    width: ${({ width }) => width || DIALOG_WIDTH}px;
    position: fixed;

    left: 50%;
    top: 20%;
    z-index: ${({ isTop }) => (isTop ? ZIndex.Dialog : -1)};
    transition: z-index 200ms ease;

    animation: ${({ show }) => (show ? flyIn : flyOut)} 200ms ease forwards;
    ${displayNoneOnAnimationEnd};
`

const IconBox = styled(Box)`
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
`

const Contents = styled(Box)<{ color: Color; align: 'left' | 'center' }>`
    margin-top: 16px;
    color: ${({ color }) => color};
    text-align: ${({ align }) => align};
`

const Buttons = styled(Flex)<{ gap: number }>`
    margin-top: 32px;
    gap: ${({ gap }) => gap}px;
`
