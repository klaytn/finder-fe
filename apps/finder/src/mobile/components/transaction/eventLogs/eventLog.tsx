import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { EventLogItem } from '../../../../api/transaction'
import InfoTooltip from '../../../../components/commons/infoTooltip'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'
import { EventLogVO } from '../../../../vo/eventLog'
import Hash from '../../common/hash'

type EventLogProps = {
    eventLog: EventLogVO
}

const EventLog = ({ eventLog: { contractAddress, type, items, isUnknownType, isEstimated } }: EventLogProps) => {
    const colorSet = useFinderThemeColorSet({
        background: colors.black[830],
        type: {
            known: colors.white,
            unknown: colors.black[300],
        },
    })

    return (
        <Container round={16} direction="column" backgroundColor={colorSet.background}>
            <TitleRow title="Contract" />
            <Flex>
                <Hash hash={contractAddress} link={`/account/${contractAddress}`} />
            </Flex>
            <TitleRow title="Event" marginTop={20} />
            <TypeRow>
                <Text
                    typo={typos.suit['12.16_900']}
                    color={isUnknownType ? colorSet.type.unknown : colorSet.type.known}
                >
                    {type}
                </Text>
                {isEstimated && <EstimatedEventTooltip />}
            </TypeRow>

            <ItemsContainer direction="row">
                <DepthColumn>
                    <Indent />
                </DepthColumn>
                <ItemsColumn direction="column">
                    {items.map((item, index) => (
                        <Item key={index} item={item} />
                    ))}
                </ItemsColumn>
            </ItemsContainer>
        </Container>
    )
}

const Container = styled(Flex)`
    padding: 16px;
    margin-bottom: 12px;
`

const ItemsContainer = styled(Flex)`
    margin-top: 8px;
`

const DepthColumn = styled(Flex)`
    margin-right: 10px;
`

const ItemsColumn = styled(Flex)``

const TypeRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5.5px;
`

type TitleRowProps = {
    title: string
    marginTop?: number
}
const TitleRow = ({ title, marginTop }: TitleRowProps) => {
    const color = useFinderThemeColor(colors.blue[300])

    return (
        <TitleRowContainer direction="row" marginTop={marginTop}>
            <Text typo={typos.suit['12.16_900']} color={color}>
                {title}
            </Text>
        </TitleRowContainer>
    )
}

const TitleRowContainer = styled(Flex)<{ marginTop?: number }>`
    margin-top: ${({ marginTop }) => marginTop}px;
    margin-bottom: 8px;
`

const Indent = () => {
    const color = useFinderThemeColor(colors.white)

    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 3C3.20711 3 3.375 3.16789 3.375 3.375V8.25H9.75C9.95711 8.25 10.125 8.41789 10.125 8.625C10.125 8.83211 9.95711 9 9.75 9H3C2.79289 9 2.625 8.83211 2.625 8.625V3.375C2.625 3.16789 2.79289 3 3 3Z"
                fill={color}
            />
        </svg>
    )
}

type ItemProps = {
    item: EventLogItem
}

const Item = ({ item: { name, value } }: ItemProps) => {
    const color = useFinderThemeColor(colors.black[400])

    return (
        <ItemBox direction="row" justifyContent="flex-start">
            <ItemTitleText typo={typos.suit['12.16_900']} color={color}>
                {name}
            </ItemTitleText>
            <ItemValueText typo={typos.suit['12.16_400']} color={color} style={{ flexGrow: 1 }}>
                {value}
            </ItemValueText>
        </ItemBox>
    )
}

const ItemBox = styled(Flex)`
    margin-bottom: 8px;
    gap: 8px;
    flex-basis: content;
`

const ItemTitleText = styled(Text)`
    min-width: 56px;
    flex-basis: content;
`

const ItemValueText = styled(Text)`
    word-break: break-all;
    flex-basis: 0;
`

const EstimatedEventTooltip = () => {
    const iconColor = useFinderThemeColor(colors.white)
    return <InfoTooltip size={16} color={iconColor} message="This is an estimated event" />
}

export default EventLog
