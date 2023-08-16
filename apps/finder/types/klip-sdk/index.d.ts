declare module 'klip-sdk' {
    type PrepareBaseParams = {
        bappName
        successLink?: string
        failLink?: string
    }
    export type PrepareAuthParams = PrepareBaseParams
    export type PrepareSignMessageParams = PrepareBaseParams & {
        from?: string
        value: string
    }
    export type PrepareContractExecuteParams = PrepareBaseParams & {
        from?: string
        to: string
        value: string
        abi: string
        params: string
    }

    type KlipError = {
        err: string
        code: number
    }
    export type KlipResponse<Result = undefined> = {
        expiration_time: number
        request_key: string
        status: 'error' | 'prepared' | 'pending' | 'completed' | 'canceled'
        error?: KlipError
        result: Result
    }
    export type KlipAuthResult = {
        klaytn_address: string
    }
    export type KlipSignResult = {
        signature: string // User signature for the original text
        hash: string
    }
    export type KlipContractExecuteResult = {
        tx_hash: string
        status: 'success' | 'fail' | 'pending'
    }

    declare function auth(params: PrepareAuthParams): Promise<KlipResponse<KlipAuthResult>>
    declare function signMessage(params: PrepareSignMessageParams): Promise<KlipResponse<KlipSignResult>>
    declare function executeContract(
        params: PrepareContractExecuteParams,
    ): Promise<KlipResponse<KlipContractExecuteResult>>

    export declare const prepare = {
        auth,
        signMessage,
        executeContract,
    }

    export declare function request<Result>(
        requestKey: string,
        onUnsupportedEnvironment: () => void,
    ): Promise<KlipResponse<Result>>
    export declare function getResult<Result>(requestKey: string): Promise<KlipResponse<Result>>
}
