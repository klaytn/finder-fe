import { TokenTypes } from '../constants/token'
import { memoize } from './memoize'

export const isToken = memoize((type: string) =>
    TokenTypes.map((tokenType) => tokenType.replace('-', '')).includes(type),
)
