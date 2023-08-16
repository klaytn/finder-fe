import { ReactNode, useMemo } from 'react'

import Copy from '../../../components/commons/Copy'
import { FinderOutLink } from '../../../components/commons/finderLink'
import InnerCopy from '../../../components/commons/InnerCopy'
import LinkButton from '../../../components/LinkButton'
import NameHash from '../../../components/pc/nameHash'
import Summary, { SummaryContainer, SummaryUnit } from '../../../components/Summary'
import SummaryItem from '../../../components/SummaryItem'
import { SummaryTop, SummaryTopRow } from '../../../components/SummaryTop'
import { withCommas } from '../../../functions/Functions'
import { split } from '../../../functions/group'
import { NftDetailVO } from '../../../vo/nft'

interface INftSummaryProps {
    nft: NftDetailVO
}

const NftSummary = ({ nft }: INftSummaryProps) => {
    return nft.isLightType ? <NftLightSummary nft={nft} /> : <NftDefaultSummary nft={nft} />
}

const NftDefaultSummary = ({ nft }: INftSummaryProps) => {
    return (
        <SummaryContainer>
            <SummaryTop gap={16}>
                <SummaryTopRow title="Contract" titleWidth={138}>
                    <NameHash
                        hash={nft.info.contractAddress}
                        decorator={
                            <InnerCopy value={nft.info.contractAddress} message="Hash Copied." size={16} tooltip />
                        }
                    >
                        {nft.info.contractAddress}
                    </NameHash>
                </SummaryTopRow>
            </SummaryTop>

            <Summary width={620}>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Name</SummaryItem.Key>
                    <SummaryItem.Value width={480}>{nft.info.name}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Symbol</SummaryItem.Key>
                    <SummaryItem.Value width={480}>{nft.info.symbol}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Total supply</SummaryItem.Key>
                    <SummaryItem.Value width={480}>
                        {withCommas(nft.totalSupply)}
                        <SummaryUnit unit={nft.info.symbol} />
                    </SummaryItem.Value>
                </SummaryItem>
            </Summary>
            <Summary width={480}>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Holders</SummaryItem.Key>
                    <SummaryItem.Value width={320}>{withCommas(nft.holderCount)}</SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Official site</SummaryItem.Key>
                    <SummaryItem.Value width={320}>
                        {nft.officialSite && (
                            <>
                                <FinderOutLink href={nft.officialSite}>{nft.officialSite}</FinderOutLink>
                                <LinkButton link={nft.officialSite} />
                            </>
                        )}
                    </SummaryItem.Value>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItem.Key width={120}>Total transfer</SummaryItem.Key>
                    <SummaryItem.Value width={320}>{withCommas(nft.totalTransfers)}</SummaryItem.Value>
                </SummaryItem>
            </Summary>
        </SummaryContainer>
    )
}

type SummaryItem = {
    title: string
    value: ReactNode
}

const NftLightSummary = ({ nft }: INftSummaryProps) => {
    const [colum1Items = [], colum2Items = []] = useMemo(() => {
        const result: SummaryItem[] = []
        const {
            info: { name, symbol, hasName, hasSymbol },
            holderCount,
            officialSite,
        } = nft

        if (hasName) {
            result.push({
                title: 'Name',
                value: name,
            })
        }

        if (hasSymbol) {
            result.push({
                title: 'Symbol',
                value: symbol,
            })
        }

        result.push({
            title: 'Total transfer',
            value: withCommas(nft.totalTransfers),
        })

        result.push({
            title: 'Holders',
            value: withCommas(holderCount),
        })

        if (officialSite) {
            result.push({
                title: 'Official site',
                value: (
                    <>
                        <FinderOutLink href={officialSite}>{officialSite}</FinderOutLink>
                        <Copy value={officialSite} />
                    </>
                ),
            })
        }

        return split(result, 2)
    }, [nft])

    return (
        <SummaryContainer>
            <SummaryTop gap={16}>
                <SummaryTopRow title="Contract" titleWidth={138}>
                    <NameHash
                        hash={nft.info.contractAddress}
                        decorator={
                            <InnerCopy value={nft.info.contractAddress} message="Hash Copied." size={16} tooltip />
                        }
                    >
                        {nft.info.contractAddress}
                    </NameHash>
                </SummaryTopRow>
            </SummaryTop>

            <Summary width={620}>
                {colum1Items.map(({ title, value }) => (
                    <SummaryItem key={title}>
                        <SummaryItem.Key width={120}>{title}</SummaryItem.Key>
                        <SummaryItem.Value width={480}>{value}</SummaryItem.Value>
                    </SummaryItem>
                ))}
            </Summary>

            <Summary width={480}>
                {colum2Items.map(({ title, value }) => (
                    <SummaryItem key={title}>
                        <SummaryItem.Key width={120}>{title}</SummaryItem.Key>
                        <SummaryItem.Value width={320}>{value}</SummaryItem.Value>
                    </SummaryItem>
                ))}
            </Summary>
        </SummaryContainer>
    )
}

export default NftSummary
