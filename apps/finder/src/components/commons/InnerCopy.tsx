import { ReactNode, useCallback } from 'react'
import styled from 'styled-components'

import { colors, CopyIcon, Flex, Toast, Tooltip } from '@klaytn/slush'

import { copy } from '../../functions/Functions'
import { useFinderThemeColorSet } from '../../hooks/useFinderThemeColor'
import { useToggle } from '../../hooks/useToggle'

type InnerCopyProps = {
    value: string
    message: string
    children?: ReactNode
    size?: number
    color?: string
    tooltip?: boolean
}

const InnerCopy = ({ value, message, color = colors.white, size = 14, tooltip = false }: InnerCopyProps) => {
    const { isShow, on, off } = useToggle()

    const handleCopy = useCallback(() => {
        copy(value)
        on()
    }, [value, on])

    const colorSet = useFinderThemeColorSet({
        icon: color,
    })

    return (
        <>
            {tooltip ? (
                <Tooltip message="click to copy" onClick={handleCopy}>
                    <NonBlockDiv>
                        <CopyIcon size={size} color={colorSet.icon} />
                    </NonBlockDiv>
                </Tooltip>
            ) : (
                <NonBlockDiv onClick={handleCopy}>
                    <CopyIcon size={size} color={colorSet.icon} />
                </NonBlockDiv>
            )}
            <Toast message={message} show={isShow} onClose={off} />
        </>
    )
}

const NonBlockDiv = styled(Flex).attrs({
    justifyContent: 'center',
})`
    align-items: center;
    cursor: pointer;
`

export default InnerCopy
