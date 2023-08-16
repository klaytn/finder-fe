import { colors } from '@klaytn/slush'

import { NftListItemVO } from 'apps/finder/src/vo/nft'
import { TokenListItemVO } from 'apps/finder/src/vo/token'

import { withCommas } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../commons/table/basic'
import { TableHashCell, TableKlayCell, TableNameWithIconCell, TableNumberCell } from '../../commons/table/variants'
import { PageTitle } from '../pages'

const ALL_LIST_COUNT_LIMIT = 7
const TOKEN_SEARCH_LIMIT = 10000

type TokenOrNftShortSearchResultProps = {
    title: string
    keyword: string
    totalCount: number
    tokens: readonly (TokenListItemVO | NftListItemVO)[]
    cellProps: {
        link: string
        alt: string
    }
}

const TokenOfNftShortSearchResult = ({
    title,
    keyword,
    totalCount,
    tokens,
    cellProps,
}: TokenOrNftShortSearchResultProps) => {
    const whiteColor = useFinderThemeColor(colors.white)

    return (
        <>
            <div>
                <div className="flex">
                    <PageTitle>
                        {title} ({withCommas(totalCount)})
                    </PageTitle>
                </div>
            </div>
            <Table
                columnSizeList={[396, 120, 400, 300]}
                totalCount={totalCount}
                limitCount={TOKEN_SEARCH_LIMIT}
                hideTotalCount
            >
                <TableHeaders>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Symbol</TableHeader>
                    <TableHeader>Contract address</TableHeader>
                    <TableHeader align="right">Total supply</TableHeader>
                    <TableHeader align="right">Total transfer</TableHeader>
                </TableHeaders>

                {tokens.slice(0, ALL_LIST_COUNT_LIMIT).map((token, index) => {
                    return (
                        <TableRow key={index}>
                            <TableNameWithIconCell
                                link={`${cellProps.link}/${token.info.contractAddress}`}
                                name={token.info.name}
                                iconAlt={cellProps.alt}
                                iconUri={token.info.icon}
                                keyword={keyword}
                            />
                            <TableCell color={whiteColor} bold>
                                {token.info.symbol}
                            </TableCell>
                            <TableHashCell value={token.info.contractAddress} />
                            <TableKlayCell value={token.totalSupply} length={14} align="right" />
                            <TableNumberCell value={token.totalTransfers} align="right" />
                        </TableRow>
                    )
                })}
            </Table>
        </>
    )
}

export default TokenOfNftShortSearchResult
