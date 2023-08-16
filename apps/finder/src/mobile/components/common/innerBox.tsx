import { FC } from 'react'
import styled from 'styled-components'

import { colors, Flex, neumorphism, Theme } from '@klaytn/slush'

import { extractProp } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

type InnerBoxProps = {
    paddingBottom?: number
    backgroundColor?: string
}

const InnerBox: FC<InnerBoxProps> = ({ paddingBottom = 20, backgroundColor = colors.black[850], children }) => {
    const themeBackgroundColor = useFinderThemeColor(backgroundColor)

    return (
        <Container direction="column" round={16} paddingBottom={paddingBottom} backgroundColor={themeBackgroundColor}>
            {children}
        </Container>
    )
}

const Container = styled(Flex)<{ paddingBottom: number; backgroundColor: string }>`
    background-color: ${extractProp('backgroundColor')};
    padding: 20px 20px ${({ paddingBottom }) => paddingBottom}px 20px;
    ${({ theme: { slush } }) => (slush === Theme.dark ? neumorphism.black2 : neumorphism.white1)};
`

export default InnerBox
