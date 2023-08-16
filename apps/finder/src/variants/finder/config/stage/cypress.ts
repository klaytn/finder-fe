import { JsonConfigSetting } from '../../../config'
import { stageNetworks } from './networks'

const config: JsonConfigSetting = {
    beHost: 'stag-cypress-api.klaytnfinder.io',
    publicEn: 'https://public-en.klaytnfinder.io/v1/cypress',
    networks: stageNetworks,
}

export default config
