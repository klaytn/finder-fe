import styled from 'styled-components'

import { ArrowcomboLeftrightIcon, BookmarkBookIcon, colors, CubeIcon, Flex, Icon, Text, typos } from '@klaytn/slush'

import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

const InputGuide = () => {
    const color = useFinderThemeColor(colors.black[400])

    return (
        <Container direction="column">
            <GuideRow leftIcon={CubeIcon} title="Blocks" text="Decimal numbers only" />
            <GuideRow leftIcon={ArrowcomboLeftrightIcon} title="Transactions" text="66 characters long" />
            <GuideRow leftIcon={BookmarkBookIcon} title="Contract" text="42 characters long" />
            <BottomText typo={typos.suit['14.18_400']} color={color}>
                {
                    'Transaction hashes and account addresses start with a prefix "0x" and consists of hexadecimal numbers [0~9, a~f].'
                }
            </BottomText>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 48px;
`

type GuideRowProps = {
    leftIcon: Icon
    title: string
    text: string
}
const GuideRow = ({ leftIcon: LeftIcon, title, text }: GuideRowProps) => {
    const blueColor = useFinderThemeColor(colors.blue[300])

    return (
        <GuideRowContainer direction="row">
            <GuideIconContainer>
                <LeftIcon size={20} color={blueColor} />
            </GuideIconContainer>
            <GuideTitleText typo={typos.suit['14.18_900']} color={blueColor}>
                {title}
            </GuideTitleText>
            <Text typo={typos.suit['14.18_400']} color={blueColor}>
                {text}
            </Text>
        </GuideRowContainer>
    )
}

const GuideRowContainer = styled(Flex)`
    align-items: center;
    margin-bottom: 8px;
`

const GuideIconContainer = styled(Flex)`
    margin-right: 8px;
`

const GuideTitleText = styled(Text)`
    min-width: 108px;
`

const BottomText = styled(Text)`
    margin-top: 16px;
`

export default InputGuide
