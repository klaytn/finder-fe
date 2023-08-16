import styled, { CSSProperties } from 'styled-components'

import { typos, colors } from '@klaytn/slush'

import { getThemeColor } from '../../functions/colorMap'

export const PageTitle = styled.div`
    ${typos.suit['32.44_900']};
    color: ${getThemeColor(colors.white)};
`

export const PageTitleDesc = styled.div`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.black[500])};
`

export const PageSubTitle = styled.div<{ textAlign?: CSSProperties['textAlign'] }>`
    ${typos.suit['20.28_400']}
    color: ${getThemeColor(colors.white)};
    margin-top: 16px;
    text-align: ${({ textAlign }) => textAlign || 'left'};
`
