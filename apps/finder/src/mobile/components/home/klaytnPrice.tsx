import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { getFixedLengthWithCommasNumber, klay } from '../../../functions/Functions'
import { finderKlayPriceState, IFinderKlayPrice } from '../../../states/price'

const KlaytnPrice = () => {
    const { usd_price, usd_price_changes } = useRecoilValue<IFinderKlayPrice>(finderKlayPriceState)

    return (
        <Container direction="row">
            <PriceText>${klay(usd_price)}</PriceText>
            <DiffText>
                ({Number(usd_price_changes) > 0 && '+'}
                {getFixedLengthWithCommasNumber(usd_price_changes, Number(usd_price_changes) > 0 ? 3 : 4)}%)
            </DiffText>
        </Container>
    )
}

const Container = styled(Flex)`
    align-items: center;
`

const PriceText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)`
    margin-right: 2px;
`

const DiffText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['10.14_400'],
        color: colors.red[500],
    }),
)``

export default KlaytnPrice
