import { AbstractProvider } from 'web3-core'

interface Metamask {
    isUnlocked(): Promise<boolean>
}

interface MetamaskProvider extends AbstractProvider {
    isMetamask?: boolean
    networkVersion?: string
    isConnected(): boolean
    _metamask: Metamask
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(eventName: string, callback: (...args: any[]) => void)
}

export declare global {
    interface Window {
        ethereum?: MetamaskProvider
    }
}
