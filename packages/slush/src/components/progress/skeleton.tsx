import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

import { colors } from '../../styles/colors'

type SkeletonProps = {
    show: boolean
    children: ReactNode
}

export const Skeleton = ({ show, children }: SkeletonProps) => {
    if (!show) {
        return <>{children}</>
    }

    return <SkeletonSpan />
}

const shimmer = keyframes`
    0% {
        background-position: 100% 0%;
    }

    100% {
      background-position: -100% 0%;
    }
`

const SkeletonSpan = styled.span`
    position: relative;
    width: 100%;
    height: 100%;

    background-size: 200% 100%;
    background-image: linear-gradient(
        130deg,
        ${colors.black[200]} 0%,
        ${colors.black[200]} 10%,
        ${colors.black[50]} 25%,
        ${colors.black[50]} 30%,
        ${colors.black[200]} 45%,
        ${colors.black[200]} 100%
    );
    animation: ${shimmer} 1.5s ease infinite;
`
