import { atom } from 'recoil'

interface BlockBurnt {
    /**
     * Accumulated sum of burnt fees up to the latest block
     */
    accumulate_burnt_fees: string

    /**
     * Accumulated sum of manually burnt KLAY up to the latest block
     */
    accumulate_burnt_klay: string

    /**
     * Accumulated sum of burnt fees + accumulated sum of manually burnt KLAY up to the latest block
     */
    accumulate_burnt: string

    /**
     * Nearest block number, equal to or smaller than the block_height
     */
    nearest_block_number: number

    /**
     * Burnt KLAY amount on KIP103 hard fork
     */
    kip103_burnt: string
}

export interface IFinderStatus {
    /**
     * Latest block number
     */
    block_height: number

    /**
     * Time value
     */
    datetime: string

    block_burnt: BlockBurnt
}

export const finderStatusState = atom<IFinderStatus>({
    key: 'finderStatus',
    default: {
        block_height: 0,
        datetime: '',
        block_burnt: {
            accumulate_burnt_fees: '0',
            accumulate_burnt_klay: '0',
            accumulate_burnt: '0',
            nearest_block_number: 0,
            kip103_burnt: '0',
        },
    },
})
