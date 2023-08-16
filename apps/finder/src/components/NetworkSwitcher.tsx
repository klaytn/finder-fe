import { useCallback, useEffect, useState } from 'react'

import { ContextMenuItem, GlobeNormalIcon, Select } from '@klaytn/slush'

import { getConfig, Network } from '../variants/config'

type NetworkContextMenuItem = ContextMenuItem & Network

function networksToContextMenuItems(network: Network[]) {
    return network.map(({ key, label, url }) => ({ label, value: key, url }))
}

const MARGIN = 10 * 2
const WIDTH_OF_CHAR = 10
const WIDTH_OF_SPACE = 5
function calcWidth(longestLabel: string) {
    const countOfChar = longestLabel.replace(/\s+/g, '').length
    const countOfSpace = longestLabel.length - countOfChar
    return MARGIN + countOfChar * WIDTH_OF_CHAR + countOfSpace * WIDTH_OF_SPACE
}

const NetworkSwitcher = () => {
    const [network, setNetwork] = useState('')
    const [networks, setNetworks] = useState<NetworkContextMenuItem[]>([])
    const [menuItems, setMenuItems] = useState<ContextMenuItem[]>([])
    const [selectedNetwork, setSelectedNetwork] = useState<ContextMenuItem>()
    const [width, setWidth] = useState(95)

    useEffect(() => {
        ;(async () => {
            const { network, networks } = await getConfig()
            const menuItems = networksToContextMenuItems(networks)

            const longestLabel = networks.reduce((prev, { label }) => (label.length > prev.length ? label : prev), '')
            setWidth(calcWidth(longestLabel))
            setNetwork(network)
            setNetworks(networks)
            setMenuItems(menuItems)
            setSelectedNetwork(menuItems.find(({ value }) => value === network))
        })()
    }, [])

    const handleChange = useCallback(
        (item: ContextMenuItem) => {
            const selected = networks.find(({ key }) => key === item.value)
            if (!selected) {
                return
            }

            if (selected.key === network) {
                return
            }

            window.open(selected.url, '_blank')
        },
        [network, networks],
    )

    return (
        <Select
            items={menuItems}
            onChange={handleChange}
            style={{ width }}
            value={selectedNetwork}
            leftIcon={GlobeNormalIcon}
            hideChevronIcon
            gap={0}
        />
    )
}

export default NetworkSwitcher
