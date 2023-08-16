import { Player } from '@lottiefiles/react-lottie-player'
import { useMemo } from 'react'

import { ZIndex } from '../../styles/zIndex'
import { Overlay } from '../overlay'
import { Portal } from '../portal'
import lottieData from './progressCircle.json'

type ProgressCircleProps = {
    show: boolean
    size?: number
    overlay?: boolean
}

export const ProgressCircle = ({ show, size = 64, overlay = false }: ProgressCircleProps) => {
    const style = useMemo(
        () => ({
            width: size,
            height: size,
            zIndex: ZIndex.Progress,
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        }),
        [size],
    )

    if (!show) {
        return null
    }

    return (
        <>
            <Portal>
                <Player autoplay loop src={lottieData} style={style} />
            </Portal>
            <Overlay show={overlay} />
        </>
    )
}

type ProgressInnerCircleProps = {
    size?: number
}

export const ProgressInnerCircle = ({ size = 60 }: ProgressInnerCircleProps) => {
    const style = useMemo(
        () => ({
            width: size,
            height: size,
            zIndex: ZIndex.Progress,
            margin: `-${size / 2}px 0px`,
        }),
        [size],
    )

    return <Player autoplay loop src={lottieData} style={style} />
}
