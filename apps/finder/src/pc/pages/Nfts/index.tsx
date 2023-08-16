import { colors } from '@klaytn/slush'

import { useVerifiedNfts } from '../../../api/nft'
import { Table, TableCell, TableHeader, TableHeaders, TableRow } from '../../../components/commons/table/basic'
import { TableHashCell, TableNameWithIconCell, TableNumberCell } from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { PageTitleDesc } from '../../../components/pc/pages'
import SearchFilterGroup from '../../../components/pc/search/searchFilterGroup'
import { ListTitle } from '../../../components/Title'
import { NftTypes } from '../../../constants/nft'
import { useFeatures } from '../../../context/configProvider'
import { withCommas } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { SortDirection, SortType } from '../../../types/search'

const Nfts = () => {
    const query = useQuery()
    const page = query.get('page') || '1'
    const fromDate = query.get('fromDate') || undefined
    const toDate = query.get('toDate') || undefined
    const sortDirection = (query.get('sortDirection') as SortDirection) || 'DESC'
    const sortType = (query.get('sortType') as SortType) || 'TIME'
    const { tokenSearchFilter = false, showTokenDescription } = useFeatures()

    const {
        data: { results, currentPage, totalPage, totalCount },
        refresh,
    } = useVerifiedNfts(
        {
            page,
            size: 20,
            fromDate,
            toDate,
            sortDirection,
            sortType,
        },
        tokenSearchFilter,
    )

    const whiteColor = useFinderThemeColor(colors.white)

    return (
        <>
            <div>
                <ListTitle
                    title="NFTs"
                    onRefresh={refresh}
                    types={NftTypes}
                    decorator={tokenSearchFilter ? <SearchFilterGroup /> : null}
                />
                {showTokenDescription && (
                    <PageTitleDesc>
                        Total {withCommas(totalCount)} non-fungible tokens. Registration of tokens occur without a
                        seperate review, and tokens are not guaranteed to be safe and/or trustworthy.
                        <br />
                        Users are advised to perform their Due Diligence for tokens.
                    </PageTitleDesc>
                )}
            </div>
            <Table columnSizeList={[270, 120, 286, 300, 212]}>
                <TableHeaders>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Symbol</TableHeader>
                    <TableHeader>Contract address</TableHeader>
                    <TableHeader align="right">Total supply</TableHeader>
                    <TableHeader align="right">Total transfer</TableHeader>
                </TableHeaders>

                {results.map((nft, index) => {
                    return (
                        <TableRow key={index}>
                            <TableNameWithIconCell
                                name={nft.info.name}
                                link={`/nft/${nft.info.contractAddress}`}
                                iconUri={nft.info.icon}
                                iconAlt="nft image"
                            />
                            <TableCell color={whiteColor} bold>
                                {nft.info.symbol}
                            </TableCell>
                            <TableHashCell value={nft.info.contractAddress} />
                            <TableNumberCell value={nft.totalSupply} align="right" color={colors.white} />
                            <TableNumberCell value={nft.totalTransfers} align="right" color={colors.white} />
                        </TableRow>
                    )
                })}
            </Table>
            <Page current={currentPage} total={totalPage} query={{ fromDate, toDate, sortDirection, sortType }} />
        </>
    )
}

export default Nfts
