import { useNfts } from '../../api/nft'
import Page from '../../components/Page'
import useQuery from '../../hooks/useQuery'
import LabelRow from '../components/common/labelRow'
import TitleRow from '../components/common/titleRow'
import TokenItemBox from '../components/token/list/tokenItemBox'

const LABELS = ['KIP-17', 'KIP-37', 'ERC-1155']

const NftsPage = () => {
    const query = useQuery()
    const page = query.get('page') || '1'

    const {
        result: { currentPage, totalPage, results },
        refresh,
    } = useNfts(page)

    return (
        <>
            <TitleRow title="NFTs" onRefresh={refresh} />

            <LabelRow marginBottom={20} labels={LABELS} />

            {results.map((nft, index) => (
                <TokenItemBox key={index} token={nft} linkPrefix="nft" />
            ))}

            <Page current={currentPage} total={totalPage} marginTop={12} size="small" />
        </>
    )
}

export default NftsPage
