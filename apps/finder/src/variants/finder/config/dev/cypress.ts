import { JsonConfigSetting } from '../../../config'

const config: JsonConfigSetting = {
    beHost: 'finder-cypress-api.dev.klaytnfinder.io',
    publicEn: 'https://public-en.klaytnfinder.io/v1/cypress',
    networks: [
        {
            key: 'cypress',
            label: 'Main Net',
            url: 'https://finder.dev.klaytnfinder.io/',
        },
    ],
}

export default config
