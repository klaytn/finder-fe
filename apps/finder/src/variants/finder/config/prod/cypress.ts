import { JsonConfigSetting } from '../../../config'
import { prodNetworks } from './networks'

const config: JsonConfigSetting = {
    beHost: 'cypress-api.klaytnfinder.io',
    publicEn: 'https://public-en.klaytnfinder.io/v1/cypress',
    networks: prodNetworks,
}

export default config
