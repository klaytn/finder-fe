import { GetResource } from '../../resource'
import { contacts } from './contacts'
import { genesisBlock } from './genesisBlock'
import { keyCurrency } from './keyCurrency'
import { FooterLogo, Logo } from './logo'
import { portals } from './portals'

export const getResources: GetResource = async () => {
    return {
        portals,
        contacts,
        keyCurrency,
        genesisBlock,
        FooterLogoComponent: FooterLogo,
        LogoComponent: Logo,
    }
}
