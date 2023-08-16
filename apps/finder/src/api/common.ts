import { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { NetworkError } from '../errors/networkErrors'
import { getConfig } from '../variants/config'
import { Features } from '../variants/features'
import { request } from './api'

type PagingIntervalTarget =
    | 'block'
    | 'eventLog'
    | 'internalTransaction'
    | 'nftTransfer'
    | 'tokenBurn'
    | 'tokenTransfer'
    | 'transaction'

type PagingLimitTarget =
    | 'block'
    | 'default'
    | 'internalTransaction'
    | 'nft17Holder'
    | 'nft37Holder'
    | 'nftInventory'
    | 'tokenHolder'
    | 'transaction'
    | 'eventLog'

export type ServerConfig = {
    paging: {
        interval: Record<PagingIntervalTarget, number>
        limit: Record<PagingLimitTarget, number>
    }
}

export type Maintenance = {
    application: {
        chainType: string
        name: string
        phase: string
    }
    config: {
        server: ServerConfig
        client: Features
    }
    // @TODO - Apply server time
    // serverTimeMillis: number
}

export const getMaintenanceInfo = () => {
    return request<Maintenance>('/mains')
}

export async function getFeatures(): Promise<Features> {
    const { target, service, featuresHost, network } = await getConfig()

    if (target === 'local') {
        // Use fixed values during development
        const localFeaturesImport = await import(`../variants/${service}/features.local`)
        return localFeaturesImport.default as Features
    }

    const response = await fetch(`${featuresHost}/${network}.${target}.json?_t=${Date.now()}`)
    return response.json()
}

export const useEventLogType = () => {
    const { data: { data } = {} } = useSWR<AxiosResponse<Record<string, string>>>('/types/event-logs', request, {
        suspense: true,
        revalidateOnFocus: false,
    })

    if (!data) {
        throw new NetworkError()
    }

    return data
}
