import Axios from 'axios'
import format from 'date-fns/format'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Button, colors, delay, Flex, RefreshIcon, Toast, useToggle } from '@klaytn/slush'

import { refreshNftItem } from '../../../api/nft'
import Address from '../../../components/Address'
import Copy from '../../../components/commons/Copy'
import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import InfoTooltip from '../../../components/commons/infoTooltip'
import InnerCopy from '../../../components/commons/InnerCopy'
import NameHash from '../../../components/pc/nameHash'
import Summary, { SummaryContainer, SummaryUnit } from '../../../components/Summary'
import SummaryItem from '../../../components/SummaryItem'
import { SummaryTop, SummaryTopRow } from '../../../components/SummaryTop'
import { klay, withCommas } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { NftItemDetailVO } from '../../../vo/nft'

import styles from './NftItemSummary.module.css'

const DATE_FORMAT = 'yyyy.MM.dd hh.mm aa'

interface NftSummaryProps {
    nftItem: NftItemDetailVO
    reloadNftItem: () => Promise<void>
}

const NftItemSummary = (props: NftSummaryProps) => {
    return props.nftItem.isLightType ? <NftItemLightSummary {...props} /> : <NftItemDefaultSummary {...props} />
}

const NftItemDefaultSummary = ({ nftItem, reloadNftItem }: NftSummaryProps) => {
    const {
        info: { name, symbol, contractAddress },
        id,
        uri,
        totalSupply,
        holder: { address } = {},
        tokenUriUpdatedAt,
    } = nftItem

    return (
        <SummaryContainer>
            <SummaryTop gap={16}>
                <SummaryTopRow title="Contract" titleWidth={138}>
                    <NameHash
                        hash={contractAddress}
                        decorator={<InnerCopy value={contractAddress} message="Hash Copied." size={16} tooltip />}
                    >
                        {contractAddress}
                    </NameHash>
                </SummaryTopRow>
            </SummaryTop>

            <Summary width={620}>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Name</SummaryItem.Key>
                    <SummaryItem.Value width={480}>{name}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Symbol</SummaryItem.Key>
                    <SummaryItem.Value width={480}>{symbol}</SummaryItem.Value>
                </SummaryItem>
                {address && (
                    <SummaryItem>
                        <SummaryItem.Key width={120}>Holder</SummaryItem.Key>
                        <SummaryItem.Value width={480}>
                            <Address value={address} noIcon big />
                        </SummaryItem.Value>
                    </SummaryItem>
                )}
            </Summary>
            <Summary width={480}>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Token ID</SummaryItem.Key>
                    <SummaryItem.Value width={380}>
                        <span className={styles.ellipsis} style={{ width: 380 }}>
                            {id}
                        </span>
                    </SummaryItem.Value>
                </SummaryItem>
                <SummaryItem hasSub={!!tokenUriUpdatedAt}>
                    <SummaryItem.Key sub={tokenUriUpdatedAt && <br />} width={120}>
                        Token URI
                    </SummaryItem.Key>
                    <SummaryItem.Value
                        width={380}
                        sub={tokenUriUpdatedAt && `Last updated at ${format(tokenUriUpdatedAt, DATE_FORMAT)}`}
                    >
                        <Flex direction="row" className={styles.flex_center}>
                            <span className={styles.ellipsis} style={{ width: 280 }}>
                                {uri}
                            </span>
                            <Copy value={uri} message="Token URI Copied." noMargin />
                            <RefreshTokenUriButton nftItem={nftItem} reloadNftItem={reloadNftItem} />
                        </Flex>
                    </SummaryItem.Value>
                </SummaryItem>
                {totalSupply !== undefined && (
                    <SummaryItem>
                        <SummaryItem.Key width={120}>Total Supply</SummaryItem.Key>
                        <SummaryItem.Value width={380}>{totalSupply}</SummaryItem.Value>
                    </SummaryItem>
                )}
            </Summary>
        </SummaryContainer>
    )
}

const NftItemLightSummary = ({ nftItem, reloadNftItem }: NftSummaryProps) => {
    const {
        info: { contractAddress, symbol },
        id,
        uri,
        burnAmount,
        totalSupply,
        tokenUriUpdatedAt,
    } = nftItem

    const tooltipIconColor = useFinderThemeColor(colors.black[400])

    return (
        <SummaryContainer>
            <SummaryTop gap={16}>
                <SummaryTopRow title="Contract" titleWidth={138}>
                    <NameHash
                        hash={contractAddress}
                        decorator={<InnerCopy value={contractAddress} message="Hash Copied." size={16} tooltip />}
                    >
                        {contractAddress}
                    </NameHash>
                </SummaryTopRow>
            </SummaryTop>

            <Summary width={620}>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Token ID</SummaryItem.Key>
                    <SummaryItem.Value width={480}>
                        <span className={styles.ellipsis} style={{ width: 320 }}>
                            {id}
                        </span>
                    </SummaryItem.Value>
                </SummaryItem>
            </Summary>
            <Summary width={480}>
                <SummaryItem hasSub={!!tokenUriUpdatedAt}>
                    <SummaryItem.Key sub={tokenUriUpdatedAt && <br />} width={120}>
                        Token URI
                    </SummaryItem.Key>
                    <SummaryItem.Value
                        width={320}
                        sub={tokenUriUpdatedAt && `Last updated at ${format(tokenUriUpdatedAt, DATE_FORMAT)}`}
                    >
                        <Flex direction="row" className={styles.flex_center}>
                            <span className={styles.ellipsis} style={{ width: 280 }}>
                                {uri}
                            </span>
                            <Copy value={uri} message="Token URI Copied." />
                            <RefreshTokenUriButton nftItem={nftItem} reloadNftItem={reloadNftItem} />
                        </Flex>
                    </SummaryItem.Value>
                </SummaryItem>

                {totalSupply !== undefined && (
                    <SummaryItem freeHeight>
                        <SummaryItem.Key
                            width={120}
                            sub={
                                <SubDiv>
                                    Burn amount
                                    <InfoTooltip
                                        message="This value is an estimate, so may contain error."
                                        color={tooltipIconColor}
                                        marginLeft={4}
                                    />
                                </SubDiv>
                            }
                        >
                            Total supply
                        </SummaryItem.Key>
                        <SummaryItem.Value
                            width={480}
                            sub={
                                <>
                                    <EllipsisNumber
                                        integerColor={colors.black[300]}
                                        value={klay(burnAmount)}
                                        noEllipsis
                                    />
                                    <SummaryUnit unit={symbol} />
                                </>
                            }
                        >
                            {withCommas(totalSupply)}
                            <SummaryUnit unit={symbol} />
                        </SummaryItem.Value>
                    </SummaryItem>
                )}
            </Summary>
        </SummaryContainer>
    )
}

const SubDiv = styled.div`
    display: flex;
    flex-direction: row;
`

type RefreshStatus = 'READY' | 'REQUESTED' | 'UPDATED' | 'ALREADY_REQUESTED' | 'UNKNOWN_ERROR'
const REFRESH_STATUS_TO_MESSAGE_MAP = {
    READY: '',
    REQUESTED: 'Successfully listed update on the queue. It will be automatically refreshed when updated.',
    UPDATED: 'Token URI updated.',
    ALREADY_REQUESTED: 'Already on update. It will be automatically refreshed when updated.',
    UNKNOWN_ERROR: 'Unexpected error occurred. Please try again.',
} as const
const REFRESH_STATUS_TO_COLOR_MAP = {
    READY: 'green',
    REQUESTED: 'green',
    UPDATED: 'blue',
    ALREADY_REQUESTED: 'red',
    UNKNOWN_ERROR: 'red',
} as const
const REFRESH_TOAST_DURATION_MS = 2500
const REFRESH_TOAST_WAIT_MS = REFRESH_TOAST_DURATION_MS + 500

type RefreshTokenUriButtonProps = {
    nftItem: NftItemDetailVO
    reloadNftItem: () => Promise<void>
}
const RefreshTokenUriButton = ({ nftItem, reloadNftItem }: RefreshTokenUriButtonProps) => {
    const { on, off, isShow } = useToggle()
    const [status, setStatus] = useState<RefreshStatus>('READY')

    const message = useMemo(() => REFRESH_STATUS_TO_MESSAGE_MAP[status], [status])
    const color = useMemo(() => REFRESH_STATUS_TO_COLOR_MAP[status], [status])

    const address = nftItem.info.contractAddress
    const tokenId = nftItem.id

    const handleRefresh = useCallback(async () => {
        try {
            setStatus('REQUESTED')
            on()
            await refreshNftItem(address, tokenId)

            await delay(REFRESH_TOAST_WAIT_MS)
            await reloadNftItem()
            setStatus('UPDATED')
        } catch (err) {
            if (Axios.isAxiosError(err) && err.response?.status === 400) {
                setStatus('ALREADY_REQUESTED')

                await delay(REFRESH_TOAST_WAIT_MS)
                await reloadNftItem()
                setStatus('UPDATED')
            } else {
                setStatus('UNKNOWN_ERROR')
            }
        } finally {
            on()

            await delay(REFRESH_TOAST_WAIT_MS)
            setStatus('READY')
        }
    }, [address, tokenId, on, reloadNftItem])

    return (
        <>
            <Toast
                message={message}
                show={isShow}
                onClose={off}
                width={240}
                color={color}
                duration={REFRESH_TOAST_DURATION_MS}
            />
            <BlockButton
                leftIcon={RefreshIcon}
                disabled={status !== 'READY'}
                buttonType="forth"
                size={28}
                onClick={handleRefresh}
            />
        </>
    )
}
const BlockButton = styled(Button)`
    border-radius: 10px;
    margin: 3px;
`

export default NftItemSummary
