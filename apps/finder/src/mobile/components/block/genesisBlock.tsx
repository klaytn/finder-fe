import { FC, useMemo } from 'react'
import styled from 'styled-components'

import { colors, Divider, Flex, neumorphism, noop, Tabs, Text, Theme, typos } from '@klaytn/slush'

import { useResources } from '../../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { formatDatetime, withCommas } from '../../../functions/Functions'
import { BlockVO } from '../../../vo/block'
import Hash from '../common/hash'
import TimesAgo from '../common/timesAgo'
import TitleRow from '../common/titleRow'

const TABS = [{ name: 'Overview', value: 'overview' }]

const GenesisBlockPage: FC = () => {
    const { genesisBlock } = useResources()

    const block = useMemo(() => BlockVO.from(genesisBlock), [genesisBlock])

    return (
        <>
            <TitleRow title="Genesis Block" marginBottom={18} />
            <TabContainer>
                <Tabs tabs={TABS} selected="overview" size="small" onChange={noop} />
            </TabContainer>

            <BackgroundImage src={genesisBlock.filepath} />

            <TabItemContainer>
                <Row marginBottom={2}>
                    <TitleText>Time</TitleText>
                    <ValueText>
                        <TimesAgo datetime={block.datetime} />
                    </ValueText>
                </Row>

                <RightRow marginBottom={16}>
                    <DateTimeText>({formatDatetime(block.datetime)})</DateTimeText>
                </RightRow>

                <Row marginBottom={8}>
                    <TitleText>Hash</TitleText>
                </Row>
                <Row marginBottom={27}>
                    <Hash hash={block.hash} copy />
                </Row>

                <Row marginBottom={24}>
                    <Divider />
                </Row>

                <Row marginBottom={16}>
                    <TitleText>Block size</TitleText>
                    <ValueText>{withCommas(block.size)} bytes</ValueText>
                </Row>

                <Row marginBottom={4}>
                    <TitleText>Names</TitleText>
                </Row>
                <Row marginBottom={0}>
                    <ValueText>{block.committee.blockProposer.label}</ValueText>
                </Row>
            </TabItemContainer>
        </>
    )
}

const TabContainer = styled(Flex)``

const BackgroundImage = styled.img`
    position: relative;
    top: -29px;
    left: -20px;
    width: calc(100% + 40px);
    mask-image: linear-gradient(black 0%, black 90%, transparent 100%);
`

const TabItemContainer = styled(Flex).attrs({
    round: 16,
})`
    position: relative;
    top: -60px;
    padding: 16px;
    background-color: ${getThemeColor(colors.black[870])};
    ${({ theme: { slush } }) => (slush === Theme.dark ? neumorphism.black2 : neumorphism.white1)};
`

const Row = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})<{ marginBottom: number }>`
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
`

const RightRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'flex-end',
})<{ marginBottom: number }>`
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.blue[200],
    }),
)``

const ValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)``

const DateTimeText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[500],
    }),
)``

export default GenesisBlockPage
