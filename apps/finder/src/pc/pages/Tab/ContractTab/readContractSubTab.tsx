import { useState } from 'react'
import styled from 'styled-components'

import { ChevronBottomIcon, ChevronTopIcon, Flex, useToggles } from '@klaytn/slush'

import { getMethodSignature } from '../../../../functions/abi'
import { ContractCodeSpec } from '../../../../vo/contractCode'
import { ContractExecuteCard } from './cards'
import { ControlButton, ControlContainer, ExpandAllIcon, ResetButton } from './sharedComponents'

type ReadContractSubTabProps = {
    contractCode: ContractCodeSpec
}

const ReadContractSubTab = ({ contractCode }: ReadContractSubTabProps) => {
    const { abi: allAbi, viewAbi } = contractCode

    const { isShowList, toggle, isAllOn, toggleAll, offAll } = useToggles(viewAbi.length)

    const [initialized, setInitialized] = useState(true)

    const toggleButtonText = isAllOn ? 'Collapse all' : 'Expand all'
    const toggleIcon = isAllOn ? ChevronTopIcon : ChevronBottomIcon

    return (
        <Container>
            <ControlContainer>
                <ControlButton onClick={toggleAll}>
                    <ExpandAllIcon as={toggleIcon} />
                    {toggleButtonText}
                </ControlButton>
                <ResetButton offAll={offAll} setInitialized={setInitialized} />
            </ControlContainer>

            {initialized &&
                viewAbi.map((abi, index) => (
                    <ContractExecuteCard
                        executeAddress={contractCode.executeAddress}
                        key={index}
                        index={index}
                        rawAbi={allAbi}
                        functionName={abi.name || ''}
                        signature={getMethodSignature(abi)}
                        isOpen={isShowList[index]}
                        toggle={() => toggle(index)}
                        mode="read"
                    />
                ))}
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 66px;
    gap: 12px;
`

export default ReadContractSubTab
