import { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, Flex, typos } from '@klaytn/slush'

import { ROUTES } from '../../constants/routes'
import { getThemeColor } from '../../functions/colorMap'

type NameHashProps = {
    children: ReactNode
    hash?: string
    decorator?: ReactNode
    padding?: CSSProperties['padding']
}
const NameHash = ({ padding, children, hash, decorator }: NameHashProps) => {
    return (
        <Hash padding={padding}>
            {hash ? <HashLink to={ROUTES.ACCOUNT.DETAIL.replace(':address', hash)}>{children}</HashLink> : children}
            {decorator}
        </Hash>
    )
}

const Hash = styled(Flex).attrs({
    direction: 'row',
    round: 16,
    justifyContent: 'center',
})<{ padding?: CSSProperties['padding'] }>`
    background-color: ${getThemeColor(colors.black[830])};
    padding: ${({ padding }) => padding || '8px 12px 8px 16px'};
    gap: 12px;
    align-items: center;
    height: 20px;
    ${typos.code['16.20_400']};
`

const HashLink = styled(Link)`
    color: ${getThemeColor(colors.white)};
    ${typos.code['16.20_400']};
`

export default NameHash
