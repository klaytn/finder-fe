import { CSSProperties, forwardRef, ReactNode } from 'react'
import ReactTooltip, { Effect, Place } from 'react-tooltip'
import styled from 'styled-components'

import { useUniqueId } from '../hooks/useUniqueId'
import { Shadow, shadows } from '../styles/shadows'
import { typos } from '../styles/typos'
import { ZIndex } from '../styles/zIndex'
import { useTheme } from '../themes/provider'
import { Text } from './text'

type TooltipOverrideProps = {
    color?: {
        text?: string
        background?: string
    }
    shadow?: Shadow
}

type TooltipProps = {
    message: ReactNode
    override?: TooltipOverrideProps
    direction?: Place
    effect?: Effect
    as?: string | React.ComponentType<unknown>
    onClick?: () => void
    children: ReactNode
    containerAlign?: CSSProperties['justifyContent']
}

const TOOLTIP_CLASS_NAME = 'SLUSH_TOOLTIP_CLASS_NAME'

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
    (
        {
            message,
            override,
            direction = 'bottom',
            effect = 'solid',
            children,
            as = 'div',
            onClick,
            containerAlign = 'center',
        },
        ref,
    ) => {
        const { tooltip } = useTheme()

        const uniqueId = useUniqueId()

        return (
            // The ref type has an internal conflict and is treated as any
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <OuterContainer as={as} ref={ref as any}>
                <HoverArea data-tip={message} data-for={uniqueId} onClick={onClick} justifyContent={containerAlign}>
                    {children}
                </HoverArea>

                {!!message && (
                    <ReactTooltip
                        id={uniqueId}
                        effect={effect}
                        place={direction}
                        className={TOOLTIP_CLASS_NAME}
                        backgroundColor={override?.color?.background || tooltip.background}
                        css={{
                            position: 'fixed',
                        }}
                    >
                        <TextBox typo={typos.suit['12.16_400']} color={override?.color?.text || tooltip.text}>
                            {message}
                        </TextBox>
                    </ReactTooltip>
                )}
            </OuterContainer>
        )
    },
)

Tooltip.displayName = 'Tooltip'

const OuterContainer = styled.div`
    & .${TOOLTIP_CLASS_NAME} {
        ${({ theme }) => shadows[theme.tooltip.shadow]}
        border-radius: 12px;
        z-index: ${ZIndex.Tooltip};

        &.show {
            opacity: 1 !important;
        }
    }
`

const TextBox = styled(Text)`
    margin: 0;
    padding: 0;
    min-width: 84px;
    pointer-events: none;
    user-select: none;
    word-break: keep-all;
    white-space: nowrap;
    z-index: ${ZIndex.Tooltip};
`

const HoverArea = styled.div<{ justifyContent: CSSProperties['justifyContent'] }>`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent};
`
