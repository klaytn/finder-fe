import { decrypt as proc } from 'crypto-js/aes'
import hexEnc from 'crypto-js/enc-hex'
import utf8Enc from 'crypto-js/enc-utf8'

import { noop } from '@klaytn/slush'

import { CONFIG_KEY } from '../constants/config'
import { getEnvConfig } from '../variants/config'

const IV_START = 4
const IV_END = 36

// Rename decrypt -> targetFunc to make it harder to figure out which function it is, even after obfuscation.
// process.env.TEST_VALUE doesn't exist, so targetFunc will always be a proc
type ProcType = typeof proc
const targetFunc = process.env.TEST_VALUE ? (noop as ProcType) : proc

export function decryptConfig(encryptedConfig: string) {
    const envConfig = getEnvConfig()
    const iv = envConfig.gitHash.slice(IV_START, IV_END)
    const params = {
        iv: hexEnc.parse(iv),
    }

    const result = targetFunc(encryptedConfig, CONFIG_KEY, params)
    return result.toString(utf8Enc)
}
