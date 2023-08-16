import { useCallback } from 'react'
import styled from 'styled-components'

import {
    ArrowSquareOutIcon,
    Button,
    colors,
    Icon,
    MathEqualsIcon,
    MathMinusIcon,
    MathPlusIcon,
    useToggle,
} from '@klaytn/slush'

import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import { BlockRewardDetailsVO } from '../../../../vo/blockRewardDetails'
import DescriptionModal from './descriptionModal'
import DetailCard from './detailCard'
import Row from './row'

const KIP_82_SPEC_DOC_URL = 'https://kips.klaytn.foundation/KIPs/kip-82'

type BlockRewardDetailsProps = {
    data: BlockRewardDetailsVO
}

const BlockRewardDetails = ({ data: { totalRewards, minted, totalFee, burntFee } }: BlockRewardDetailsProps) => {
    const descModalState = useToggle()

    const handleOpenSpecDoc = useCallback(() => {
        window.open(KIP_82_SPEC_DOC_URL, '_blank', 'noreperrer noopener')
    }, [])

    return (
        <>
            <DescriptionModal show={descModalState.isShow} onClose={descModalState.off} />
            <Row
                title="Block Reward Details"
                onClickInfo={descModalState.on}
                additional={
                    <Button buttonType="forth" size={28} rightIcon={ArrowSquareOutIcon} onClick={handleOpenSpecDoc}>
                        KIP 82 Spec Docs
                    </Button>
                }
            >
                <Container>
                    <DetailCard title="Block Rewards" amount={totalRewards} width={300} hasBorder />
                    <MathIcon icon={MathEqualsIcon} />
                    <RightContainer>
                        <DetailCard title="Minted" amount={minted} width={232} />
                        <MathIcon icon={MathPlusIcon} />
                        <DetailCard title="Total Fee" amount={totalFee} width={232} />
                        <MathIcon icon={MathMinusIcon} />
                        <DetailCard title="Burnt Fee" amount={burntFee} width={232} />
                    </RightContainer>
                </Container>
            </Row>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 35px;
`

type MathIconProps = {
    icon: Icon
}
const MathIcon = ({ icon: IconComponent }: MathIconProps) => {
    const color = useFinderThemeColor(colors.white)

    return (
        <MathIconContainer>
            <IconComponent size={24} color={color} />
        </MathIconContainer>
    )
}

const MathIconContainer = styled.div`
    display: flex;
`

export default BlockRewardDetails
