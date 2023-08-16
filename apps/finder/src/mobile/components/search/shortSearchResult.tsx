import styled from 'styled-components'

import { Button, ChevronRightIcon, Flex } from '@klaytn/slush'

import { withCommas } from '../../../functions/Functions'
import { PagingVO } from '../../../vo/paging'
import TitleRow from '../common/titleRow'

const ALL_LIST_COUNT_LIMIT = 5

type ShortSearchResultProps<Data, VO> = {
    title: string
    searchResult: PagingVO<Data, VO>
    renderItem: (item: VO, index: number) => JSX.Element
    onViewMore: () => void
}

function ShortSearchResult<Data, VO>({
    title,
    searchResult,
    renderItem,
    onViewMore,
}: ShortSearchResultProps<Data, VO>) {
    if (searchResult.totalCount === 0) {
        return null
    }

    return (
        <Container>
            <TitleRow title={`${title} (${withCommas(searchResult.totalCount)})`} />
            {searchResult.results.slice(0, ALL_LIST_COUNT_LIMIT).map(renderItem)}
            <ViewMoreRow>
                <ViewMoreButton onClick={onViewMore}>View More</ViewMoreButton>
            </ViewMoreRow>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 64px;
`

const ViewMoreRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    margin-top: 20px;
`

const ViewMoreButton = styled(Button).attrs({
    buttonType: 'second',
    rightIcon: ChevronRightIcon,
})`
    width: 144px;
`

export default ShortSearchResult
