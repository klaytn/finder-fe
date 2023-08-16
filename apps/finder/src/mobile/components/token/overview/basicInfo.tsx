import styled from 'styled-components'

import { Flex } from '@klaytn/slush'

import { useToken } from '../../../../api/token'
import Hash from '../../common/hash'
import { OverviewFullRow, OverviewRow, OverviewValueText } from '../../common/overviewRows'

type BasicInfoProps = {
    address: string
}

const BasicInfo = ({ address }: BasicInfoProps) => {
    const {
        info: { name, symbol, contractAddress },
    } = useToken(address)

    return (
        <Container>
            <OverviewRow title="Contract" marginBottom={8} />
            <OverviewFullRow marginBottom={16}>
                <Hash hash={contractAddress} copy link={`/account/${contractAddress}`} />
            </OverviewFullRow>

            <OverviewRow title="Name" marginBottom={16}>
                <OverviewValueText>{name}</OverviewValueText>
            </OverviewRow>

            <OverviewRow title="Symbol" marginBottom={8}>
                <OverviewValueText>{symbol}</OverviewValueText>
            </OverviewRow>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 24px;
`

export default BasicInfo
