import { useState } from 'react'
import styled from 'styled-components'

import { ChevronBottomIcon, ChevronTopIcon, Flex, useToggles } from '@klaytn/slush'

import { getMethodSignature } from '../../../../functions/abi'
import { ContractCodeSpec } from '../../../../vo/contractCode'
import { ContractExecuteCard } from './cards'
import ConnectWalletButton from './connectWalletButton'
import { ControlButton, ControlContainer, ExpandAllIcon, ResetButton } from './sharedComponents'

type WriteContractSubTabProps = {
    contractCode: ContractCodeSpec
}

const WriteContractSubTab = ({ contractCode }: WriteContractSubTabProps) => {
    const { abi: allAbi, writeAbi, executeAddress } = contractCode

    const { isShowList, toggle, isAllOn, toggleAll, offAll } = useToggles(writeAbi.length)

    const [initialized, setInitialized] = useState(true)

    const toggleButtonText = isAllOn ? 'Collapse all' : 'Expand all'
    const toggleIcon = isAllOn ? ChevronTopIcon : ChevronBottomIcon

    return (
        <Container>
            <ControlOuterContainer>
                <ConnectWalletButton />
                <ControlContainer>
                    <ControlButton onClick={toggleAll}>
                        <ExpandAllIcon as={toggleIcon} />
                        {toggleButtonText}
                    </ControlButton>
                    <ResetButton offAll={offAll} setInitialized={setInitialized} />
                </ControlContainer>
            </ControlOuterContainer>

            {initialized &&
                writeAbi.map((abi, index) => (
                    <ContractExecuteCard
                        executeAddress={executeAddress}
                        key={index}
                        index={index}
                        functionName={abi.name || ''}
                        rawAbi={allAbi}
                        signature={getMethodSignature(abi)}
                        isOpen={isShowList[index]}
                        toggle={() => toggle(index)}
                        mode="write"
                    />
                ))}
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 66px;
    gap: 12px;
`

const ControlOuterContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})``

export default WriteContractSubTab
