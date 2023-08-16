import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Flex, If, Text, typos } from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'

type HomeInfoRowProps = {
    title: string
    description?: string
    text: ReactNode
    marginBottom?: number
}

const HomeInfoRow = ({ title, text, description, marginBottom = 8 }: HomeInfoRowProps) => {
    return (
        <Container marginBottom={marginBottom}>
            <TitleContainer>
                <TitleText>{title}</TitleText>
                <If condition={!!description}>
                    <DescriptionText>{description}</DescriptionText>
                </If>
            </TitleContainer>
            <ContentsText>{text}</ContentsText>
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
    round: 12,
    justifyContent: 'space-between',
})<{ marginBottom: number }>`
    background-color: ${getThemeColor(colors.black[830])};
    align-items: center;
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
    padding: 12px 16px;
`

const TitleContainer = styled(Flex).attrs({
    direction: 'row',
})``

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['10.14_900'],
        color: colors.blue[400],
    }),
)``

const DescriptionText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['10.14_400'],
        color: colors.white,
    }),
)`
    margin-left: 2px;
`

const ContentsText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.white,
    }),
)``

export default HomeInfoRow
