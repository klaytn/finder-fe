/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react'

import usePrevious from '../../hooks/usePrevious'

export type Size = 'auto' | number | `${number}%`

const isNumber = (n: unknown): n is number => typeof n === 'number'
const isPercentage = (n: unknown): n is `${number}%` =>
    typeof n === 'string' && n[n.length - 1] === '%' && isNumber(n.substring(0, n.length - 1))

const hideContent = (container: HTMLElement, size: Size) => {
    if (size === 0 && container?.style) {
        container.style.display = 'none'
    }
}

const showContent = (container: HTMLElement, size: Size) => {
    if (size === 0 && container?.style) {
        container.style.display = ''
    }
}

type AnimationClasses = {
    animating: string
    animatingUp: string
    animatingDown: string
    animatingToSizeZero: string
    animatingToSizeAuto: string
    animatingToSizeSpecific: string
    static: string
    staticSizeZero: string
    staticSizeAuto: string
    staticSizeSpecific: string
}

const classPrefix = 'slush__collapse'

const ANIMATION_CLASSES: AnimationClasses = {
    animating: `${classPrefix}__animating`,
    animatingUp: `${classPrefix}__animating__up`,
    animatingDown: `${classPrefix}__animating__down`,
    animatingToSizeZero: `${classPrefix}__animating__zero`,
    animatingToSizeAuto: `${classPrefix}__animating__auto`,
    animatingToSizeSpecific: `${classPrefix}__specific`,
    static: `${classPrefix}__static`,
    staticSizeZero: `${classPrefix}__static__size__zero`,
    staticSizeAuto: `${classPrefix}__static__size__auto`,
    staticSizeSpecific: `${classPrefix}__static__size__specific`,
}

function getStaticStateClasses(animationStateClasses: AnimationClasses, size: Size) {
    return classNames({
        [animationStateClasses.static]: true,
        [animationStateClasses.staticSizeZero]: size === 0,
        [animationStateClasses.staticSizeSpecific]: size > 0,
        [animationStateClasses.staticSizeAuto]: size === 'auto',
    })
}

export enum CollapseDuration {
    short = 250,
    midium = 500,
    logn = 700,
}

type AnimatedCollapseProps = PropsWithChildren<{
    size: Size
    applyWidth?: boolean
    style?: CSSProperties
    duration?: CollapseDuration | number
    disbled?: boolean
}>

// Purpose: to animate a collapse when the size of the container's internal content changes.
const AnimatedCollapse = ({
    size,
    children,
    applyWidth = false,
    style = {},
    duration = CollapseDuration.midium,
    disbled = false,
}: AnimatedCollapseProps) => {
    const [currentSize, setCurrentSize] = useState(size)
    const prevSize = usePrevious<Size>(size)

    const contentElementRef = useRef<HTMLDivElement>(null)

    const animationClassesTimeoutID = useRef<ReturnType<typeof setTimeout>>()
    const timeoutId = useRef<ReturnType<typeof setTimeout>>()

    const stateClasses = useRef<AnimationClasses>(ANIMATION_CLASSES)

    const [animationStateClassNames, setAnimationStateClassNames] = useState<string>(
        getStaticStateClasses(stateClasses.current, size),
    )
    const [useTransitions, setUseTransitions] = useState<boolean>(false)

    useEffect(() => {
        contentElementRef.current && hideContent(contentElementRef.current, currentSize)
    }, [])

    const isCurrentSizeAuto = prevSize === 'auto'

    useEffect(() => {
        if (size !== prevSize && contentElementRef.current) {
            showContent(contentElementRef.current, prevSize)

            contentElementRef.current.style.overflow = 'hidden'
            const contentSize = applyWidth
                ? contentElementRef.current.scrollWidth
                : contentElementRef.current.offsetHeight
            contentElementRef.current.style.overflow = ''

            let nextSize: Size
            let afterSize: Size

            if (isNumber(size)) {
                nextSize = size < 0 ? 0 : size
                afterSize = nextSize
            } else if (isPercentage(size)) {
                nextSize = size === '0%' ? 0 : size
                afterSize = nextSize
            } else {
                nextSize = contentSize
                afterSize = 'auto'
            }

            if (isCurrentSizeAuto) {
                afterSize = nextSize
                nextSize = contentSize
            }

            const nextAnimationClasses = classNames({
                [stateClasses.current.animating]: true,
                [stateClasses.current.animatingUp]: prevSize === 'auto' || size < prevSize,
                [stateClasses.current.animatingDown]: size === 'auto' || size > prevSize,
                [stateClasses.current.animatingToSizeZero]: afterSize === 0,
                [stateClasses.current.animatingToSizeAuto]: afterSize === 'auto',
                [stateClasses.current.animatingToSizeSpecific]: afterSize > 0,
            })

            const afterAnimationClasses = getStaticStateClasses(stateClasses.current, afterSize)

            setCurrentSize(nextSize)
            setUseTransitions(!isCurrentSizeAuto)
            setAnimationStateClassNames(nextAnimationClasses)

            timeoutId.current && clearTimeout(timeoutId.current)
            animationClassesTimeoutID.current && clearTimeout(animationClassesTimeoutID.current)

            if (isCurrentSizeAuto) {
                timeoutId.current = setTimeout(() => {
                    setCurrentSize(afterSize)
                    setUseTransitions(true)
                }, 50)
                animationClassesTimeoutID.current = setTimeout(() => {
                    setAnimationStateClassNames(afterAnimationClasses)
                    setUseTransitions(false)
                    contentElementRef?.current && hideContent(contentElementRef.current, afterSize)
                }, duration)
            } else {
                timeoutId.current = setTimeout(() => {
                    setCurrentSize(afterSize)
                    setUseTransitions(false)

                    setAnimationStateClassNames(afterAnimationClasses)
                    if (size !== 'auto' && contentElementRef.current) {
                        hideContent(contentElementRef.current, nextSize)
                    }
                }, duration)
            }
        }
        return () => {
            timeoutId.current && clearTimeout(timeoutId.current)
            animationClassesTimeoutID.current && clearTimeout(animationClassesTimeoutID.current)
        }
    }, [size])

    if (disbled) {
        return <>{children}</>
    }

    const containerStyle: CSSProperties = {
        ...style,
        ...(applyWidth ? { width: currentSize, height: '100%' } : { height: currentSize, width: '100%' }),
        overflow: 'auto',
        ...(useTransitions &&
            applyWidth && { transition: `width ${duration}ms`, WebkitTransition: `width ${duration}ms` }),
        ...(useTransitions &&
            !applyWidth && { transition: `height ${duration}ms`, WebkitTransition: `height ${duration}ms` }),
    }

    return (
        <div style={containerStyle} className={animationStateClassNames}>
            <div ref={contentElementRef}>{children}</div>
        </div>
    )
}

export default AnimatedCollapse
