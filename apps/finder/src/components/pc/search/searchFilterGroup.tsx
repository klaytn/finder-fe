import { format, sub, isToday, isSameDay } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import {
    colors,
    DateDurationPicker,
    DateRange,
    Dropdown,
    Flex,
    OptionPanelType,
    RadioForm,
    RadioOption,
    Text,
    typos,
} from '@klaytn/slush'

import { SORT_DIRECTION, SORT_TYPE, OPTION_PANELS } from '../../../constants/search'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { extractProp } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { SortDirection, SortType } from '../../../types/search'

const orderOptions = [
    {
        text: 'Ascending',
        value: SORT_DIRECTION['ASC'],
    },
    {
        text: 'Descending',
        value: SORT_DIRECTION['DESC'],
    },
]

const dataOptions = [
    {
        text: 'Time',
        value: SORT_TYPE['TIME'],
    },
    {
        text: 'Total Supply',
        value: SORT_TYPE['TOTAL_SUPPLY'],
    },
    {
        text: 'Total Transfer',
        value: SORT_TYPE['TOTAL_TRANSFER'],
    },
]

const formatDateRange = (dateRange: DateRange, formatString = 'yyyy-MM-dd') =>
    dateRange.map((date: Date | null) => (date ? format(date, formatString) : null))

const findByValue = <T extends { text: string; value: string }>(list: T[], targetValue: string) => {
    return list.find(({ value }) => value === targetValue) || null
}

const minDate = sub(new Date(), {
    months: 12,
})
const maxDate = new Date()

const getSelectedPanel = ([from, to]: DateRange) => {
    if (!from || !to) {
        return null
    }

    if (!isToday(to)) {
        return null
    }

    return (
        OPTION_PANELS.find(({ duration, period }) => {
            if (duration === 'none') {
                return false
            }

            // If a month/year is selected, the day decreases.
            const subResult = ['months', 'years'].includes(duration)
                ? sub(to, { [duration]: period, days: -1 })
                : sub(to, { [duration]: period })
            return isSameDay(from, subResult)
        }) || null
    )
}

const copyQueriesNotIncludesPage = (toQueryMap: URLSearchParams, fromQueryMap: URLSearchParams) => {
    for (const [key, value] of fromQueryMap.entries()) {
        if (key === 'page') {
            toQueryMap.set(key, '1')
        } else {
            toQueryMap.set(key, value)
        }
    }
}

const SearchFilterGroup = () => {
    const queryMap = useQuery()

    const fromDate = queryMap.get('fromDate') || null
    const toDate = queryMap.get('toDate') || null
    const querySortType = queryMap.get('sortType') || null
    const querySortDirection = queryMap.get('sortDirection') || null

    const navigate = useNavigate()
    const whiteColor = useFinderThemeColor(colors.white)
    const [dateRange, setDateRange] = useState<DateRange>([
        fromDate ? new Date(fromDate) : null,
        toDate ? new Date(toDate) : null,
    ])
    const [selectedPanel, setSelectedPanel] = useState<OptionPanelType | null>(getSelectedPanel(dateRange))
    const [sortType, setSortType] = useState(querySortType)
    const [sortDirection, setSortDirection] = useState(querySortDirection)

    const appendQueries = (queries: { queryName: string; value: string }[]) => {
        const nextQueryMap = new URLSearchParams()

        for (const { queryName, value } of queries) {
            if (value) {
                nextQueryMap.set(queryName, value)
            }
            if (queryMap.has(queryName)) {
                queryMap.delete(queryName)
            }
        }

        if (queryMap) {
            copyQueriesNotIncludesPage(nextQueryMap, queryMap)
        }

        return nextQueryMap
    }

    const appendQuery = (queryName: string, value: string) => {
        const nextQueryMap = new URLSearchParams()

        if (value) {
            nextQueryMap.set(queryName, value)
        }
        if (queryMap.has(queryName)) {
            queryMap.delete(queryName)
        }
        if (queryMap) {
            copyQueriesNotIncludesPage(nextQueryMap, queryMap)
        }
        return nextQueryMap
    }

    const navigateWithDateRange = ([fromDate, toDate]: (string | null)[]) => {
        const nextQueryMap = appendQueries([
            {
                queryName: 'fromDate',
                value: fromDate || '',
            },
            {
                queryName: 'toDate',
                value: toDate || '',
            },
        ])
        navigate('?' + nextQueryMap.toString())
    }

    const handleSelectPanel = (dateRange: DateRange, selectedPanel: OptionPanelType) => {
        const [fromDate, toDate] = formatDateRange(dateRange)
        setSelectedPanel(selectedPanel)
        navigateWithDateRange([fromDate, toDate])
    }

    const handleSelectCustomDate = () => {
        const [fromDate, toDate] = formatDateRange(dateRange)
        navigateWithDateRange([fromDate, toDate])
    }

    const selectedOrder =
        orderOptions.find(({ value }) => value === sortDirection) ||
        findByValue<{
            text: string
            value: SortDirection
        }>(orderOptions, SORT_DIRECTION['DESC'])

    const selectedData =
        dataOptions.find(({ value }) => value === sortType) ||
        findByValue<{
            text: string
            value: SortType
        }>(dataOptions, SORT_TYPE['TIME'])

    const handleOrder = (option: RadioOption) => {
        if (option) {
            const QUERY_NAME = 'sortDirection'
            const nextQueryMap = appendQuery(QUERY_NAME, option.value as string)
            setSortDirection(option.value as string)
            navigate('?' + nextQueryMap.toString())
        }
    }

    const handleData = (option: RadioOption) => {
        if (option) {
            const QUERY_NAME = 'sortType'
            const nextQueryMap = appendQuery(QUERY_NAME, option.value as string)
            setSortType(option.value as string)
            navigate('?' + nextQueryMap.toString())
        }
    }

    const handleChangeDate = (dateRange: DateRange) => {
        setDateRange(dateRange)
    }

    return (
        <Flex direction="row">
            <Wrapper marginRight={12}>
                <Dropdown
                    buttonText={
                        <ButtonText width={64} color={whiteColor}>
                            Sorting
                        </ButtonText>
                    }
                    align="right"
                >
                    <RadioForm selected={selectedOrder} onSelect={handleOrder}>
                        <Dropdown.Title>Order by</Dropdown.Title>
                        {orderOptions.map((option) => (
                            <Dropdown.Item key={option.value}>
                                <RadioForm.Item option={option} />
                            </Dropdown.Item>
                        ))}
                    </RadioForm>
                    <RadioForm selected={selectedData} onSelect={handleData}>
                        <Dropdown.Title>Data</Dropdown.Title>
                        {dataOptions.map((option) => (
                            <Dropdown.Item key={option.value}>
                                <RadioForm.Item option={option} />
                            </Dropdown.Item>
                        ))}
                    </RadioForm>
                </Dropdown>
            </Wrapper>
            <Wrapper marginRight={0}>
                <Dropdown
                    buttonText={
                        <ButtonText width={64} color={whiteColor}>
                            Duration
                        </ButtonText>
                    }
                    align="right"
                    listWidth={632}
                >
                    <DateDurationPicker
                        dual
                        direction="horizontal"
                        optionPanels={OPTION_PANELS}
                        defaultPanel={OPTION_PANELS[0]}
                        selectedPanel={selectedPanel}
                        onSelectPanel={handleSelectPanel}
                        dateRange={dateRange}
                        onChange={handleChangeDate}
                        onConfirm={handleSelectCustomDate}
                        period={12}
                        showPreviousMonths
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </Dropdown>
            </Wrapper>
        </Flex>
    )
}

const Wrapper = styled.div<{ marginRight?: number }>`
    position: relative;
    margin-right: ${extractProp('marginRight')}px;
`

const ButtonText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_400'],
        color: colors.white,
    }),
)<{ width: number }>`
    width: ${extractProp('width')}px;
    text-align: start;
    line-height: 18px;
`

export default SearchFilterGroup
