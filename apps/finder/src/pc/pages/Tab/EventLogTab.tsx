import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import {
    ArrowcomboLeftrightIcon,
    Button,
    colors,
    delay,
    Flex,
    IndentDownrightIcon,
    Label,
    Refresh2ArrowsIcon,
    setTransition,
    Text,
    typos,
    useToggle,
} from '@klaytn/slush'

import { getAccountEventLogs } from '../../../api/account'
import { AddressInfo, defaultPage, Paging } from '../../../api/api'
import { getEventLogs } from '../../../api/transaction'
import Address from '../../../components/Address'
import Empty from '../../../components/commons/empty'
import InfoTooltip from '../../../components/commons/infoTooltip'
import ListCount from '../../../components/commons/listCount'
import Page from '../../../components/Page'
import { EventLogTypeFilter } from '../../../components/pc/eventLogTypeFilter'
import { useServerConfig } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { EventLogVO } from '../../../vo/eventLog'

const RESET_QUERY_LIST = ['page']
export interface IEventLogTabProps {
    tabId: string
    txHash?: string
    address?: string
    showTx?: boolean
}

const EventLogTab = ({ tabId, txHash, address, showTx = false }: IEventLogTabProps) => {
    const query = useQuery()
    const [eventLogs, setEventLogs] = useState<EventLogVO[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const [isLoaded, setIsLoaded] = useState(false)
    const {
        paging: { limit },
    } = useServerConfig()

    const page = query.get('page') || '1'
    const eventLogType = query.get('eventLogType') || ''

    const fetchEventLogs = async (txHash: string, page: string, signature?: string) => {
        getEventLogs(txHash, page, signature).then((rsp) => {
            setEventLogs(rsp.data.results.map((item) => new EventLogVO(item)))
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    const fetchAccountEventLogs = async (address: string, page: string, signature?: string) => {
        getAccountEventLogs(address, page, signature).then((rsp) => {
            setEventLogs(rsp.data.results.map((item) => new EventLogVO(item)))
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        if (txHash) {
            fetchEventLogs(txHash, page, eventLogType)
        }

        if (address) {
            fetchAccountEventLogs(address, page, eventLogType)
        }
    }, [txHash, address, page, eventLogType])

    if (!isLoaded) {
        return null
    }

    // eventLog will be deployed later, so use default until then
    const limitCount = limit.eventLog || limit.default

    const isEmpty = paging.totalCount === 0

    return (
        <div>
            <HeaderContainer>
                {isEmpty ? <div /> : <ListCount limitCount={limitCount} totalCount={paging.totalCount} />}
                <EventLogTypeFilter resetQueryList={RESET_QUERY_LIST} />
            </HeaderContainer>
            {isEmpty ? (
                <Empty />
            ) : (
                <>
                    <div>
                        {eventLogs.map((eventLog, index) => {
                            const marginTop = index === 0 ? 0 : 40

                            return (
                                <div key={index} style={{ marginTop: marginTop }}>
                                    <EventLogCard eventLog={eventLog} showTx={showTx} />
                                </div>
                            )
                        })}
                    </div>
                    <Page current={paging.currentPage} total={paging.totalPage} query={{ tabId, eventLogType }} />
                </>
            )}
        </div>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
`

interface IEventLogCardProps {
    showTx: boolean
    eventLog: EventLogVO
}

const EventLogCard = ({ showTx, eventLog }: IEventLogCardProps) => {
    const { on, off, isShow } = useToggle()
    const { toggle: switchToggle, isShow: showEncoded } = useToggle()
    const hasMouse = useRef(false)

    const handleMouseEnter = useCallback(async () => {
        hasMouse.current = true

        await delay(300) // If the mouse is still hovering after 300ms, on()
        if (!hasMouse.current) {
            return
        }
        on()
    }, [on])

    const handleMouseLeave = useCallback(() => {
        hasMouse.current = false
        off()
    }, [off])

    return (
        <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <EventContract contractAddress={eventLog.contractAddress} contractAccount={eventLog.contractAccount} />
            <EventDetail eventLog={eventLog} showEncoded={showEncoded} />
            {showTx && eventLog.hasTxInfo && <TxInfo txHash={eventLog.txHash} blockNumber={eventLog.blockNumber} />}
            {!eventLog.isUnknownType && <FloatingToggleButton onClick={switchToggle} show={isShow} />}
        </Card>
    )
}

interface IEventContractProps {
    contractAddress: string
    contractAccount?: AddressInfo
}

const EventContract = ({ contractAddress, contractAccount }: IEventContractProps) => {
    return (
        <div className="flex">
            <CardTitle>Contract</CardTitle>
            <div>
                <Address value={contractAccount || contractAddress} />
            </div>
        </div>
    )
}

interface IEventDetailProps {
    showEncoded: boolean
    eventLog: EventLogVO
}

const EventDetail = ({
    showEncoded,
    eventLog: { type, items, isEstimated, signature, topics, data },
}: IEventDetailProps) => {
    const isUnknownType = type === 'Unknown'

    const iconColor = useFinderThemeColor(colors.white)

    const query = useQuery()
    const navigate = useNavigate()

    const handleTypeClick = useCallback(() => {
        if (!signature) {
            return
        }

        query.delete('page')
        query.set('eventLogType', signature)
        navigate('?' + query.toString())
    }, [query, signature, navigate])

    const dataList = useMemo(() => {
        if (!showEncoded) {
            if (type !== 'Unknown') {
                return items
            }

            return items.map((item) => ({
                ...item,
                name: item.name.toLowerCase(),
            }))
        }

        return [
            ...topics.map((topic, topicIndex) => ({
                name: `topic ${topicIndex}`,
                value: topic,
            })),
            {
                name: 'data',
                value: data,
            },
        ]
    }, [showEncoded, items, topics, data, type])

    return (
        <div className="flex" style={{ marginTop: 22 }}>
            <CardTitle>Event</CardTitle>
            <div>
                <EventName isUnknownType={isUnknownType}>
                    <EventTypeName onClick={handleTypeClick}>{type}</EventTypeName>{' '}
                    {isEstimated && <EstimatedEventTooltip />}
                </EventName>
                <Event>
                    {dataList.map((data, index) => {
                        return (
                            <div key={index} className="flex" style={{ marginTop: 8 }}>
                                <EventParam style={{ width: 24 }}>
                                    {index === 0 && <IndentDownrightIcon size={16} color={iconColor} />}
                                </EventParam>
                                <EventParam style={{ minWidth: 72, marginRight: 6 }}>{data.name}</EventParam>
                                <EventValue>{data.value}</EventValue>
                            </div>
                        )
                    })}
                </Event>
            </div>
        </div>
    )
}

const EventTypeName = styled.span`
    cursor: pointer;
`

const EstimatedEventTooltip = () => {
    const methodColor = useFinderThemeColor(colors.white)

    return (
        <InfoTooltip
            marginLeft={5.5}
            marginTop={1}
            size={16}
            color={methodColor}
            message="This is an estimated event"
        />
    )
}

interface ITxInfoProps {
    txHash: string
    blockNumber: number
}

const TxInfo = ({ txHash, blockNumber }: ITxInfoProps) => {
    const { icon, text } = useFinderThemeColorSet({
        icon: colors.blue[500],
        text: colors.white,
    })
    return (
        <FloatingContent>
            <FloatingFlex justifyContent="flex-start">
                <IconBox>
                    <ArrowcomboLeftrightIcon size={20} color={icon} />
                </IconBox>
                <Label color="blue" size="medium">
                    <LabelLink to={`/tx/${txHash}`}>{txHash}</LabelLink>
                </Label>
            </FloatingFlex>
            <FloatingFlex justifyContent="flex-end">
                <Text typo={typos.suit['14.18_400']} color={text}>
                    at{' '}
                    <BlockNumber color={text}>
                        Block
                        <BlockLink to={`/block/${blockNumber}`}> #{blockNumber}</BlockLink>
                    </BlockNumber>
                </Text>
            </FloatingFlex>
        </FloatingContent>
    )
}

const BlockLink = styled(Link)`
    color: inherit;
`

const LabelLink = styled(Link)`
    color: inherit;
    ${typos.code['12.16_400']}
`

const BlockNumber = styled(Text).attrs({
    typo: typos.suit['14.18_900'],
})``

const FloatingFlex = styled(Flex).attrs({
    direction: 'row',
})`
    &:last-child {
        margin-top: 10px;
    }
`

const FloatingContent = styled.div`
    position: absolute;
    top: 24px;
    right: 36px;
`

const IconBox = styled.span`
    margin-right: 8px;
`

const Card = styled.div`
    padding: 24px 36px 24px 36px;
    background: ${getThemeColor(colors.black[830])};
    border-radius: 30px;
    position: relative;
`

const CardTitle = styled.div`
    ${typos.suit['14.18_900']};
    color: ${getThemeColor(colors.blue[300])};
    width: 80px;
`

const EventName = styled.div<{ isUnknownType: boolean }>`
    ${typos.suit['14.18_900']};
    color: ${getThemeColor(({ isUnknownType }) => (isUnknownType ? colors.black[300] : colors.white))};
    display: flex;
    flex-direction: row;
`

const Event = styled.div`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.black[400])};
`

const EventParam = styled.div`
    font-weight: bold;
`

const EventValue = styled.div`
    width: 1022px;
    word-break: break-all;
    word-wrap: break-word;
    ${typos.code['14.18_400']};
`

type FloatingToggleButtonProps = {
    onClick: () => void
    show: boolean
}

const FloatingToggleButton = ({ onClick, show }: FloatingToggleButtonProps) => {
    return (
        <FloatingToggleButtonContainer show={show}>
            <Button leftIcon={Refresh2ArrowsIcon} buttonType="third" size={32} onClick={onClick} />
        </FloatingToggleButtonContainer>
    )
}

const FloatingToggleButtonContainer = styled.div<{ show: boolean }>`
    display: flex;
    position: absolute;
    top: 18px;
    right: -20px;
    opacity: ${({ show }) => (show ? 1 : 0)};
    ${setTransition('opacity')};
`

export default EventLogTab
