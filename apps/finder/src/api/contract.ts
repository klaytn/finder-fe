import { filterEmptyValue } from '../functions/Functions'
import { SelectableWalletType } from '../states/wallet'
import { createAuthToken, createQueryString, getPostClient, request } from './api'

export const getContractCode = async () => {
    return await request<ContractCodeResponse>(`/contract-codes`)
}

export interface ContractCodeResponse {
    licenses: string[]
    versions: string[]
    evmVersions: EvmVersion[]
}

export interface EvmVersion {
    name: string
    desc: string
}

export type Library = {
    name: string
    address: string
}

type ContractSubmitData = {
    contractAddress: string
    contractCreatorSignature: string
    optimizationRuns?: string
    abiEncodedValue?: string
    compilerVersion: string
    licenseType: string
    evmVersion: string
    optimization: string
    sourceCode?: FileList
    officialWebSite?: string
    officialEmailAddress?: string
    tokenName?: string
    tokenSymbol?: string
    tokenImage?: FileList
    walletType?: SelectableWalletType
    libraries?: Library[]
}

type PostContractResponse = {
    result: boolean
}

export async function postContract(data: ContractSubmitData) {
    const form = new FormData()

    for (const [key, value] of Object.entries(filterEmptyValue(data))) {
        if (['sourceCode', 'tokenImage'].includes(key)) {
            const [file] = value as FileList
            form.append(key, file)
        } else if (key === 'libraries') {
            const list: Library[] = value
            list.map(({ name, address }) => ({ name: name.trim(), address: address.trim() }))
                .filter(({ name, address }) => name && address)
                .map(({ name, address }) => encodeURI(`${name}=${address}`))
                .forEach((encoded) => {
                    form.append('libraries', encoded)
                })
        } else {
            const strValue = value as string
            form.append(key, strValue)
        }
    }

    const params = { _t: Date.now() }
    const query = createQueryString(params)
    const authToken = await createAuthToken(query)
    const apiClient = await getPostClient()

    return apiClient.post<PostContractResponse>('/contract-submissions', form, {
        params,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authToken,
        },
    })
}
