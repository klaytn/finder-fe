import { JsonConfigSetting } from '../../../config'

const config: JsonConfigSetting = {
    beHost: 'finder-baobab-api.dev.klaytnfinder.io',
    publicEn: 'https://public-en.kaikas.io/v1/baobab',
    networks: [
        {
            key: 'baobab',
            label: 'Main Net',
            url: 'https://finder.dev.klaytnfinder.io/',
        },
    ],
}

export default config
