import { atom } from 'recoil'

export interface IFinderSummary {
    consensus_node: number
    average_block_time: string
    average_tx_per_block: number
}

export const finderSummaryState = atom<IFinderSummary>({
    key: 'finderSummary',
    default: {
        consensus_node: 0,
        average_block_time: '',
        average_tx_per_block: 0,
    },
})
