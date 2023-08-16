import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, Expander, ExpanderContents, ExpanderHeader, Flex, If, Text, typos } from '@klaytn/slush'

import { useFeatures, useResources } from '../../../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { klay, withCommas } from '../../../../functions/Functions'
import { BlockListItemVO } from '../../../../vo/block'
import TimesAgo from '../../common/timesAgo'

type BlockItemProps = {
    block: BlockListItemVO
}

const BlockItem = ({
    block: { id, datetime, rewardKlay, size, totalTransactionCount, baseFeePerGas },
}: BlockItemProps) => {
    const stringId = id.toString()
    const { keyCurrency } = useResources()
    const { blockRewards = false, baseFee = false } = useFeatures()

    const gasUnit = keyCurrency.gasUnit ? ` (${keyCurrency.gasUnit})` : ''

    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderRow>
                        <BlockLink to={`/block/${stringId}`}>#{stringId}</BlockLink>
                        <TimesAgoText>
                            <TimesAgo datetime={datetime} />
                        </TimesAgoText>
                    </HeaderRow>
                </ExpanderHeader>

                <ExpanderContents>
                    <ContentsRow>
                        {baseFee && (
                            <ContentsColumn>
                                <LabelText>Base Fee{gasUnit}</LabelText>
                                <ValueText>{klay(baseFeePerGas)}</ValueText>
                            </ContentsColumn>
                        )}
                        <ContentsColumn>
                            <LabelText>Total TXs</LabelText>
                            <ValueText>{withCommas(totalTransactionCount)}</ValueText>
                        </ContentsColumn>
                    </ContentsRow>

                    <ContentsRow>
                        <If condition={blockRewards}>
                            <ContentsColumn>
                                <LabelText>Rewards{gasUnit}</LabelText>
                                <ValueText>{klay(rewardKlay)}</ValueText>
                            </ContentsColumn>
                        </If>
                        <ContentsColumn>
                            <LabelText>Size (BYTE)</LabelText>
                            <ValueText>{withCommas(size)}</ValueText>
                        </ContentsColumn>
                    </ContentsRow>
                </ExpanderContents>
            </Expander>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 8px;
`

const HeaderRow = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const BlockLink = styled(Link)`
    margin: 0px;
    padding: 0px;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['12.16_900']};
`

const TimesAgoText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)`
    margin-left: 16px;
`

const LabelText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)`
    margin-bottom: 8px;
`

const ContentsRow = styled(Flex).attrs({
    direction: 'row',
})`
    margin-top: 28px;
`

const ContentsColumn = styled(Flex).attrs({
    direction: 'column',
})`
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 15px;
    flex-shrink: 0;
    flex-basis: 50%;
`

const ValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export default BlockItem
