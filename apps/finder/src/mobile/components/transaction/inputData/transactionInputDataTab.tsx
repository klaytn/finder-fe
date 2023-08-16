import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { useInputData } from '../../../../api/transaction'
import { getThemeColor } from '../../../../functions/colorMap'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'

type TransactionInputDataTabProps = {
    hash: string
}

const TransactionInputDataTab = ({ hash }: TransactionInputDataTabProps) => {
    const { formattedDecodedValue, originalValue, uft8Value } = useInputData(hash)

    return (
        <Container direction="column">
            <DataBox title="Original Value" data={originalValue} marginBottom={12} />
            <DataBox title="Decoded Value" data={formattedDecodedValue} marginBottom={12} />
            <DataBox title="UTF-8" data={uft8Value} />
        </Container>
    )
}

const Container = styled(Flex)``

type DataBoxProps = {
    title: string
    data: string
    marginBottom?: number
}

const DataBox = ({ title, data, marginBottom }: DataBoxProps) => {
    const color = useFinderThemeColor(colors.blue[300])

    return (
        <DataBoxContainer marginBottom={marginBottom} round={16}>
            <TitleText typo={typos.suit['12.16_900']} color={color}>
                {title}
            </TitleText>
            <DataPre>{data}</DataPre>
        </DataBoxContainer>
    )
}

const DataBoxContainer = styled(Flex)<{ marginBottom?: number }>`
    background-color: ${getThemeColor(colors.black[830])};
    padding: 16px;
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
`

const TitleText = styled(Text)`
    margin-bottom: 8px;
`

const DataPre = styled.pre`
    color: ${getThemeColor(colors.black[400])};
    word-break: break-all;
    white-space: pre-line;
    ${typos.code['12.16_400']};
`

export default TransactionInputDataTab
