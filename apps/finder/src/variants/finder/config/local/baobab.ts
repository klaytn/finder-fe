import { JsonConfigSetting } from '../../../config'

const config: JsonConfigSetting = {
    beHost: 'Set REACT_APP_BE_HOST value in the .env file',
    publicEn: 'Set REACT_APP_PUBLIC_EN value in the .env file',
    networks: [
        {
            key: 'cypress',
            label: 'Main Net',
            url: 'http://localhost:3000',
        },
        {
            key: 'baobab',
            label: 'Baobab',
            url: 'http://localhost:3000',
        },
    ],
}

export default config
