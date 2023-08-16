import { useEffect, useState } from 'react'
import { css, CSSProperties } from 'styled-components'

import { noop } from '../utils/common'

export const useAnimationEnd = (show = false, onAnimationEnd = noop) => {
    const [disabled, setDisabled] = useState(!show)

    useEffect(() => {
        if (show) {
            setDisabled(false)
        }
    }, [show])

    const handleAnimationEnd = () => {
        if (!show) {
            setDisabled(true)
            onAnimationEnd()
        }
    }

    return {
        disabled,
        handleAnimationEnd,
    }
}

type AnimationProps = {
    disabled: boolean
    displayOnNormal?: CSSProperties['display']
}

export const displayNoneOnAnimationEnd = css<AnimationProps>`
    display: ${({ disabled, displayOnNormal = 'block' }) => (disabled ? 'none' : displayOnNormal)};
`
