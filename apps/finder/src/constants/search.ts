import { OptionPanelType } from '@klaytn/slush'

export const SORT_TYPE = {
    TIME: 'TIME',
    TOTAL_SUPPLY: 'TOTAL_SUPPLY',
    TOTAL_TRANSFER: 'TOTAL_TRANSFER',
} as const

export const SORT_DIRECTION = {
    ASC: 'ASC',
    DESC: 'DESC',
} as const

export const OPTION_PANELS: OptionPanelType[] = [
    {
        text: 'All',
        duration: 'none',
        period: 0,
    },
    {
        text: 'Today',
        duration: 'days',
        period: 0,
    },
    {
        text: '1 week',
        duration: 'weeks',
        period: 1,
    },
    {
        text: '1 month',
        duration: 'months',
        period: 1,
    },
    {
        text: '3 months',
        duration: 'months',
        period: 3,
    },
    {
        text: '6 months',
        duration: 'months',
        period: 6,
    },
    {
        text: '1 year',
        duration: 'years',
        period: 1,
    },
]
