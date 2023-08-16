import { useMemo, useState } from 'react'

import { TabInfo } from '../components/tabs'

export function useTabs(tabs: TabInfo[], initialSelectedTab?: string) {
    const [selectedTab, setSelectedTab] = useState(initialSelectedTab || tabs[0]?.value || '')

    const result = useMemo(
        () => ({
            selectedTab,
            onTabChange: setSelectedTab,
        }),
        [selectedTab],
    )

    return result
}
