import { IPlayerProps, Player } from '@lottiefiles/react-lottie-player'
import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Flex } from '../box'
import lottieData from './lottie.json'

type ToggleThemePros = {
    isDarkMode: boolean
    onToggle(): void
}

// Extract from exposed type because AnimationItem type is not exported
type AnimationItem = Parameters<Exclude<IPlayerProps['lottieRef'], undefined>>[0]

export const ToggleTheme = ({ isDarkMode, onToggle }: ToggleThemePros) => {
    const initialRef = useRef(true)
    const ref = useRef<Player>(null)

    useEffect(() => {
        ref.current?.setPlayerDirection(isDarkMode ? 1 : -1)
        ref.current?.play()
    }, [isDarkMode])

    const handleLottieInstance = useCallback(
        (instance: AnimationItem) => {
            if (!initialRef.current) {
                return
            }
            initialRef.current = false

            if (!isDarkMode) {
                return
            }

            // When first rendered in darkMode, render frozen at the last frame with no animation
            instance.goToAndStop(instance.totalFrames, true)
        },
        [isDarkMode],
    )

    return (
        <Container onClick={onToggle}>
            <Player ref={ref} src={lottieData} keepLastFrame autoplay={isDarkMode} lottieRef={handleLottieInstance} />
        </Container>
    )
}

const Container = styled(Flex)`
    width: 64px;
    height: 32px;
    cursor: pointer;
`
