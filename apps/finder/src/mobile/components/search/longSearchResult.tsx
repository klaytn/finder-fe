import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import Page from '../../../components/Page'
import useQuery from '../../../hooks/useQuery'
import { useSearchValue } from '../../../hooks/useSearchBar'
import { PagingVO } from '../../../vo/paging'
import TitleRow from '../common/titleRow'

type LongSearchResultProps<Data, VO> = {
    title: string
    searchResult: PagingVO<Data, VO>
    renderItem: (item: VO, index: number) => JSX.Element
}

function LongSearchResult<Data, VO>({ title, searchResult, renderItem }: LongSearchResultProps<Data, VO>) {
    const query = useQuery()
    const tabId = query.get('tabId') || ''
    const { keyword, tag } = useSearchValue()

    const { results, totalCount, totalPage, currentPage } = searchResult

    return (
        <Container>
            <TitleRow title={`${title} (${totalCount})`} />
            {results.map(renderItem)}

            <Page current={currentPage} total={totalPage} query={{ tabId, keyword, tag }} marginTop={12} size="small" />
        </Container>
    )
}

const Container = styled(Flex)``

export default LongSearchResult
