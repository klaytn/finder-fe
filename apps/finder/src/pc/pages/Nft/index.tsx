import { useParams } from 'react-router'

import { useNft } from '../../../api/nft'
import { ItemTitle } from '../../../components/Title'
import NftSummary from './NftSummary'
import NftTabContainer from './NftTabContainer'

const Nft = () => {
    const params = useParams()
    const tokenId = params.tokenId
    const contractAddress = params.address as string

    const nft = useNft(contractAddress)

    return (
        <>
            <div>
                <ItemTitle
                    icon={nft.info.icon}
                    alt="token image"
                    title={nft.info.symbol}
                    types={[nft.type]}
                    tokenId={tokenId}
                    showTokenIdOnly
                />
            </div>
            <NftSummary nft={nft} />
            {nft.info.contractAddress !== '' && (
                <NftTabContainer
                    tokenId={tokenId}
                    contractAddress={nft.info.contractAddress}
                    type={nft.type}
                    isLightType={nft.isLightType}
                />
            )}
        </>
    )
}

export default Nft
