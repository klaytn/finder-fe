import {
    prepare,
    request,
    getResult,
    KlipAuthResult,
    KlipSignResult,
    PrepareContractExecuteParams,
    KlipContractExecuteResult,
} from 'klip-sdk'
import { AbiItem } from 'web3-utils'

import { delay } from '@klaytn/slush'

import { LocalStorageKey } from '../../constants/storage'
import { DeferredPromise } from '../../functions/deferred'
import { KlipRequestKey } from '../../states/wallet'
import { ObservableValue } from '../observableValue'
import { Wallet } from './wallet'

const KLIP_REQUEST_CHECK_DELAY_MS = 1000

const CANCELED_MESSAGE = 'Canceled by user'

/**
 * Client for using Klip as an API from a PC
 */
class KlipClient {
    constructor(private readonly _observableRequestKey: ObservableValue<KlipRequestKey>) {}

    private get appName() {
        return process.env.REACT_APP_PUBLIC_TITLE || 'KlaytnFinder'
    }

    private get _requestKey() {
        return this._observableRequestKey.get()
    }

    private set _requestKey(requestKey: KlipRequestKey) {
        this._observableRequestKey.set(requestKey)
    }

    get isRequested() {
        return !!this._requestKey.key
    }

    async requestAndCheck<Result>(requestKey: KlipRequestKey) {
        try {
            const deferred = new DeferredPromise()

            await Promise.all([
                request<Result>(requestKey.key, () => {
                    this._requestKey = requestKey
                    deferred.resolve()
                }),
                deferred,
            ])

            // Infinitely repeat with a certain time interval until completion
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { key, expirationTime } = this._requestKey
                if (!key) {
                    throw new Error(CANCELED_MESSAGE)
                }

                if (expirationTime * 1000 < Date.now()) {
                    throw new Error('Timeout')
                }

                const result = await getResult<Result>(key)
                switch (result.status) {
                    case 'completed':
                        return result

                    case 'canceled':
                        throw new Error(CANCELED_MESSAGE)

                    case 'error':
                        throw new Error(result.error?.err || 'klip error')

                    default:
                        await delay(KLIP_REQUEST_CHECK_DELAY_MS)
                        continue
                }
            }
        } finally {
            this._requestKey = {
                key: '',
                expirationTime: 0,
            }
        }
    }

    async auth() {
        const prepareResult = await prepare.auth({ bappName: this.appName })
        if (prepareResult.error) {
            throw new Error(prepareResult.error.err)
        }

        const {
            result: { klaytn_address },
        } = await this.requestAndCheck<KlipAuthResult>({
            key: prepareResult.request_key,
            expirationTime: prepareResult.expiration_time,
        })

        return klaytn_address
    }

    async sign(from: string, message: string) {
        const prepareResult = await prepare.signMessage({ bappName: this.appName, from, value: message })

        if (prepareResult.error) {
            throw new Error(prepareResult.error.err)
        }

        const {
            result: { signature },
        } = await this.requestAndCheck<KlipSignResult>({
            key: prepareResult.request_key,
            expirationTime: prepareResult.expiration_time,
        })

        return signature
    }

    async contractExecute(params: Omit<PrepareContractExecuteParams, 'bappName'>) {
        const prepareResult = await prepare.executeContract({ bappName: this.appName, ...params })

        if (prepareResult.error) {
            throw new Error(prepareResult.error.err)
        }

        const {
            result: { tx_hash },
        } = await this.requestAndCheck<KlipContractExecuteResult>({
            key: prepareResult.request_key,
            expirationTime: prepareResult.expiration_time,
        })

        return tx_hash
    }
}

export class KlipWallet implements Wallet {
    static isAvailable(network: string) {
        return network === 'cypress'
    }

    private readonly client = new KlipClient(this._observableRequestKey)

    private get savedKlipAddress() {
        return localStorage.getItem(LocalStorageKey.KlipAddress) || ''
    }

    get selectedAddress() {
        return this._observableSelectedAddress.get()
    }

    async isReady() {
        return !!this.savedKlipAddress
    }

    constructor(
        private readonly _observableSelectedAddress: ObservableValue<string>,
        private readonly _observableChainId: ObservableValue<number>,
        private readonly _observableRequestKey: ObservableValue<KlipRequestKey>,
    ) {}

    async connect() {
        if (this.client.isRequested) {
            return
        }

        const selectedAddress = this.savedKlipAddress || (await this.client.auth())

        localStorage.setItem(LocalStorageKey.KlipAddress, selectedAddress)

        this._observableSelectedAddress.set(selectedAddress)
        this._observableChainId.set(8217) // klip only supports cypress
    }

    disconnect() {
        localStorage.removeItem(LocalStorageKey.KlipAddress)
    }

    async sign(message: string) {
        return this.client.sign(this._observableSelectedAddress.get(), message)
    }

    executeSmartContract(jsonInterface: AbiItem, params: unknown, to: string): Promise<string> {
        const { selectedAddress: from } = this
        return this.client.contractExecute({
            from,
            to,
            abi: JSON.stringify(jsonInterface),
            params: JSON.stringify(params),
            value: '0',
        })
    }
}
