import { JsonConfigSetting } from '../../../config'
import { stageNetworks } from './networks'

const config: JsonConfigSetting = {
    beHost: 'stag-baobab-api.klaytnfinder.io',
    publicEn: 'https://public-en.klaytnfinder.io/v1/baobab',
    networks: stageNetworks,
}

export default config
