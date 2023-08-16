import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { TabInfo } from '@klaytn/slush'

import useQuery from './useQuery'

const QUERY_NAME = 'tabId'

type UseTabQueryOption = {
    keepQueryName?: string | string[]
    tabEnabledInfos?: Record<string, boolean>
    initialTabIndex?: number
}

export function useTabQuery(
    tabs: TabInfo[],
    { keepQueryName = [], tabEnabledInfos = {}, initialTabIndex = 0 }: UseTabQueryOption = {},
) {
    const queryMap = useQuery()
    const navigate = useNavigate()
    const selectedTab = getSelectedTab(queryMap.get(QUERY_NAME), tabs, tabEnabledInfos, initialTabIndex)

    const handleTabChange = useCallback(
        (value: string) => {
            const nextQueryMap = new URLSearchParams()
            nextQueryMap.set(QUERY_NAME, value)

            const keepQueryNameList = typeof keepQueryName === 'string' ? [keepQueryName] : keepQueryName

            keepQueryNameList
                .filter((queryName) => queryMap.has(queryName))
                .forEach((queryName) => {
                    nextQueryMap.set(queryName, queryMap.get(queryName) || '')
                })

            navigate('?' + nextQueryMap.toString())
        },
        [navigate, queryMap, keepQueryName],
    )

    return { selectedTab, handleTabChange }
}

function getSelectedTab(
    search: string | null,
    tabs: TabInfo[],
    tabEnabledInfos: Record<string, boolean>,
    initialTabIndex: number,
) {
    if (search) {
        return search
    }

    for (const { value } of tabs) {
        if (tabEnabledInfos[value]) {
            return value
        }
    }

    return tabs[initialTabIndex]?.value || ''
}
