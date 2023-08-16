import styled from 'styled-components'

import ButtonGroup, { ButtonGroupItem } from '../../../../components/buttonGroup'
import { useSubTab } from '../../../../hooks/useSubTab'
import NonTokenSubTab from './nonTokenSubTab'
import TokenAndNftSubTab from './tokenAndNftSubTab'

const SUB_TABS: ButtonGroupItem[] = [
    {
        title: 'Token&NFT',
        value: 'tokenAndNft',
    },
    {
        title: 'non-Token',
        value: 'nonToken',
    },
]

const MyContractTab = () => {
    const { subTab, handleSubTabChange } = useSubTab(SUB_TABS[0].value)

    return (
        <Container>
            <InnerContainer>
                <ButtonGroupContainer>
                    <ButtonGroup buttons={SUB_TABS} selectedValue={subTab} onChange={handleSubTabChange} />
                </ButtonGroupContainer>
                {subTab === 'tokenAndNft' && <TokenAndNftSubTab />}
                {subTab === 'nonToken' && <NonTokenSubTab />}
            </InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 952px;
`

const ButtonGroupContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 32px;
`

export default MyContractTab
