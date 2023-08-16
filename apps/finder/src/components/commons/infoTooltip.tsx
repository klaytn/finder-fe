import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

import { CircleiconInfoOffIcon, Tooltip } from '@klaytn/slush'

import { extractProp } from '../../functions/Functions'

type As = Parameters<typeof Tooltip>[0]['as']

type InfoTooltipProps = {
    color: string
    message: ReactNode
    marginLeft?: number
    marginTop?: number
    size?: number
    as?: As
    alignItems?: CSSProperties['alignItems']
}

const InfoTooltip = ({
    message,
    color,
    size = 20,
    marginLeft = 0,
    marginTop = 0,
    as,
    alignItems,
}: InfoTooltipProps) => {
    return (
        <Container marginLeft={marginLeft} marginTop={marginTop} alignItems={alignItems}>
            <Tooltip as={as} message={message}>
                <CircleiconInfoOffIcon size={size} color={color} />
            </Tooltip>
        </Container>
    )
}

const Container = styled.div<{ marginLeft: number; marginTop: number; alignItems?: CSSProperties['alignItems'] }>`
    display: flex;
    margin-top: ${extractProp('marginTop')}px;
    margin-left: ${extractProp('marginLeft')}px;
    align-items: ${extractProp('alignItems')};
`

export default InfoTooltip
