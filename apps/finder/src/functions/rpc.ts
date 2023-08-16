import Axios from 'axios'
import BigNumber from 'bignumber.js'
import Caver, { AbiItem } from 'caver-js'

import { delay } from '@klaytn/slush'

import { getTransaction } from '../api/transaction'
import { NULL_ADDRESS } from '../constants/address'
import { NotFoundError } from '../errors/networkErrors'
import { Wallet } from '../utils/wallet/wallet'

export type RPCResultType = string | number | boolean

type RemoteCallParams = {
    caver: Caver
    to: string
    abi: AbiItem
    params: unknown
}

export async function remoteCall({ caver, to, abi, params }: RemoteCallParams) {
    const outputAbis = abi.outputs || []
    const data = caver.abi.encodeFunctionCall(abi, params)
    const rawResult = await caver.klay.call({
        to,
        data,
    })

    const result = caver.klay.abi.decodeParameters(outputAbis, rawResult)
    return Array.from<RPCResultType>({ ...result, length: result.__length__ })
}

type GetApprovedParams = {
    caver: Caver
    contractAddress: string
    tokenId: string
    fromAddress: string
}

/**
 * @returns approved address
 */
export async function getApproved({ caver, contractAddress, tokenId, fromAddress }: GetApprovedParams) {
    const data = caver.klay.abi.encodeFunctionCall(
        {
            name: 'getApproved',
            type: 'function',
            inputs: [
                {
                    type: 'uint256',
                    name: '_tokenId',
                },
            ],
        },
        [tokenId],
    )

    const result = await caver.klay.call({
        from: fromAddress,
        to: contractAddress,
        data,
    })

    return '0x' + result.slice(result.length - 40, result.length)
}

type IsApprovedForAllParams = {
    caver: Caver
    contractAddress: string
    spenderAddress: string
    fromAddress: string
}
export async function isApprovedForAll({
    caver,
    contractAddress,
    spenderAddress,
    fromAddress,
}: IsApprovedForAllParams) {
    const data = caver.klay.abi.encodeFunctionCall(
        {
            name: 'isApprovedForAll',
            type: 'function',
            inputs: [
                {
                    type: 'address',
                    name: '_owner',
                },
                {
                    type: 'address',
                    name: '_operator',
                },
            ],
        },
        [fromAddress, spenderAddress],
    )

    const result = await caver.klay.call({
        from: fromAddress,
        to: contractAddress,
        data,
    })

    return new BigNumber(result).eq(1)
}

type GetAllowanceParams = {
    caver: Caver
    contractAddress: string
    spenderAddress: string
    fromAddress: string
}

export async function getAllowance({ caver, contractAddress, spenderAddress, fromAddress }: GetAllowanceParams) {
    const data = caver.klay.abi.encodeFunctionCall(
        {
            name: 'allowance',
            type: 'function',
            inputs: [
                {
                    type: 'address',
                    name: '_owner',
                },
                {
                    type: 'address',
                    name: '_spender',
                },
            ],
        },
        [fromAddress, spenderAddress],
    )

    const result = await caver.klay.call({
        from: fromAddress,
        to: contractAddress,
        data,
    })

    return new BigNumber(caver.utils.hexToNumberString(result))
}

type RevokeTokenParams = {
    caver: Caver
    wallet: Wallet
    contractAddress: string
    spenderAddress: string
}

/**
 *
 * @returns transactionHash
 */
export async function revokeToken({ caver, wallet, contractAddress, spenderAddress }: RevokeTokenParams) {
    return wallet.executeSmartContract(
        {
            name: 'approve',
            type: 'function',
            inputs: [
                {
                    type: 'address',
                    name: '_spender',
                },
                {
                    type: 'uint256',
                    name: '_value',
                },
            ],
        },
        [spenderAddress, caver.utils.toPeb('0', 'KLAY')],
        contractAddress,
    )
}

type RevokeNft = {
    wallet: Wallet
    contractAddress: string
    spenderAddress: string
}

export async function revokeNft({ wallet, contractAddress, spenderAddress }: RevokeNft) {
    return wallet.executeSmartContract(
        {
            name: 'setApprovalForAll',
            type: 'function',
            inputs: [
                {
                    type: 'address',
                    name: '_to',
                },
                {
                    type: 'bool',
                    name: '_approved',
                },
            ],
        },
        [spenderAddress, ''],
        contractAddress,
    )
}

type RevokeNftByIdParams = {
    wallet: Wallet
    contractAddress: string
    tokenId: string
}

export async function revokeNftById({ wallet, contractAddress, tokenId }: RevokeNftByIdParams) {
    return wallet.executeSmartContract(
        {
            name: 'approve',
            type: 'function',
            inputs: [
                {
                    type: 'address',
                    name: '_to',
                },
                {
                    type: 'uint256',
                    name: '_tokenId',
                },
            ],
        },
        [NULL_ADDRESS, tokenId],
        contractAddress,
    )
}

/**
 * check if txHash exists in finder DB maxCount times
 * If not, wait delayMs and retry
 */
export const waitForSaveTransaction = async (txHash: string, maxCount = 10, delayMs = 300) => {
    for (let count = 0; count < maxCount; count++) {
        try {
            const {
                data: { transactionHash },
            } = await getTransaction(txHash)
            if (transactionHash === txHash) {
                break
            }
        } catch (err) {
            if (Axios.isAxiosError(err) && err.code === '404') {
                // We don't expect to be inside this if statement, but just in case, we'll add an extra
                await delay(delayMs)
                continue
            }

            if (err instanceof NotFoundError) {
                await delay(delayMs)
                continue
            }

            throw err
        }
    }
}
