/**
 * @file Definition of resources that can change depending on the service (klaytnfinder).
 */

import { Icon } from '@klaytn/slush'

import { Config } from './config'

/**
 * List of links to be displayed on the main page.
 * The order is important as they will be displayed in the same order.
 */
export type Portal = {
    icon: Icon
    name: string
    link: string
}

/**
 * List of links to be displayed in the footer.
 * The order is important as they will be displayed in the same order.
 */
export type Contact = {
    icon: Icon
    link: string
}

/**
 * Primary currency (coin) in the blockchain network.
 */
export type KeyCurrency = {
    name: string
    unit: string
    gasUnit: string
    copyright: string
    icon: Icon
}

/**
 * Information about the starting block.
 */
export type GenesisBlock = {
    proposerNames: string
    blockSize: number
    datetime: string
    hash: string
    filepath: string
}

export type LogoProps = {
    width: number
    height: number
    opacity?: number
}

export type Resources = {
    portals: Portal[]
    contacts: Contact[]
    keyCurrency: KeyCurrency
    genesisBlock: GenesisBlock
    LogoComponent: (props: LogoProps) => JSX.Element
    FooterLogoComponent: (props: LogoProps) => JSX.Element
    contactLink?: string
}

export type GetResource = (config: Config) => Promise<Resources>

export async function getResources(config: Config): Promise<Resources> {
    const { service } = config
    const importResult = await import(`./${service}/resource`)
    return importResult.getResources(config)
}
