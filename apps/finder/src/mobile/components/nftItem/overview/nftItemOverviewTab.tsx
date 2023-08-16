import InnerBox from '../../common/innerBox'
import BasicInfo from './basicInfo'
import HolderInfo from './holderInfo'

type NftItemOverviewTabProps = {
    address: string
    tokenId: string
}

const NftItemOverviewTab = ({ address, tokenId }: NftItemOverviewTabProps) => {
    return (
        <InnerBox paddingBottom={4}>
            <BasicInfo address={address} tokenId={tokenId} />
            <HolderInfo address={address} tokenId={tokenId} />
        </InnerBox>
    )
}

export default NftItemOverviewTab
