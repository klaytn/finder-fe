/**
 * Feature flags that can be toggled on or off depending on the service or situation.
 */
export type Features = {
    /**
     * All related features for contract code display/submit/execution, etc.
     */
    contractCode?: boolean

    /**
     * Download the list of blocks proposed by CN.
     */
    downloadProposedBlockList?: boolean

    /**
     * Display block rewards.
     */
    blockRewards?: boolean

    /**
     * Display BTC price.
     */
    showBtcPrice?: boolean

    /**
     * Display the Gas Price item in the UI.
     * In some cases, GasPrice may be explicitly shown as 0 by removing the amount instead of displaying it.
     */
    showGasPrice?: boolean

    /**
     * Display a description at the bottom of the Token/NFT list page.
     */
    showTokenDescription?: boolean

    /**
     * Enable filtering on the Token/NFT search page.
     */
    tokenSearchFilter?: boolean

    /**
     * Enable account search functionality.
     */
    accountSearch?: boolean

    /**
     * Enable transaction filtering functionality.
     */
    transactionFilter?: boolean

    /**
     * Display base fee.
     */
    baseFee?: boolean

    /**
     * Wallet connection.
     */
    walletConnect?: boolean

    /**
     * Accessible my page after wallet connection.
     */
    myPage?: boolean

    /**
     * Display block-specific and total burnt information.
     */
    showBlockBurnt?: boolean

    /**
     * Display Account Key information and history.
     */
    accountKey?: boolean

    /**
     * Activate the block reward detail tab.
     */
    blockRewardDetail?: boolean

    /**
     * Popup
     * @example {"en":"https://finder-public.s3.ap-northeast-2.amazonaws.com/popup/operator-change-en.png","ko":"https://finder-public.s3.ap-northeast-2.amazonaws.com/popup/operator-change-ko.png"}
     */
    popup?: string
}
