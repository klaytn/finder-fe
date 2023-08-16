import styled from 'styled-components'

import { ChevronBottomIcon, ChevronTopIcon, colors, Flex, Text, typos, useToggle } from '@klaytn/slush'

import { useBlock } from '../../../../api/block'
import { group } from '../../../../functions/group'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import Hash from '../../common/hash'
import { OverviewRow } from '../../common/overviewRows'

const MAX_VALIDATORS = 6

type ProposersProps = {
    id: string
}

const Proposers = ({ id }: ProposersProps) => {
    const {
        hasValidators,
        committee: { blockProposer, validators },
    } = useBlock(id)

    const { isShow, toggle } = useToggle()

    const whiteColor = useFinderThemeColor(colors.white)

    const validatorTuples = group(validators, 2)
    const hasExpander = validatorTuples.length > MAX_VALIDATORS

    const showValidatorTuples = isShow ? validatorTuples : validatorTuples.slice(0, MAX_VALIDATORS)

    const ExpanderIcon = isShow ? ChevronTopIcon : ChevronBottomIcon

    return (
        <Container>
            <OverviewRow title="Block Proposer" marginBottom={16}>
                <ProposerContainer>
                    <Hash hash={blockProposer.displayName} link={`/account/${blockProposer.address}`} />
                </ProposerContainer>
            </OverviewRow>

            {hasValidators && (
                <>
                    <OverviewRow title={`Validators (${validators.length})`} marginBottom={15} />
                    {showValidatorTuples.map(([hash1, hash2]) => (
                        <ValidatorRow
                            key={hash1.address}
                            hash1={hash1.displayName}
                            link1={hash1.address}
                            hash2={hash2?.displayName}
                            link2={hash2?.address}
                        />
                    ))}
                </>
            )}

            {hasExpander && (
                <ExpanderRow onClick={toggle}>
                    <ExpanderIcon size={16} color={whiteColor} />
                </ExpanderRow>
            )}
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 24px;
    margin-bottom: 20px;
`

const ProposerContainer = styled(Flex)`
    overflow: hidden;
    white-space: nowrap;
    padding-left: 90px;
`

type ValidatorRowProps = {
    hash1: string
    link1: string
    hash2?: string
    link2?: string
}

const ValidatorRow = ({ hash1, hash2, link1, link2 }: ValidatorRowProps) => {
    return (
        <ValidatorContainer>
            <Hash hash={hash1} link={`/account/${link1}`} basis={0} />
            <ValidatorMargin />
            {hash2 ? <Hash hash={hash2} link={`/account/${link2}`} basis={0} /> : <HashDummy />}
        </ValidatorContainer>
    )
}

const ValidatorContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    align-items: center;
    margin-bottom: 6px;
`

const ValidatorMargin = styled(Flex)`
    width: 43px;
`

const HashDummy = styled(Text).attrs({
    typo: typos.suit['12.16_400'],
})`
    flex-grow: 1;
    flex-basis: 0;
    border-radius: 8px;
    visibility: hidden;
`

const ExpanderRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    margin-top: 17px;
`

export default Proposers
