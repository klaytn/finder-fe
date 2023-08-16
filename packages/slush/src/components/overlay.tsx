import { FC, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import { displayNoneOnAnimationEnd, useAnimationEnd } from '../hooks/useAnimationEnd'
import { colors, withAlpha } from '../styles/colors'
import { ZIndex } from '../styles/zIndex'
import { Box } from './box'
import { Portal } from './portal'

type OverlayProps = {
    show: boolean
    onClick?: () => void
}

export const Overlay: FC<OverlayProps> = ({ show, onClick }) => {
    const { disabled, handleAnimationEnd } = useAnimationEnd(show)

    useEffect(() => {
        // iOS processing, just leave it as a comment for now
        // const ignoreEvent = (event: Event) => {
        //     event.preventDefault?.()
        // }

        function scrollDisable() {
            document.body.style.overflow = 'hidden'
            document.body.style.touchAction = 'none'
            // document.body.addEventListener('scroll', ignoreEvent)
            // document.body.addEventListener('touchmove', ignoreEvent)
            // document.body.addEventListener('mousewheel', ignoreEvent)
        }

        function scrollEnable() {
            document.body.style.overflow = ''
            document.body.style.touchAction = ''
            // document.body.removeEventListener('scroll', ignoreEvent)
            // document.body.removeEventListener('touchmove', ignoreEvent)
            // document.body.removeEventListener('mousewheel', ignoreEvent)
        }

        if (show) {
            scrollDisable()
        } else {
            scrollEnable()
        }

        return scrollEnable
    }, [show])

    return (
        <Portal>
            <Blind show={show} onAnimationEnd={handleAnimationEnd} disabled={disabled} onClick={onClick} />
        </Portal>
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

const Blind = styled(Box)<OverlayProps & { disabled: boolean }>`
    z-index: ${ZIndex.Overlay};
    background-color: ${withAlpha(colors.black[900], 85)};
    position: fixed;
    width: 100%;
    height: 100%;
    animation-fill-mode: forwards;
    animation: ${({ show }) => (show ? showIn : showOut)} 200ms;
    ${displayNoneOnAnimationEnd}
`
