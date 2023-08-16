/* eslint-disable @typescript-eslint/no-explicit-any */
import sha512 from '@cryptography/sha512'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import sign from 'jwt-encode'
import { v4 } from 'uuid'

import { singletonResolver } from '@klaytn/slush'

import { NotFoundError } from '../errors/networkErrors'
import { memoize } from '../functions/memoize'
import { getConfig } from '../variants/config'

const responseInterceptor = (response: AxiosResponse<unknown, unknown>) => {
    return response
}
const errorInterceptor = (error: AxiosError) => {
    if (error.response?.status === 404 || error.response?.status === 400) {
        return Promise.reject(new NotFoundError(error.config.url || ''))
    }

    return Promise.reject(error)
}

const createClient = memoize(async (useCaseMiddleware: boolean) => {
    const { apiPath, useSecureProtocol, beHost } = await getConfig()
    const protocol = useSecureProtocol ? 'https' : 'http'
    const apiUrl = `${protocol}://${beHost}${apiPath}`

    // If it's in development mode, use a proxy to prevent CORS issues.
    const baseURL = process.env.NODE_ENV === 'development' ? '/api/v1' : apiUrl

    const client = axios.create({
        baseURL,
        timeout: 5000,
        paramsSerializer: createQueryString,
    })

    client.interceptors.response.use(responseInterceptor, errorInterceptor)

    if (!useCaseMiddleware) {
        return client
    }

    return applyCaseMiddleware(client, {
        caseMiddleware: {
            requestInterceptor: (config) => {
                // Disable query string transformation
                return config
            },
        },
    })
})

function encodeQuery(query: unknown) {
    return encodeURIComponent(`${query}`).replace(/%20/g, '+')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createQueryString = (params: any) =>
    Object.entries(params)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map((item) => `${key}=${encodeQuery(item)}`).join('&')
            }

            return `${key}=${encodeQuery(value)}`
        })
        .join('&')

export const createAuthToken = async (query?: string) => {
    const { accessKey, secretKey } = await getConfig()

    if (!query) {
        const payload = {
            access_key: accessKey,
            nonce: v4(),
        }

        const jwt = sign(payload, secretKey)

        return `Bearer ${jwt}`
    }

    const queryMap = new URLSearchParams(query)
    const encoded = [...queryMap.entries()].map(([key, value]) => `${key}=${encodeQuery(value)}`).join('&')
    const queryHash = sha512(encoded, 'hex')

    const payload = {
        access_key: accessKey,
        nonce: v4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA-512',
    }

    const jwt = sign(payload, secretKey)

    return `Bearer ${jwt}`
}

type RequestConfig = {
    /**
     * Not processing camelCase to snake_case conversion.
     */
    noCaseControl?: boolean

    /**
     * file download
     */
    binary?: boolean

    /**
     * timeout
     */
    timeout?: number

    /**
     * HTTP request method
     */
    method?: 'POST' | 'PUT' | 'GET' | 'DELETE'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async <T = any>(
    url: string,
    params?: any,
    { noCaseControl = false, binary = false, timeout, method = 'GET' }: RequestConfig = {},
) => {
    const axiosInstance = await createClient(!noCaseControl)

    const paramsWithTimestamp = {
        ...params,
        _t: Date.now(),
    }

    const excludedNullParams = Object.keys(paramsWithTimestamp)
        .filter((key) => paramsWithTimestamp[key] !== null)
        .reduce<Record<string, any>>((obj, key) => {
            obj[key] = paramsWithTimestamp[key]
            return obj
        }, {})

    const query = createQueryString(excludedNullParams)
    const authToken = await createAuthToken(query)
    const config: AxiosRequestConfig = {
        url,
        method,
        headers: {
            Authorization: authToken,
        },
        params: paramsWithTimestamp,
    }

    if (binary) {
        config.responseType = 'blob'
    }

    if (timeout !== undefined) {
        config.timeout = timeout
    }

    return axiosInstance.request<T>(config)
}

export const requestAndBind = async <RawData, VO, Params extends { size?: number }>(
    binder: (item: RawData, size?: number) => Promise<VO> | VO,
    url: string,
    params?: Params,
    config?: RequestConfig,
) => {
    const { data } = await request<RawData>(url, params, config)
    return binder(data, params?.size)
}

export interface IPaging {
    paging: Paging
}

export interface Paging {
    totalCount: number
    currentPage: number
    // last: boolean
    totalPage: number
}

export interface WithPaging<Data> {
    paging: Paging
    results: Data[]
}

export const defaultPage: Paging = {
    totalCount: 0,
    currentPage: 0,
    totalPage: 0,
}

export interface AddressInfo {
    address: string
    accountType?: string
    contractType?: string
    symbol?: string
    name?: string
    knsDomain?: string
    icon?: string
    addressLabel?: string
    verified?: boolean
    tags?: readonly string[]
}

export function isAddressInfo(target: unknown): target is AddressInfo {
    if (!target) {
        return false
    }

    if (typeof target !== 'object') {
        return false
    }

    const keys = ['address']
    return keys.every((key) => key in (target as any))
}

export const defaultAddressInfo: AddressInfo = {
    address: '',
    accountType: '',
    contractType: '',
}

export const emptyApiResponse = {
    config: {},
    headers: {},
    status: 200,
    statusText: 'success',
}

export const getPostClient = memoize(async () => {
    const { apiPath, useSecureProtocol, beHost } = await getConfig()
    const protocol = useSecureProtocol ? 'https' : 'http'
    const apiUrl = `${protocol}://${beHost}${apiPath}`

    // If it's in development mode, use a proxy to prevent CORS issues.
    // TODO - Currently, there's an issue with the proxy, so to test locally, host configuration is required. The proxy needs to be modified accordingly.
    const baseURL = process.env.NODE_ENV === 'development' ? '/api/v1' : apiUrl

    return axios.create({
        baseURL,
        timeout: 30000,
    })
}, singletonResolver)

export type AccountKey = Record<string, unknown> & {
    type:
        | 'AccountKeyLegacy'
        | 'AccountKeyPublic'
        | 'AccountKeyFail'
        | 'AccountKeyWeightedMultiSig'
        | 'AccountKeyRoleBased'
}
