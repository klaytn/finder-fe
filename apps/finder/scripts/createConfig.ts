import { promises as fs } from 'fs'

import aes from 'crypto-js/aes'
import hexEnc from 'crypto-js/enc-hex'

import { CONFIG_KEY } from '../src/constants/config'
import { checkEnvConfig, Config, getEnvConfig, getJsonConfig } from '../src/variants/config'

const IV_START = 4
const IV_END = 36

function encryptConfig(config: Config) {
    const result = aes.encrypt(JSON.stringify(config), CONFIG_KEY, {
        iv: hexEnc.parse(config.gitHash.slice(IV_START, IV_END)),
    })

    return result.toString()
}

async function main(buildPath: string) {
    const envConfig = getEnvConfig()
    if (!checkEnvConfig(envConfig)) {
        throw new Error('Environment variables required for configuration are not specified.')
    }

    const jsonConfig = await getJsonConfig(envConfig)
    const config = {
        ...jsonConfig,
        ...envConfig,
    }

    const encrypted = encryptConfig(config)
    await fs.writeFile(`${buildPath}/config.${config.gitHash}.conf`, encrypted, 'utf8')
}

const [, , buildPath] = process.argv
main(buildPath)
