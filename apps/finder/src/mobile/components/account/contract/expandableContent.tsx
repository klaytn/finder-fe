import { useState } from 'react'
import styled from 'styled-components'

import {
    colors,
    Expander,
    ExpanderContents,
    ExpanderDescription,
    ExpanderHeader,
    Flex,
    Text,
    typos,
} from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../../functions/colorMap'

type ExpandableContentProps = {
    title: string
    value: string
}

const ExpandableContent = ({ title, value }: ExpandableContentProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Container>
            <Expander onChange={setIsOpen}>
                <ExpanderHeader>
                    <TitleText>{title}</TitleText>
                </ExpanderHeader>
                {!isOpen && (
                    <ExpanderDescription>
                        <ShortCodeText>{value}</ShortCodeText>
                    </ExpanderDescription>
                )}
                <ExpanderContents>
                    <CodeText>{value}</CodeText>
                </ExpanderContents>
            </Expander>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 12px;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.blue[300],
    }),
)``

const CodeText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.code['12.16_400'],
        color: colors.black['400'],
    }),
)`
    margin-top: 8px;
    word-wrap: break-word;
`

const ShortCodeText = styled(CodeText)`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 15;
`

export default ExpandableContent
