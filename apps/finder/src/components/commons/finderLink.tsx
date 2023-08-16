import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { colors } from '@klaytn/slush'

import { getThemeColor } from '../../functions/colorMap'

const LinkStyle = css`
    color: ${getThemeColor(colors.white)};
    &:hover {
        text-decoration: underline;
    }
`

const FinderLink = styled(Link)`
    ${LinkStyle};
`

export const FinderOutLink = styled.a.attrs({
    target: '_blank',
    rel: 'noreferrer',
})`
    ${LinkStyle}
`

export default FinderLink
