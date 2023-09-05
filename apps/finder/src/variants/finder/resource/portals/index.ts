import { Portal } from '../../../resource'
import FantoPortalIcon from './fantoPortalIcon'
import KlayBankPortalIcon from './klayBankPortalIcon'
import KlaytnPortalIcon from './klaytnPortalIcon'
import KlaytnSquarePortalIcon from './klaytnSquarePortalIcon'
import KnsPortalIcon from './knsPortalIcon'
import OpenSeaPortalIcon from './openseaPortalicon'
import OrbitBridgePortalIcon from './OrbitBridgePortalIcon'
import SwapScannerPortalIcon from './swapScannerPortalIcon'

export const portals: Portal[] = [
    {
        name: 'Opensea',
        icon: OpenSeaPortalIcon,
        link: 'https://opensea.io/',
    },
    {
        name: 'Klaybank',
        icon: KlayBankPortalIcon,
        link: 'https://klaybank.org/',
    },

    {
        name: 'Fanto',
        icon: FantoPortalIcon,
        link: 'https://www.fanto.io/',
    },
    {
        name: 'Orbit Bridge',
        icon: OrbitBridgePortalIcon,
        link: 'https://bridge.orbitchain.io/',
    },
    {
        name: 'Swapscanner',
        icon: SwapScannerPortalIcon,
        link: 'https://swapscanner.io/',
    },

    {
        name: 'Klaytn Name Service',
        icon: KnsPortalIcon,
        link: 'https://klaytn.domains/',
    },
    {
        name: 'Klaytn API Service',
        icon: KlaytnPortalIcon,
        link: 'https://www.klaytnapi.com/',
    },
    {
        name: 'Klaytn Square',
        icon: KlaytnSquarePortalIcon,
        link: 'https://square.klaytn.foundation/',
    },
]
