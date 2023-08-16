import { Dispatch, SetStateAction, useCallback } from 'react'
import styled from 'styled-components'

import { ChevronTopIcon, colors, delay, Flex, typos } from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../../../../functions/colorMap'

export const ControlContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'right',
})`
    gap: 20px;
`

export const ControlButton = styled.button`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    color: ${getThemeColor(colors.blue[400])};
    ${typos.suit['14.18_900']};
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
`

export const ExpandAllIcon = styled(ChevronTopIcon).attrs(
    getThemeColorOnAttrs({
        size: 16,
        color: colors.blue[400],
    }),
)``

type ResetButtonProps = {
    offAll(): void
    setInitialized: Dispatch<SetStateAction<boolean>>
}
export const ResetButton = ({ offAll, setInitialized }: ResetButtonProps) => {
    const handleReset = useCallback(async () => {
        offAll()
        setInitialized(false)
        await delay(100) // delay to call it again after it's rendered once
        setInitialized(true)
    }, [offAll, setInitialized])

    return <ControlButton onClick={handleReset}>Reset</ControlButton>
}
