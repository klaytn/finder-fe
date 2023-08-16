import { forwardRef, MouseEventHandler, ReactNode, useCallback, useMemo } from 'react'
import styled, { css } from 'styled-components'

import {
    ArrowcomboInIcon,
    ArrowcomboOutIcon,
    Button,
    colors,
    CopyIcon,
    Icon,
    setTransition,
    Theme,
    Toast,
    Tooltip,
} from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { copy, extractProp } from '../../../functions/Functions'
import { useToggle } from '../../../hooks/useToggle'

export enum ViewerButtonDefaultKey {
    Expand = 'ViewerButtonDefaultKey::Expand',
    CopyToClipboard = 'ViewerButtonDefaultKey::CopyToClipboard',
}

export type ViewerButton = {
    key: string | ViewerButtonDefaultKey
    name?: string
    icon?: Icon
    onClick?: () => void
    tooltip?: string
}

type ViewerProps = {
    children: ReactNode
    paddingLeft?: number
    maxHeight?: number
    minHeight?: number
    buttons?: ViewerButton[]
    buttonRightMargin?: number
    stringToCopy?: string
    linkClassname?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}

export const Viewer = forwardRef<HTMLDivElement, ViewerProps>(
    (
        {
            children,
            paddingLeft = 0,
            maxHeight = 300,
            minHeight = 0,
            buttons,
            buttonRightMargin = 70,
            stringToCopy = '',
            linkClassname = '',
            onClick,
        },
        ref,
    ) => {
        const { isShow, toggle } = useToggle()
        const buttonState = useToggle()
        const toastState = useToggle()

        const showToast = toastState.on
        const handleCopy = useCallback(() => {
            copy(stringToCopy)
            showToast()
        }, [stringToCopy, showToast])

        const transformedButtons = useMemo(() => {
            if (!buttons) {
                return []
            }

            return buttons.map((button) => {
                switch (button.key) {
                    case ViewerButtonDefaultKey.CopyToClipboard:
                        return {
                            key: ViewerButtonDefaultKey.CopyToClipboard,
                            name: 'Copy to Clipboard',
                            icon: CopyIcon,
                            onClick: handleCopy,
                        }
                    case ViewerButtonDefaultKey.Expand:
                        return {
                            key: ViewerButtonDefaultKey.Expand,
                            name: isShow ? 'Collapse' : 'Expand',
                            icon: isShow ? ArrowcomboInIcon : ArrowcomboOutIcon,
                            onClick: toggle,
                        }

                    default:
                        return button
                }
            })
        }, [buttons, isShow, toggle, handleCopy])

        const hasButton = transformedButtons.length > 0

        return (
            <>
                <Toast message="Copied" onClose={toastState.off} show={toastState.isShow} />
                <Container
                    ref={ref}
                    paddingLeft={paddingLeft}
                    expand={isShow}
                    maxHeight={maxHeight}
                    minHeight={minHeight}
                    onMouseEnter={buttonState.on}
                    onMouseLeave={buttonState.off}
                    linkClassname={linkClassname}
                    onClick={onClick}
                >
                    {hasButton && (
                        <ButtonContainer show={buttonState.isShow} marginRight={buttonRightMargin}>
                            {transformedButtons.map(({ key, name, icon, onClick, tooltip }) => (
                                <Tooltip key={key} message={tooltip}>
                                    <ViewerButton leftIcon={icon} onClick={onClick} buttonType="forth" size={28}>
                                        {name}
                                    </ViewerButton>
                                </Tooltip>
                            ))}
                        </ButtonContainer>
                    )}
                    {children}
                </Container>
            </>
        )
    },
)

Viewer.displayName = 'Viewer'

const Container = styled.div<{
    paddingLeft: number
    expand: boolean
    maxHeight: number
    minHeight: number
    linkClassname: string
}>`
    font-size: 12px;
    overflow-y: auto;
    min-height: ${extractProp('minHeight')}px;
    ${({ expand, maxHeight }) =>
        expand
            ? ''
            : css`
                  max-height: ${maxHeight}px;
              `}
    padding-left: ${extractProp('paddingLeft')}px;
    background-color: ${({ theme }) => (theme.slush === Theme.dark ? 'rgb(43, 43, 43)' : 'rgb(250, 250, 250)')};

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${getThemeColor(colors.blue[500])};
    }
    &::-webkit-scrollbar-track {
        background-color: ${getThemeColor(colors.blue[300])};
    }

    ${({ linkClassname }) =>
        linkClassname
            ? css`
                  & .${linkClassname} {
                      text-decoration: underline;
                      cursor: pointer !important;
                  }
              `
            : ''};
`

const ButtonContainer = styled.div<{ show: boolean; marginRight: number }>`
    display: flex;
    flex-direction: row;
    opacity: ${({ show }) => (show ? 1 : 0)};
    ${setTransition('opacity')};
    gap: 8px;
    justify-content: flex-end;
    position: fixed;
    z-index: 2;
    right: ${extractProp('marginRight')}px;
    margin-top: 20px;
`

const ViewerButton = styled(Button)`
    margin: 0;
    background-color: ${getThemeColor(colors.black[850])};

    &:hover {
        background-color: ${getThemeColor(colors.black[850])};
    }

    &:active {
        background-color: ${getThemeColor(colors.black[830])};
    }
`
