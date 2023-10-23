import { memoize, singletonResolver } from '@klaytn/slush'

import { decryptConfig } from '../functions/encrypt'
import { filterEmptyValue } from '../functions/Functions'

export type Target = 'prod' | 'stage' | 'dev' | 'local'

/**
 * DataDog RUM (Real User Monitoring) configuration values
 */
export type RumConfig = {
    applicationId: string
    clientToken: string
}

/**
 * Values set as environment variables
 */
type EnvConfig = {
    /**
     * Target service (finder)
     * REACT_APP_SERVICE
     */
    service: 'finder'

    /**
     * Address to fetch the features.json file
     * REACT_APP_FEATURES_HOST
     * @deprecated: Get Features from BE Server (Zookeeper)
     */
    featuresHost: string

    /**
     * Selected network (cypress, baobab, etc.)
     * REACT_APP_NETWORK
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     */
    network: string

    /**
     * Target phase
     * REACT_APP_TARGET
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     */
    target: Target

    /**
     * API access key
     * REACT_APP_ACCESS_KEY
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     */
    accessKey: string

    /**
     * API secret key
     * REACT_APP_SECRET_KEY
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     */
    secretKey: string

    /**
     * Commit hash at the time of build (not needed in local setup, injected by actions during deployment)
     * During development - not needed
     * During deployment - injected by actions
     * REACT_APP_GIT_HASH
     */
    gitHash: string

    /**
     * BE server address
     * If specified in the environment, it will override dynamic settings
     * REACT_APP_BE_HOST
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     */
    beHost?: string

    /**
     * Public EN address used for executing Read Contract
     * REACT_APP_PUBLIC_EN
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     */
    publicEn?: string

    /**
     * Google analytics ID
     * REACT_APP_GA_ID
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     */
    gaId?: string

    /**
     * DataDog RUM (Real User Monitoring) configuration values
     * REACT_APP_RUM_APPLICAION_ID
     * REACT_APP_RUM_CLIENT_TOKEN
     * During development - loaded from .env file
     * During deployment - loaded from conf file
     * @see https://docs.datadoghq.com/real_user_monitoring/browser/
     */
    rumConfig: RumConfig
}

export type Network = {
    key: string
    label: string
    url: string
}

/**
 * Values written in each config file
 */
export type JsonConfigSetting = {
    /**
     * BE server address
     */
    beHost: string

    /**
     * Public EN address used for executing Read Contract
     */
    publicEn: string

    /**
     * List of networks to display
     */
    networks: Network[]

    /**
     * Whether to use HTTPS/WSS on the BE server
     * @default true
     */
    useSecureProtocol?: boolean

    /**
     * API path
     * @default /api/v1
     */
    apiPath?: string

    /**
     * WebSocket path
     * @default /ws
     */
    wsPath?: string
}

/**
 * Loaded from each target/network-specific config file
 */
export type JsonConfig = Required<JsonConfigSetting>

/**
 * Overall configuration
 */
export type Config = JsonConfig & EnvConfig

export const getJsonConfig = async ({ service, target, network }: EnvConfig) => {
    const jsonConfigRequiredProps: JsonConfigSetting = (await import(`./${service}/config/${target}/${network}`))
        .default
    const jsonConfig: JsonConfig = {
        useSecureProtocol: true,
        apiPath: '/api/v1',
        wsPath: '/ws',
        ...jsonConfigRequiredProps,
    }

    return jsonConfig
}

export const getEnvConfig = () => {
    const gitHash = process.env.REACT_APP_GIT_HASH || (process.env.NODE_ENV === 'development' ? 'local' : '')

    const envConfig = filterEmptyValue({
        service: process.env.REACT_APP_SERVICE || 'finder',
        featuresHost: process.env.REACT_APP_FEATURES_HOST || '',
        target: process.env.REACT_APP_TARGET,
        network: process.env.REACT_APP_NETWORK || '',
        beHost: process.env.REACT_APP_BE_HOST,
        publicEn: process.env.REACT_APP_PUBLIC_EN,
        accessKey: process.env.REACT_APP_ACCESS_KEY || '',
        secretKey: process.env.REACT_APP_SECRET_KEY || '',
        gitHash,
        gaId: process.env.REACT_APP_GA_ID || '',// Google Analytics ID
        rumConfig: {
            applicationId: process.env.REACT_APP_RUM_APPLICAION_ID || '',
            clientToken: process.env.REACT_APP_RUM_CLIENT_TOKEN || '',
        },
    }) as EnvConfig

    return envConfig
}

const REQUIRED_ENV_PROPS = ['network', 'target', 'accessKey', 'secretKey']

export function checkEnvConfig(envConfig: EnvConfig) {
    for (const [key, value] of Object.entries(envConfig)) {
        if (!REQUIRED_ENV_PROPS.includes(key)) {
            continue
        }

        if (!value) {
            return false
        }
    }

    return true
}

export const getConfig = memoize(async function (): Promise<Config> {
    const envConfig = getEnvConfig()

    if (process.env.NODE_ENV === 'development') {
        const jsonConfig = await getJsonConfig(envConfig)
        return {
            ...jsonConfig,
            ...envConfig,
        }
    }

    const response = await fetch(`/config.${envConfig.gitHash}.conf`)
    const encodedConfig = await response.text()
    const configStr = decryptConfig(encodedConfig)
    const fileConfig: Config = JSON.parse(configStr)

    return {
        ...fileConfig,
        ...envConfig,
        rumConfig: { ...fileConfig.rumConfig },
    }
}, singletonResolver)
