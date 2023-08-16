import BigNumber from 'bignumber.js'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
    ArrowSquareOutIcon,
    Button,
    ButtonGroup,
    ChevronRightIcon,
    colors,
    ErrorIcon,
    Flex,
    If,
    Text,
    typos,
} from '@klaytn/slush'

import { useEventLogType } from '../../../api/common'
import Address from '../../../components/Address'
import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import FinderLink from '../../../components/commons/finderLink'
import InfoTooltip from '../../../components/commons/infoTooltip'
import InnerCopy from '../../../components/commons/InnerCopy'
import NameHash from '../../../components/pc/nameHash'
import { Tags } from '../../../components/pc/tags'
import Summary, { SummaryContainerWrapper, SummaryInnerContainer, SummaryUnit } from '../../../components/Summary'
import SummaryItem from '../../../components/SummaryItem'
import { SummaryTop, SummaryTopRow } from '../../../components/SummaryTop'
import { ROUTES } from '../../../constants/routes'
import { useFeatures } from '../../../context/configProvider'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { klay, withCommas } from '../../../functions/Functions'
import { toPascalCase } from '../../../functions/string'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { AccountVO } from '../../../vo/account'

export interface IAccountSummaryProps {
    account: AccountVO
    type: string
    subType?: string
}

const AccountSummary = ({ account, subType = '', type }: IAccountSummaryProps) => {
    const { showGasPrice = false, accountKey: accountKeyFeature = false } = useFeatures()
    const eventLogType = useEventLogType()
    const colorSet = useFinderThemeColorSet({
        error: colors.yellow[500],
        info: colors.blue[200],
        linkIcon: colors.white,
    })
    const {
        memo,
        contractCreator,
        knsLink,
        address,
        displayName,
        displayNameTitle,
        label,
        info: { implementationAddress } = {},
        governanceCouncil,
        tags,
        accountKey,
        shouldShowKeyDetails,
    } = account

    const nameHashPadding = displayName === label ? '8px 16px' : undefined

    const navigate = useNavigate()

    const handleGoToImplementationAccount = useCallback(() => {
        navigate(ROUTES.ACCOUNT.DETAIL.replace(':address', implementationAddress || ''))
    }, [implementationAddress, navigate])

    const query = useQuery()
    const eventLogTypeQuery = query.get('eventLogType')
    const handleGoToUpgradeHistory = useCallback(() => {
        const upgradeEventHash = eventLogType['upgraded']
        if (eventLogTypeQuery === upgradeEventHash) {
            return
        }
        navigate(`?tabId=eventLog&eventLogType=${upgradeEventHash}`)
    }, [navigate, eventLogType, eventLogTypeQuery])

    const implementationButtonItems = useMemo(
        () => [
            {
                display: 'Implementation Contract',
                rightIcon: ChevronRightIcon,
                onClick: handleGoToImplementationAccount,
                width: 225,
            },
            { display: 'History', onClick: handleGoToUpgradeHistory, width: 84 },
        ],
        [handleGoToImplementationAccount, handleGoToUpgradeHistory],
    )

    const handleKlaytnSquareButtonClick = useCallback(() => {
        if (!governanceCouncil) {
            return
        }

        window.open(governanceCouncil?.squareLink, '_blank', 'noopener')
    }, [governanceCouncil])

    const showTotalTxsCount = type !== 'Contract' || +account.totalTransactionCount !== 1

    return (
        <SummaryContainerWrapper>
            <SummaryTop divider gap={16}>
                {displayName && (
                    <SummaryTopRow
                        title={displayNameTitle}
                        titleWidth={160}
                        alignItems="center"
                        decorator={
                            !!governanceCouncil?.squareLink && (
                                <KlaytnSquareButton
                                    buttonType="forth"
                                    size={36}
                                    rightIcon={ArrowSquareOutIcon}
                                    onClick={handleKlaytnSquareButtonClick}
                                >
                                    View on the Klaytn Square
                                </KlaytnSquareButton>
                            )
                        }
                    >
                        <NameHash
                            padding={nameHashPadding}
                            decorator={
                                knsLink ? (
                                    <KnsLink href={knsLink} target="_blank" rel="noopener noreferrer">
                                        <ArrowSquareOutIcon size={16} color={colorSet.linkIcon} />
                                    </KnsLink>
                                ) : undefined
                            }
                        >
                            {displayName}
                        </NameHash>
                    </SummaryTopRow>
                )}

                {governanceCouncil ? (
                    <SummaryTopRow title="Address" titleWidth={160} alignItems="baseline">
                        <GCAddressColumn>
                            {governanceCouncil.nodeContracts.map((hash, index, { length }) => (
                                <GCAddress
                                    key={hash}
                                    hash={hash}
                                    currentHash={address}
                                    type="NODE"
                                    index={index}
                                    count={length}
                                />
                            ))}
                            {governanceCouncil.stakingContracts.map((hash, index, { length }) => (
                                <GCAddress
                                    key={hash}
                                    hash={hash}
                                    currentHash={address}
                                    type="STAKING"
                                    index={index}
                                    count={length}
                                />
                            ))}
                            {governanceCouncil.rewardContracts.map((hash, index, { length }) => (
                                <GCAddress
                                    key={hash}
                                    hash={hash}
                                    currentHash={address}
                                    type="REWARD"
                                    index={index}
                                    count={length}
                                />
                            ))}
                        </GCAddressColumn>
                    </SummaryTopRow>
                ) : (
                    <SummaryTopRow title="Address" titleWidth={160} alignItems="center">
                        <NameHash decorator={<InnerCopy value={address} message="Hash Copied." size={16} tooltip />}>
                            {address}
                        </NameHash>
                    </SummaryTopRow>
                )}

                {implementationAddress && (
                    <SummaryTopRow title="" titleWidth={155} marginTop={-4}>
                        <ButtonGroup items={implementationButtonItems} />
                    </SummaryTopRow>
                )}

                {tags.length > 0 && (
                    <SummaryTopRow title="" titleWidth={155} marginTop={-4}>
                        <Tags tags={tags} />
                    </SummaryTopRow>
                )}
            </SummaryTop>

            <SummaryInnerContainer marginTop={32}>
                <Summary width={620}>
                    {showGasPrice ? (
                        <BalanceColumn balance={account.balance} />
                    ) : (
                        showTotalTxsCount && (
                            <TotalTxsColumn
                                titleWidth={150}
                                countWidth={452}
                                totalTxCount={account.totalTransactionCount}
                            />
                        )
                    )}

                    {account.info !== undefined && subType && (
                        <SummaryItem>
                            <SummaryItem.Key width={150}>{subType} Info</SummaryItem.Key>
                            <SummaryItem.Value width={452}>
                                <div className="flex">
                                    {account.info?.icon && (
                                        <div style={{ marginRight: 12 }}>
                                            <TokenImage src={account.info?.icon} alt="token image" />
                                        </div>
                                    )}
                                    <div>
                                        <FinderLink to={`/${subType.toLowerCase()}/${account.address}`}>
                                            <DetailLink
                                                name={account.info?.name}
                                                symbol={account.info?.symbol}
                                                subType={subType}
                                            />
                                        </FinderLink>
                                    </div>
                                </div>
                            </SummaryItem.Value>
                        </SummaryItem>
                    )}

                    {accountKeyFeature && !!accountKey?.type && (
                        <SummaryItem>
                            <SummaryItem.Key width={150}>Key</SummaryItem.Key>
                            <SummaryItem.Value width={452}>
                                {accountKey.type}
                                {shouldShowKeyDetails && (
                                    <AccountKeyDetailLink to="?tabId=accountKey">
                                        Detail <ChevronRightIcon size={16} color={colors.blue[400]} />
                                    </AccountKeyDetailLink>
                                )}
                            </SummaryItem.Value>
                        </SummaryItem>
                    )}
                </Summary>
                <Summary width={586}>
                    {showTotalTxsCount && showGasPrice && (
                        <TotalTxsColumn
                            titleWidth={150}
                            countWidth={420}
                            totalTxCount={account.totalTransactionCount}
                        />
                    )}
                    {!!contractCreator && (
                        <SummaryItem>
                            <SummaryItem.Key width={150}>Contract Creator</SummaryItem.Key>
                            <SummaryItem.Value width={420}>
                                <Address value={contractCreator} big containerStyle={{ maxWidth: 177 }} shrink={0} />
                                <div style={{ margin: '0 12px 0 12px', flexShrink: 0, flexGrow: 1 }}>at TX</div>
                                <Address big noIcon value={account.contractCreatorTransactionHash} />
                            </SummaryItem.Value>
                        </SummaryItem>
                    )}
                </Summary>
            </SummaryInnerContainer>
            <If condition={!!memo}>
                <Row>
                    <ErrorIcon size={20} color={colorSet.error} />
                    <NullAddressText>{memo}</NullAddressText>
                </Row>
            </If>
        </SummaryContainerWrapper>
    )
}

type BalanceColumnProps = {
    balance: number | string | BigNumber
}
const BalanceColumn = ({ balance }: BalanceColumnProps) => {
    return (
        <SummaryItem>
            <SummaryItem.Key width={140}>Balance</SummaryItem.Key>
            <SummaryItem.Value width={452}>
                <EllipsisNumber value={klay(balance)} noEllipsis />
                <SummaryUnit />
            </SummaryItem.Value>
        </SummaryItem>
    )
}

type TotalTxsColumnProps = {
    totalTxCount: number
    titleWidth: number
    countWidth: number
}
const TotalTxsColumn = ({ totalTxCount, titleWidth, countWidth }: TotalTxsColumnProps) => {
    const infoColor = useFinderThemeColor(colors.blue[200])

    return (
        <SummaryItem>
            <SummaryItem.Key width={titleWidth}>
                Total TXs
                <InfoTooltip
                    color={infoColor}
                    size={20}
                    as="span"
                    marginLeft={4}
                    message={
                        <>
                            Total number of the transactions
                            <br />
                            which is occured from this account
                        </>
                    }
                />
            </SummaryItem.Key>
            <SummaryItem.Value width={countWidth}>
                <span>{withCommas(totalTxCount)}</span>
            </SummaryItem.Value>
        </SummaryItem>
    )
}

const KnsLink = styled.a`
    display: flex;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
`

const TokenImage = styled.img`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff;
`

const Row = styled(Flex).attrs({
    direction: 'row',
})`
    margin-top: 10px;
    gap: 8px;
    align-items: center;
`

const NullAddressText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.20_400'],
        color: colors.black[500],
    }),
)``

type DetailLinkProps = {
    name?: string
    symbol?: string
    subType: string
}
const DetailLink = ({ name, symbol, subType }: DetailLinkProps) => {
    const whiteColor = useFinderThemeColor(colors.white)
    if (name) {
        return (
            <>
                {name} ({symbol})
            </>
        )
    }

    return (
        <>
            view {subType} detail <ChevronRightIcon size={12} color={whiteColor} />
        </>
    )
}

const GCAddressColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
`

type GCAddressProps = {
    type: string
    hash: string
    currentHash: string
    index: number
    count: number
}
const GCAddress = ({ type, hash, currentHash, index, count }: GCAddressProps) => {
    const order = count > 1 ? ` ${index + 1}` : ''
    const title = `${toPascalCase(type)}${order}`
    return (
        <GCAddressContainer>
            <GCAddressType>{title}</GCAddressType>
            <NameHash
                hash={hash === currentHash ? undefined : hash}
                decorator={<InnerCopy value={hash} message="Hash Copied." size={16} tooltip />}
            >
                {hash}
            </NameHash>
        </GCAddressContainer>
    )
}

const GCAddressContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const GCAddressType = styled.div`
    display: flex;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['16.20_400']};
    width: 108px;
`

const KlaytnSquareButton = styled(Button)`
    width: 236px;
`

const AccountKeyDetailLink = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin-left: 12px;
    color: ${getThemeColor(colors.blue[400])};
    ${typos.suit['14.18_900']};
`

export default AccountSummary
