import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { extractProp } from '../../../functions/Functions'

type LabelRowProps = {
    marginBottom: number
    labels: string[]
}

const LabelRow = ({ marginBottom, labels }: LabelRowProps) => {
    if (labels.length === 0) {
        return null
    }

    return (
        <Container marginBottom={marginBottom}>
            {labels.map((label) => (
                <LabelText key={label}>{label}</LabelText>
            ))}
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
})<{ marginBottom: number }>`
    margin-bottom: ${extractProp('marginBottom')}px;
`

const LabelText = styled(Text).attrs({
    typo: typos.suit['12.16_400'],
    color: colors.white,
})`
    background-color: ${colors.blue[600]};
    padding: 3px 10px;
    border-radius: 8px;
    margin-right: 8px;
`

export default LabelRow
