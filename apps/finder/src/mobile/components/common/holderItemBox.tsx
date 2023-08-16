import styled from 'styled-components'

import {
    colors,
    Expander,
    ExpanderContents,
    ExpanderDescription,
    ExpanderHeader,
    Flex,
    Text,
    typos,
} from '@klaytn/slush'

import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { extractProp, klay } from '../../../functions/Functions'
import { HolderItem } from '../../../types/holderItem'
import Hash from './hash'

const getRankText = (rank: number) => {
    if (rank === 1) {
        return '1st'
    }

    if (rank === 2) {
        return '2nd'
    }

    if (rank === 3) {
        return '3rd'
    }

    return `${rank}th`
}

type HolderItemBoxProps = {
    rank: number
    hasToken?: boolean
    data: HolderItem
}

const HolderItemBox = ({ data, hasToken = false, rank }: HolderItemBoxProps) => {
    const { amount, percentage, holder } = data

    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderContainer direction="row">
                        <RankText>{getRankText(rank)}</RankText>
                        <PercentageText>{percentage}%</PercentageText>
                    </HeaderContainer>
                </ExpanderHeader>

                <ExpanderDescription>
                    <DescriptionContainer direction="row" justifyContent="space-between">
                        <Hash hash={holder.address} link={`/account/${holder.address}`} />
                    </DescriptionContainer>
                </ExpanderDescription>

                <ExpanderContents>
                    <TitleText marginTop={16}>Amount</TitleText>
                    <ValueText>
                        <EllipsisNumber value={hasToken ? klay(amount) : amount.toString()} noEllipsis />
                    </ValueText>
                </ExpanderContents>
            </Expander>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 8px;
`

const HeaderContainer = styled(Flex)`
    align-items: center;
`

const RankText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)`
    min-width: 40px;
`

const PercentageText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)``

const DescriptionContainer = styled(Flex)`
    margin-top: 12px;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)<{ marginTop?: number }>`
    margin-top: ${extractProp('marginTop')}px;
    margin-bottom: 8px;
`

const ValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)``

export default HolderItemBox
