import styled from 'styled-components'

import { Divider, Flex, If } from '@klaytn/slush'

import { useNft } from '../../../../api/nft'
import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { klay, withCommas } from '../../../../functions/Functions'
import Hash from '../../common/hash'
import { OverviewDescText, OverviewFullRow, OverviewRow, OverviewValueText } from '../../common/overviewRows'

type BasicInfoProps = {
    address: string
}

const BasicInfo = ({ address }: BasicInfoProps) => {
    const {
        info: { name, symbol, contractAddress, hasName, hasSymbol },
        totalSupply,
        totalTransfers,
        isLightType,
    } = useNft(address)

    return (
        <Container>
            <OverviewRow title="Contract" marginBottom={8} />
            <OverviewFullRow marginBottom={16}>
                <Hash hash={contractAddress} copy link={`/account/${contractAddress}`} />
            </OverviewFullRow>

            <If condition={hasName}>
                <OverviewRow title="Name" marginBottom={16}>
                    <OverviewValueText>{name}</OverviewValueText>
                </OverviewRow>
            </If>

            <If condition={hasSymbol}>
                <OverviewRow title="Symbol" marginBottom={16}>
                    <OverviewValueText>{symbol}</OverviewValueText>
                </OverviewRow>
            </If>

            <Divider />
            <OverviewRow marginTop={24} />

            <If condition={!isLightType}>
                <OverviewRow title="Total supply" marginBottom={2}>
                    <OverviewValueText>
                        <EllipsisNumber value={klay(totalSupply)} noEllipsis />
                    </OverviewValueText>
                </OverviewRow>
                <OverviewRow marginBottom={16}>
                    <OverviewDescText>{symbol}</OverviewDescText>
                </OverviewRow>
            </If>

            <OverviewRow title="Total Transfer">
                <OverviewValueText>{withCommas(totalTransfers)}</OverviewValueText>
            </OverviewRow>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 24px;
`

export default BasicInfo
