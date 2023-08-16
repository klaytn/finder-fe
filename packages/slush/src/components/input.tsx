import {
    CSSProperties,
    FocusEvent,
    forwardRef,
    KeyboardEventHandler,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react'
import styled, { css } from 'styled-components'

import { useRerenderOnScroll } from '../hooks/useRerenderOnScroll'
import { useToggle } from '../hooks/useToggle'
import { Color, colors } from '../styles/colors'
import { typos } from '../styles/typos'
import { useTheme } from '../themes/provider'
import { setTransition } from '../utils/animation'
import { Flex } from './box'
import { ContextMenu, ContextMenuItem } from './contextMenu'
import { VerticalDivider } from './divider'
import { ArrowtriangleBottomIcon, Icon, MathCloseIcon } from './icon'
import { If } from './logic/if'

type InputProps = {
    rightIcon?: Icon
    leftIcon?: Icon
    leftButton?: ReactNode
    rightButton?: ReactNode
    iconSize?: number
    iconColor?: Color
    hasRightDivider?: boolean
    onRightIconClick?: () => void
    hasClearButton?: boolean
    onClear?: () => void
    onEnter?: () => void
    outerStyle?: CSSProperties
    valid?: boolean
    labels?: (() => JSX.Element)[]
    autoCompleteItems?: string[]
    onSelectOnAutoComplete?: (item: string) => void
    gap?: number
    inputContainerStyle?: CSSProperties
} & React.InputHTMLAttributes<HTMLInputElement>

const SIZE_MAP = {
    ROUND: 14,
    ICON: 20,

    radius: 11,
    height: 32,
    typo: typos.suit['12.16_400'],
    icon: 12,
    padding: {
        height: 8,
        width: 14,
    },
    maxHeight: 224,
} as const

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            rightIcon,
            leftIcon,
            leftButton,
            rightButton,
            iconSize = SIZE_MAP.ICON,
            iconColor,
            onRightIconClick,
            hasClearButton = false,
            onClear,
            onEnter,
            hasRightDivider = true,
            // eslint-disable-next-line react/prop-types
            className,
            // eslint-disable-next-line react/prop-types
            value,
            outerStyle = {},
            valid,
            // eslint-disable-next-line react/prop-types
            disabled = false,
            labels = [],
            autoCompleteItems = [],
            onSelectOnAutoComplete,
            gap = 6,
            inputContainerStyle = {},
            ...inputProps
        }: InputProps,
        ref,
    ) => {
        const hasAutoComplete = autoCompleteItems.length > 0
        const containerRef = useRef<HTMLDivElement>(null)
        const innerRef = useRef<HTMLInputElement>(null)
        const [isFocus, setIsFocus] = useState(false)
        const { isShow, off, on } = useToggle()
        useRerenderOnScroll(isShow)

        const { onFocus, onBlur } = inputProps

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement, HTMLElement>) => {
                onFocus?.(event)
                on()
                setIsFocus(true)
            },
            [onFocus, on],
        )

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement, HTMLElement>) => {
                onBlur?.(event)
                off()
                setIsFocus(false)

                if (hasAutoComplete) {
                    if (!autoCompleteItems.includes(value?.toString() || '')) {
                        onClear?.()
                    }
                }
            },
            [onBlur, off, autoCompleteItems, onClear, hasAutoComplete, value],
        )

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        useImperativeHandle(ref, () => innerRef.current!)

        const { input } = useTheme()

        const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
            if (event.key === 'Enter') {
                onEnter?.()
            }
            inputProps.onKeyDown?.(event)
        }

        const handleClose = useCallback(
            (event: MouseEvent) => {
                if (containerRef.current?.contains?.(event.target as Node)) {
                    return
                }

                off()
            },
            [off],
        )

        const handleSelectOnAutoComplete = (item: ContextMenuItem) => {
            onSelectOnAutoComplete?.(item.label)
            off()
        }

        const handleCaretOpen = useCallback(() => {
            on()
            innerRef.current?.focus?.()
        }, [on])

        const RightIcon = rightIcon
        const LeftIcon = leftIcon

        const clientRect = containerRef.current?.getClientRects()
        const left = clientRect?.[0]?.left ?? 0
        const top = clientRect?.[0]?.top ?? 0
        const width = clientRect?.[0]?.width ?? 0

        const autoCompleteContextMenuItems: ContextMenuItem[] = useMemo(() => {
            return autoCompleteItems
                .filter((item) => item.toUpperCase().includes(value?.toString().toUpperCase() || ''))
                .map((item) => ({
                    label: item,
                    value: item,
                }))
        }, [autoCompleteItems, value])

        return (
            <Container
                ref={containerRef}
                isFocus={isFocus}
                direction="row"
                round={SIZE_MAP.ROUND}
                className={className}
                style={outerStyle}
                valid={valid}
                gap={gap}
                hasRightButton={!!rightButton}
            >
                {LeftIcon && (
                    <IconContainer paddingLeft={6}>
                        <LeftIcon
                            size={iconSize}
                            color={disabled ? colors.black[500] : iconColor || input.text.normal}
                        />
                    </IconContainer>
                )}
                {leftButton}
                {labels.map((LabelComponent, index) => (
                    <LabelComponent key={`label-${index}`} />
                ))}
                <InputContainer style={inputContainerStyle}>
                    <InnerInput
                        ref={innerRef}
                        value={value}
                        onKeyDown={handleKeydown}
                        disabled={disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        autoComplete={hasAutoComplete ? 'off' : inputProps.autoComplete}
                        {...inputProps}
                    />
                </InputContainer>
                <If condition={hasClearButton && !!value}>
                    <ClearContainer onClick={onClear}>
                        <MathCloseIcon size={SIZE_MAP.ICON} color={disabled ? colors.black[500] : input.text.normal} />
                    </ClearContainer>
                </If>
                <If condition={!!(RightIcon || hasAutoComplete || rightButton)}>
                    {hasRightDivider && <VerticalDivider reversePadding={-2} margin={6} />}
                    {rightButton}
                    {hasAutoComplete && (
                        <>
                            <CaretButton onClick={handleCaretOpen} type="button" tabIndex={-1}>
                                <ArrowtriangleBottomIcon size={10} color={input.caret.icon} />
                            </CaretButton>
                            {autoCompleteContextMenuItems.length > 0 && (
                                <ContextMenu
                                    size="medium"
                                    maxHeight={SIZE_MAP.maxHeight}
                                    left={left}
                                    top={top + SIZE_MAP.height + 10}
                                    width={width}
                                    show={isShow}
                                    items={autoCompleteContextMenuItems}
                                    onClose={handleClose}
                                    onSelect={handleSelectOnAutoComplete}
                                />
                            )}
                        </>
                    )}
                    {RightIcon && (
                        <IconContainer onClick={onRightIconClick}>
                            <RightIcon size={SIZE_MAP.ICON} color={disabled ? colors.black[500] : input.text.normal} />
                        </IconContainer>
                    )}
                </If>
            </Container>
        )
    },
)

Input.displayName = 'Input'

const Container = styled(Flex)<{
    valid?: boolean
    isFocus: boolean
    gap: number
    hasRightButton: boolean
}>`
    ${setTransition('background-color', 'color', 'border', 'outline')};
    background: ${({ theme }) => theme.input.background.normal};
    padding: 6px;
    padding-right: ${({ hasRightButton }) => (hasRightButton ? 6 : 12)}px;
    align-items: center;
    ${({
        valid,
        isFocus,
        theme: {
            input: { outline },
        },
    }) =>
        css`
            outline: ${valid === false
                ? `1px solid ${outline.invalid}`
                : isFocus
                ? `2px solid ${outline.focused}`
                : `0px solid transparent`};
        `}
    gap: ${({ gap }) => gap}px;
    height: 28px;

    &:hover {
        background: ${({ theme }) => theme.input.background.hover};
    }
`

const InputContainer = styled(Flex)`
    flex-grow: 1;
    padding-left: 8px;
`

const ClearContainer = styled(Flex)`
    cursor: pointer;
`

const IconContainer = styled(Flex)<{ paddingLeft?: number; paddingRight?: number }>`
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};
    padding-left: ${({ paddingLeft = 0 }) => paddingLeft}px;
    padding-right: ${({ paddingRight = 0 }) => paddingRight}px;
`

const InnerInput = styled.input`
    color: ${({ theme }) => theme.input.text.normal};
    margin: 0;
    border: none;
    outline: none;
    width: 100%;
    ${typos.suit['14.18_400']}
    background: none;
    ${setTransition('color')};

    ::placeholder {
        color: ${({ theme }) => theme.input.placeholder};
        user-select: none;
    }

    ::-webkit-outer-spin-button {
        appearance: none;
    }

    ::-webkit-inner-spin-button {
        appearance: none;
    }

    &:disabled {
        color: ${colors.black[500]};
    }
`

const CaretButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    border: none;
    background: ${({ theme }) => theme.input.caret.background};
    border-radius: 4px;
    width: 20px;
    height: 20px;
    cursor: pointer;
`
