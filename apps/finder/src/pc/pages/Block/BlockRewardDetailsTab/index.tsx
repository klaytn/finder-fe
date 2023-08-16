import { Component } from 'react'
import styled from 'styled-components'

import { useBlockRewardDetails } from '../../../../api/block'
import NoData from '../../../../components/pc/noData'
import BlockRewardDetails from './details'
import RewardDistribution from './distribution'

type BlockRewardDetailsTabProps = {
    blockId: string | number
}

const BlockRewardDetailsTab = ({ blockId }: BlockRewardDetailsTabProps) => {
    const blockRewardDetails = useBlockRewardDetails(blockId)

    return (
        <Container>
            <BlockRewardDetails data={blockRewardDetails} />
            <RewardDistribution data={blockRewardDetails} />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

class BlockRewardDetailsTabErrorWrapper extends Component<BlockRewardDetailsTabProps> {
    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: !!error }
    }

    render() {
        const { hasError } = this.state
        const { blockId } = this.props

        return hasError ? <NoData /> : <BlockRewardDetailsTab blockId={blockId} />
    }
}

export default BlockRewardDetailsTabErrorWrapper
