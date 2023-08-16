import { TransactionReceipt } from 'web3-eth'
import { AbiItem } from 'web3-utils'

export interface WalletMethod {
    estimateGas(params: { from: string }): Promise<number>
    send(params: { from: string; gas: string | number }): Promise<TransactionReceipt>
}

export interface WalletContract {
    methods: Record<string, undefined | ((...params: unknown[]) => WalletMethod)>
}

export type WalletStatus = 'disconnected' | 'connecting' | 'connected'

export interface Wallet {
    connect(): Promise<void>
    disconnect(): void
    isReady(): Promise<boolean>

    sign(message: string): Promise<string>
    executeSmartContract(jsonInterface: AbiItem, params: unknown, to: string): Promise<string>
}
