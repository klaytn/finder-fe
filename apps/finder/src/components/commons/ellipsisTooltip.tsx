import EllipsisToolTip from 'ellipsis-tooltip-react-chan'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { colors, typos } from '@klaytn/slush'

import { useFinderThemeColorSet } from '../../hooks/useFinderThemeColor'

const TOOLTIP_CLASS_NAME = 'ellipsis-tooltip'

const TooltipCss = css`
    border-radius: 12px;
    ${typos.suit['12.16_400']};
`

const ELLIPSIS_TOOLTIP_OPTION = {
    effect: 'solid',
    place: 'bottom',
    className: TOOLTIP_CLASS_NAME,
}

type EllipsisTooltipProps = {
    children: ReactNode
}

const EllipsisTooltip = ({ children }: EllipsisTooltipProps) => {
    const colorSet = useFinderThemeColorSet({
        tooltip: {
            textColor: colors.blue[400],
            backgroundColor: colors.black[900],
        },
    })

    const tooltipOption = {
        ...ELLIPSIS_TOOLTIP_OPTION,
        ...colorSet.tooltip,
    }

    return (
        <Container>
            <EllipsisToolTip options={tooltipOption}>{children}</EllipsisToolTip>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    overflow: hidden;
    & .${TOOLTIP_CLASS_NAME} {
        ${TooltipCss}
    }
`

export default EllipsisTooltip
