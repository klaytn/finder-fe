import aes from 'crypto-js/aes'
import hexEnc from 'crypto-js/enc-hex'
import utf8Enc from 'crypto-js/enc-utf8'

import { CONFIG_KEY } from '../src/constants/config'
import { Config } from '../src/variants/config'

const GIT_HASH = process.env.REACT_APP_GIT_HASH || ''
const IV_START = 4
const IV_END = 36

function decryptConfig(encryptedConfig: string) {
    const result = aes.decrypt(encryptedConfig, CONFIG_KEY, {
        iv: hexEnc.parse(GIT_HASH.slice(IV_START, IV_END)),
    })

    return result.toString(utf8Enc)
}

function main(encryptedConfig: string) {
    const configStr = decryptConfig(encryptedConfig)

    const result: Config = JSON.parse(configStr)
    console.log(result)
}

const [, , encryptedConfig] = process.argv
main(encryptedConfig)
