import styled from 'styled-components'

import { colors } from '@klaytn/slush'

import { TokenResponse } from '../../../api/token'
import EllipsisNumber from '../../../components/commons/ellipsisNumber'
import { FinderOutLink } from '../../../components/commons/finderLink'
import InfoTooltip from '../../../components/commons/infoTooltip'
import InnerCopy from '../../../components/commons/InnerCopy'
import LinkButton from '../../../components/LinkButton'
import NameHash from '../../../components/pc/nameHash'
import Summary, { SummaryContainer, SummaryUnit } from '../../../components/Summary'
import SummaryItem from '../../../components/SummaryItem'
import { SummaryTop, SummaryTopRow } from '../../../components/SummaryTop'
import { klay, withCommas } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

interface ITokenSummaryProps {
    token: TokenResponse
}

const TokenSummary = ({ token }: ITokenSummaryProps) => {
    const tooltipIconColor = useFinderThemeColor(colors.black[400])

    return (
        <SummaryContainer>
            <SummaryTop gap={16}>
                <SummaryTopRow title="Contract" titleWidth={138}>
                    <NameHash
                        hash={token.info.contractAddress}
                        decorator={
                            <InnerCopy value={token.info.contractAddress} message="Hash Copied." size={16} tooltip />
                        }
                    >
                        {token.info.contractAddress}
                    </NameHash>
                </SummaryTopRow>
            </SummaryTop>

            <Summary width={620}>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Name</SummaryItem.Key>
                    <SummaryItem.Value width={480}>{token.info.name}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Symbol</SummaryItem.Key>
                    <SummaryItem.Value width={480}>{token.info.symbol}</SummaryItem.Value>
                </SummaryItem>
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
                                    value={klay(token.burnAmount)}
                                    noEllipsis
                                />
                                <SummaryUnit unit={token.info.symbol} />
                            </>
                        }
                    >
                        <EllipsisNumber value={klay(token.totalSupply)} noEllipsis />
                        <SummaryUnit unit={token.info.symbol} />
                    </SummaryItem.Value>
                </SummaryItem>
            </Summary>
            <Summary width={480}>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Decimal</SummaryItem.Key>
                    <SummaryItem.Value width={320}>{token.info.decimal}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Official site</SummaryItem.Key>
                    <SummaryItem.Value width={320}>
                        {token.officialSite && (
                            <>
                                <FinderOutLink href={token.officialSite}>{token.officialSite}</FinderOutLink>
                                <LinkButton link={token.officialSite} />
                            </>
                        )}
                    </SummaryItem.Value>
                </SummaryItem>
                <SummaryItem freeHeight>
                    <SummaryItem.Key
                        width={120}
                        sub={
                            <SubDiv>
                                Burn transfer
                                <InfoTooltip
                                    message="This value is an estimate, so may contain error."
                                    color={tooltipIconColor}
                                    marginLeft={4}
                                />
                            </SubDiv>
                        }
                    >
                        Total transfer
                    </SummaryItem.Key>
                    <SummaryItem.Value
                        width={320}
                        sub={
                            <EllipsisNumber
                                integerColor={colors.black[300]}
                                value={withCommas(token.totalBurns)}
                                noEllipsis
                            />
                        }
                    >
                        {withCommas(token.totalTransfers)}
                    </SummaryItem.Value>
                </SummaryItem>
            </Summary>
        </SummaryContainer>
    )
}

const SubDiv = styled.div`
    display: flex;
    flex-direction: row;
`

export default TokenSummary
