import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { colors, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { finderStatusState, IFinderStatus } from '../../../states/status'

const BlockHeight = () => {
    const { block_height: blockHeight } = useRecoilValue<IFinderStatus>(finderStatusState)

    return (
        <Link to={`/block/${blockHeight}`}>
            <BlockHeightText>#{blockHeight}</BlockHeightText>
        </Link>
    )
}

const BlockHeightText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)``

export default BlockHeight
