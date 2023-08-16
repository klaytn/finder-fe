import { NftTypes } from '../constants/nft'
import { memoize } from './memoize'

export const isNft = memoize((type: string) => NftTypes.map((nftType) => nftType.replace('-', '')).includes(type))
