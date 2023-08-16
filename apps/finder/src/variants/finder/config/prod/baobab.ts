import { JsonConfigSetting } from '../../../config'
import { prodNetworks } from './networks'

const config: JsonConfigSetting = {
    beHost: 'baobab-api.klaytnfinder.io',
    publicEn: 'https://public-en.klaytnfinder.io/v1/baobab',
    networks: prodNetworks,
}

export default config
