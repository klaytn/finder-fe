import { Features } from '../features'

/**
 * Features that will be used only during local development (all items set to true).
 */
const LocalFeatures: Features = {
    contractCode: true,
    downloadProposedBlockList: true,
    blockRewards: true,
    showBtcPrice: true,
    showGasPrice: true,
    showTokenDescription: true,
    tokenSearchFilter: true,
    accountSearch: true,
    transactionFilter: true,
    baseFee: true,
    walletConnect: true,
    myPage: true,
    showBlockBurnt: true,
}

export default LocalFeatures
