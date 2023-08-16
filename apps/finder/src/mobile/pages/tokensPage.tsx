import { useTokens } from '../../api/token'
import Page from '../../components/Page'
import useQuery from '../../hooks/useQuery'
import LabelRow from '../components/common/labelRow'
import TitleRow from '../components/common/titleRow'
import TokenItemBox from '../components/token/list/tokenItemBox'

const LABELS = ['KIP-7', 'ERC-20']

const TokensPage = () => {
    const query = useQuery()
    const page = query.get('page') || '1'

    const {
        result: { currentPage, totalPage, results },
        refresh,
    } = useTokens(page)

    return (
        <>
            <TitleRow title="Tokens" onRefresh={refresh} />

            <LabelRow marginBottom={20} labels={LABELS} />

            {results.map((token, index) => (
                <TokenItemBox key={index} token={token} linkPrefix="token" />
            ))}

            <Page current={currentPage} total={totalPage} marginTop={12} size="small" />
        </>
    )
}

export default TokensPage
