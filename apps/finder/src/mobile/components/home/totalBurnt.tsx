import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import { useResources } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { klay } from '../../../functions/Functions'
import { finderStatusState, IFinderStatus } from '../../../states/status'

const TotalBurnt = () => {
    const {
        block_burnt: { accumulate_burnt },
    } = useRecoilValue<IFinderStatus>(finderStatusState)
    const { keyCurrency } = useResources()

    return (
        <Container direction="row">
            <BurntText>
                <EllipsisNumber value={klay(accumulate_burnt, undefined, 3)} noEllipsis />
            </BurntText>
            <UnitText>{keyCurrency.unit}</UnitText>
        </Container>
    )
}

const Container = styled(Flex)`
    align-items: baseline;
`

const BurntText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)`
    margin-right: 4px;
`

const UnitText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['10.14_400'],
        color: colors.black[500],
    }),
)``

export default TotalBurnt
