import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
    ChevrondoubleLeftIcon,
    ChevrondoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    colors,
    Flex,
    Icon,
    typos,
} from '@klaytn/slush'

import { getThemeColor } from '../functions/colorMap'
import { extractProp, filterEmptyValue } from '../functions/Functions'
import { useFinderThemeColor } from '../hooks/useFinderThemeColor'

type StayQuery = Record<string, string | string[] | undefined | null>

const pageUrl = (path: string, page: string | number, query?: StayQuery) => {
    if (!query) {
        return `${path}?page=${page}`
    }

    const params = filterEmptyValue(query)

    const url =
        path +
        '?' +
        Object.entries(params)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.map((v) => `${key}=${v}`).join('&')
                }

                return `${key}=${value}`
            })
            .join('&')

    return url.endsWith('?') ? `${url}page=${page}` : `${url}&page=${page}`
}

interface IPageProps {
    current: number
    total: number
    query?: StayQuery
    marginTop?: number
    paddingBottom?: number
    size?: 'small' | 'large'
}

const STYLE_MAP = {
    small: {
        pageCount: 5,
        endIndicator: false,
        numberGap: 4,
    },
    large: {
        pageCount: 10,
        endIndicator: true,
        numberGap: 12,
    },
}

const Page = ({ current, total, query, marginTop = 40, paddingBottom = 0, size = 'large' }: IPageProps) => {
    const { pageCount, endIndicator, numberGap } = STYLE_MAP[size]
    const prevPage = Math.max(
        1,
        current === 1 ? current : current % pageCount === 0 ? current - pageCount : current - (current % pageCount),
    )
    const nextPage = Math.min(total, current === total ? current : current + pageCount - ((current - 1) % pageCount))

    const start = Math.trunc((current - 1) / pageCount) * pageCount + 1

    if (total === 0) {
        return null
    }

    return (
        <PageContainer marginTop={marginTop} paddingBottom={paddingBottom}>
            {endIndicator && (
                <PageIcon page="1" query={query} icon={ChevrondoubleLeftIcon} marginLeft={0} marginRight={10} />
            )}
            <PageIcon page={prevPage} query={query} icon={ChevronLeftIcon} marginLeft={10} marginRight={10} />
            <PageBlank />

            <PageNumbersContainer gap={numberGap}>
                {Array.from({ length: pageCount }, (_, index) => {
                    const page = index + start
                    if (page > total) {
                        return null
                    }

                    return (
                        <PageNumber
                            key={index}
                            page={index + start}
                            query={query}
                            current={current === index + start}
                        />
                    )
                })}
            </PageNumbersContainer>

            <PageBlank />
            <PageIcon page={nextPage} query={query} icon={ChevronRightIcon} marginLeft={10} marginRight={10} />
            {endIndicator && (
                <PageIcon page={total} query={query} icon={ChevrondoubleRightIcon} marginLeft={10} marginRight={0} />
            )}
        </PageContainer>
    )
}

const PageContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})<{ marginTop: number; paddingBottom: number }>`
    margin-top: ${extractProp('marginTop')}px;
    margin-bottom: ${extractProp('paddingBottom')}px;
`

const PageNumbersContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})<{ gap: number }>`
    gap: ${extractProp('gap')}px;
    align-items: center;
`

interface IPageIconProps {
    marginLeft: number
    marginRight: number
    icon: Icon
    page: string | number
    query?: StayQuery
}

const PageIcon = ({ icon: IconComponent, page, query, marginLeft, marginRight }: IPageIconProps) => {
    const location = useLocation()
    const iconColor = useFinderThemeColor(colors.blue[300])

    return (
        <Link to={pageUrl(location.pathname, page, query)}>
            <PageIconContainer marginRight={marginRight} marginLeft={marginLeft}>
                <IconComponent color={iconColor} size={10} />
            </PageIconContainer>
        </Link>
    )
}

const PageIconContainer = styled.div<{ marginRight: number; marginLeft: number }>`
    margin-top: 11px;
    margin-bottom: 10px;
    margin-right: ${extractProp('marginRight')}px;
    margin-left: ${extractProp('marginLeft')}px;
    cursor: pointer;
`

interface IPageNumberProps {
    page: string | number
    current?: boolean
    query?: StayQuery
}

const PageNumber = ({ page, current = false, query }: IPageNumberProps) => {
    const location = useLocation()

    if (page === '...') {
        return <PageNumberContainer current={current}>...</PageNumberContainer>
    }

    if (current) {
        return <PageNumberContainer current={current}>{page}</PageNumberContainer>
    }

    return (
        <PageLink to={pageUrl(location.pathname, page, query)}>
            <PageNumberContainer current={current}>{page}</PageNumberContainer>
        </PageLink>
    )
}

const PageNumberContainer = styled.div<{ current: boolean }>`
    ${typos.suit['12.16_900']};
    padding: 0px 10px;
    height: 26px;
    border-radius: 10px;
    background-color: ${getThemeColor(({ current }) => (current ? colors.blue[800] : 'none'))};
    color: ${getThemeColor(({ current }) => (current ? colors.blue[200] : colors.blue[300]))};
    display: flex;
    align-items: center;
    justify-content: center;
`

const PageLink = styled(Link)`
    display: flex;
`

const PageBlank = styled.div`
    width: 20px;
`

export default Page
