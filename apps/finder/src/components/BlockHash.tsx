import styled from 'styled-components'

import { Label, typos } from '@klaytn/slush'

interface IBlockHashProps {
    value: string
    currentBlock?: boolean
    maxLength?: number
}

const BlockHash = ({ value, currentBlock = false }: IBlockHashProps) => {
    return (
        <Container>
            <Label
                color={currentBlock ? 'black' : 'blue'}
                size="large"
                override={{
                    typo: typos.code['14.18_400'],
                }}
            >
                {value}
            </Label>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 28px;
    justify-content: center;
    align-items: center;
`

export default BlockHash
