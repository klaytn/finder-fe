import styled from 'styled-components'

import { Divider, Flex } from '@klaytn/slush'

import { useNftItem } from '../../../../api/nft'
import Copy from '../../../../components/commons/Copy'
import { OverviewRow, OverviewValueText } from '../../common/overviewRows'

type HolderInfoProps = {
    address: string
    tokenId: string
}

const HolderInfo = ({ address, tokenId }: HolderInfoProps) => {
    const { uri } = useNftItem(address, tokenId)

    return (
        <>
            <Container>
                <Divider />
                <OverviewRow title="Token ID" marginTop={24} marginBottom={16}>
                    <Row>
                        <OverviewValueText>{tokenId}</OverviewValueText>
                        <Copy value={tokenId} style="inline" message="Token ID copied." />
                    </Row>
                </OverviewRow>
                <OverviewRow title="Token URI" marginBottom={2}>
                    <Row>
                        <OverviewValueText>{uri}</OverviewValueText>
                        <Copy value={uri} style="inline" message="Token URI copied." />
                    </Row>
                </OverviewRow>
            </Container>
        </>
    )
}

const Container = styled(Flex)`
    margin-top: 8px;
    margin-bottom: 16px;
`

const Row = styled(Flex).attrs({
    direction: 'row',
})`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export default HolderInfo
