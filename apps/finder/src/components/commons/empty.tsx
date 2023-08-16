import styled from 'styled-components'

import { colors, FaceMehIcon, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../functions/colorMap'
import { extractProp } from '../../functions/Functions'
import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'

type EmptyProps = {
    marginTop?: number
    marginBottom?: number
}

const Empty = ({ marginTop = 100, marginBottom = 120 }: EmptyProps) => {
    const whiteColor = useFinderThemeColor(colors.white)
    return (
        <Container marginTop={marginTop} marginBottom={marginBottom}>
            <InnerContainer>
                <FaceMehIcon size={44} color={whiteColor} />
                <TitleText>Nothing to load</TitleText>
                <DescText>Sorry, there was no data.</DescText>
            </InnerContainer>
        </Container>
    )
}

const Container = styled(Flex).attrs({
    justifyContent: 'center',
})<Required<EmptyProps>>`
    align-items: center;
    margin-top: ${extractProp('marginTop')}px;
    margin-bottom: ${extractProp('marginBottom')}px;
`

const InnerContainer = styled(Flex)`
    align-items: center;
    gap: 16px;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['24.32_900'],
    }),
)``

const DescText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['14.18_400'],
    }),
)``

export default Empty
