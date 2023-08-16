import styled from 'styled-components'

import { Divider, Flex, If } from '@klaytn/slush'

import { useNftItem } from '../../../../api/nft'
import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { klay } from '../../../../functions/Functions'
import Hash from '../../common/hash'
import { OverviewDescText, OverviewRow, OverviewValueText } from '../../common/overviewRows'

type BasicInfoProps = {
    address: string
    tokenId: string
}

const BasicInfo = ({ address, tokenId }: BasicInfoProps) => {
    const {
        info: { name, symbol, contractAddress, hasName, hasSymbol },
        burnAmount,
        totalSupply,
        isLightType,
    } = useNftItem(address, tokenId)

    return (
        <Container>
            <OverviewRow title="Contract" marginBottom={8} />
            <Hash hash={contractAddress} copy link={`/account/${contractAddress}`} />

            <If condition={hasName}>
                <OverviewRow title="Name" marginTop={16}>
                    <OverviewValueText>{name}</OverviewValueText>
                </OverviewRow>
            </If>

            <If condition={hasSymbol}>
                <OverviewRow title="Symbol" marginTop={16}>
                    <OverviewValueText>{symbol}</OverviewValueText>
                </OverviewRow>
            </If>

            <If condition={isLightType}>
                <OverviewRow marginTop={24} />
                <Divider />
                <OverviewRow marginTop={24} />

                <OverviewRow title="Total supply" marginBottom={2}>
                    <OverviewValueText>
                        <EllipsisNumber value={klay(totalSupply)} noEllipsis />
                    </OverviewValueText>
                </OverviewRow>
                <OverviewRow marginBottom={16}>
                    <OverviewDescText>{symbol}</OverviewDescText>
                </OverviewRow>

                <OverviewRow title="Burnt amount" marginBottom={2}>
                    <OverviewValueText>
                        <EllipsisNumber value={klay(burnAmount)} noEllipsis />
                    </OverviewValueText>
                </OverviewRow>
                <OverviewRow>
                    <OverviewDescText>{symbol}</OverviewDescText>
                </OverviewRow>
            </If>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 16px;
`

export default BasicInfo
