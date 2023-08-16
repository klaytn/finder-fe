import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getNftItem } from '../../../api/nft'
import { ItemTitle } from '../../../components/Title'
import useAsyncError from '../../../hooks/useAsyncError'
import { NftItemDetailVO } from '../../../vo/nft'
import NftItemSummary from './NftItemSummary'
import NftItemTabContainer from './NftItemTabContainer'

const NftItemPage = () => {
    const params = useParams()
    const throwError = useAsyncError()
    const tokenId = params.tokenId || ''
    const contractAddress = params.address || ''

    const [nftItem, setNftItem] = useState<NftItemDetailVO | null>(null)

    const reloadNftItem = useCallback(async () => {
        try {
            const { data } = await getNftItem(contractAddress, tokenId)
            setNftItem(new NftItemDetailVO(data))
        } catch (e) {
            throwError(e)
        }
    }, [contractAddress, tokenId, throwError])

    useEffect(() => {
        reloadNftItem()
    }, [reloadNftItem])

    if (!nftItem) {
        return null
    }

    return (
        <>
            <div>
                <ItemTitle
                    title={nftItem.info.symbol}
                    icon={nftItem.info.icon}
                    alt="token image"
                    types={[nftItem.type]}
                    tokenId={tokenId}
                />
            </div>
            <NftItemSummary nftItem={nftItem} reloadNftItem={reloadNftItem} />
            <NftItemTabContainer
                tokenId={tokenId}
                contractAddress={nftItem.info.contractAddress}
                type={nftItem.type}
                isLightType={nftItem.isLightType}
                hasHolders={nftItem.hasHolders}
            />
        </>
    )
}

export default NftItemPage
