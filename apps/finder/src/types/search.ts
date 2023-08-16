import { SORT_DIRECTION, SORT_TYPE } from '../constants/search'

export type SortType = typeof SORT_TYPE[keyof typeof SORT_TYPE]
export type SortDirection = typeof SORT_DIRECTION[keyof typeof SORT_DIRECTION]
